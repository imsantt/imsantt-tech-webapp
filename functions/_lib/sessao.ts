/**
 * Utilitários de sessão para as Pages Functions de autenticação.
 *
 * A sessão é um cookie HttpOnly contendo um payload JSON assinado com HMAC
 * (Web Crypto — disponível no runtime do Cloudflare Workers/Pages). O segredo
 * de assinatura (`SESSION_SECRET`) vive apenas como variável de ambiente no
 * Cloudflare, nunca no bundle do cliente. Sem base de dados: a verificação da
 * assinatura é suficiente para confiar no conteúdo do cookie.
 */

const NOME_COOKIE_SESSAO = "imsantt_sessao";
const NOME_COOKIE_STATE = "imsantt_oauth_state";

/** Duração da sessão em segundos (7 dias). */
const DURACAO_SESSAO_S = 60 * 60 * 24 * 7;

export interface Sessao {
  /** GitHub login (username). */
  login: string;
  /** GitHub numeric id. */
  id: number;
  /** Nome de exibição. */
  nome: string | null;
  /** URL do avatar. */
  avatar: string | null;
  /** Versão da sessão — bumpar SESSION_VERSION invalida todas as sessões. */
  ver: number;
  /** Emitido em (epoch segundos). */
  iat: number;
  /** Expira em (epoch segundos). */
  exp: number;
}

/** Janela de validade do `state` do OAuth (segundos). */
const DURACAO_STATE_S = 600;

/* ─── Base64URL ──────────────────────────────────────────────────────────── */

function paraBase64Url(bytes: Uint8Array): string {
  let binario = "";
  for (const b of bytes) binario += String.fromCharCode(b);
  return btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function deBase64Url(texto: string): Uint8Array {
  const base64 = texto.replace(/-/g, "+").replace(/_/g, "/");
  const preenchido = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binario = atob(preenchido);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return bytes;
}

/* ─── HMAC (Web Crypto) ──────────────────────────────────────────────────── */

async function importarChave(segredo: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(segredo),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function assinar(dados: string, segredo: string): Promise<string> {
  const chave = await importarChave(segredo);
  const assinatura = await crypto.subtle.sign(
    "HMAC",
    chave,
    new TextEncoder().encode(dados),
  );
  return paraBase64Url(new Uint8Array(assinatura));
}

/** Comparação em tempo constante para evitar timing attacks. */
function comparaSeguro(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ─── Token de sessão (payload.assinatura) ───────────────────────────────── */

export async function criarTokenSessao(
  dados: Omit<Sessao, "iat" | "exp">,
  segredo: string,
): Promise<{ token: string; sessao: Sessao }> {
  const agora = Math.floor(Date.now() / 1000);
  const sessao: Sessao = {
    ...dados,
    iat: agora,
    exp: agora + DURACAO_SESSAO_S,
  };
  const payload = paraBase64Url(
    new TextEncoder().encode(JSON.stringify(sessao)),
  );
  const assinatura = await assinar(payload, segredo);
  return { token: `${payload}.${assinatura}`, sessao };
}

/**
 * Verifica a assinatura e a validade da sessão.
 * @param versaoAtual valor de SESSION_VERSION vigente — sessões com `ver`
 * diferente são rejeitadas (permite revogação em massa ao bumpar a env).
 */
export async function verificarTokenSessao(
  token: string,
  segredo: string,
  versaoAtual: number,
): Promise<Sessao | null> {
  const partes = token.split(".");
  if (partes.length !== 2) return null;

  const [payload, assinatura] = partes;
  const esperada = await assinar(payload, segredo);
  if (!comparaSeguro(assinatura, esperada)) return null;

  try {
    const sessao = JSON.parse(
      new TextDecoder().decode(deBase64Url(payload)),
    ) as Sessao;
    if (
      typeof sessao.exp !== "number" ||
      sessao.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    // Revogação em massa: rejeita sessões de versões anteriores.
    if (sessao.ver !== versaoAtual) return null;
    return sessao;
  } catch {
    return null;
  }
}

/* ─── Cookies ────────────────────────────────────────────────────────────── */

export function lerCookie(req: Request, nome: string): string | null {
  const cabecalho = req.headers.get("Cookie");
  if (!cabecalho) return null;
  for (const parte of cabecalho.split(";")) {
    const [chave, ...resto] = parte.trim().split("=");
    if (chave === nome) return decodeURIComponent(resto.join("="));
  }
  return null;
}

function montarCookie(
  nome: string,
  valor: string,
  maxAgeS: number,
  seguro: boolean,
): string {
  const atributos = [`${nome}=${valor}`, "Path=/", "HttpOnly", "SameSite=Lax"];
  // `Secure` só sobre HTTPS. Em dev local (http://localhost) o navegador
  // descartaria cookies `Secure`, quebrando o fluxo — então omitimos ali.
  if (seguro) atributos.push("Secure");
  atributos.push(`Max-Age=${maxAgeS}`);
  return atributos.join("; ");
}

/** Determina se a requisição chegou via HTTPS (para o atributo Secure). */
export function requisicaoSegura(req: Request): boolean {
  return new URL(req.url).protocol === "https:";
}

export function cookieSessao(token: string, seguro: boolean): string {
  return montarCookie(NOME_COOKIE_SESSAO, token, DURACAO_SESSAO_S, seguro);
}

export function cookieSessaoLimpo(seguro: boolean): string {
  return montarCookie(NOME_COOKIE_SESSAO, "", 0, seguro);
}

export function lerCookieSessao(req: Request): string | null {
  return lerCookie(req, NOME_COOKIE_SESSAO);
}

/* ─── State do OAuth (CSRF) — nonce + cookie assinado ────────────────────── */

function gerarNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return paraBase64Url(bytes);
}

/**
 * Cria o par (nonce, cookie assinado) para o fluxo OAuth.
 * - `nonce` vai na query `state` para o GitHub.
 * - o cookie guarda `nonce.timestamp.assinatura` (HMAC), impedindo que um
 *   atacante fixe/forje um state válido (mitiga login CSRF / session fixation).
 */
export async function criarState(
  segredo: string,
): Promise<{ nonce: string; valorCookie: string }> {
  const nonce = gerarNonce();
  const emitidoEm = Math.floor(Date.now() / 1000);
  const corpo = `${nonce}.${emitidoEm}`;
  const assinatura = await assinar(corpo, segredo);
  return { nonce, valorCookie: `${corpo}.${assinatura}` };
}

/**
 * Verifica o cookie de state (assinatura + frescor) e o compara, em tempo
 * constante, com o `nonce` recebido na query. Retorna true só se tudo casar.
 */
export async function verificarState(
  valorCookie: string | null,
  nonceQuery: string | null,
  segredo: string,
): Promise<boolean> {
  if (!valorCookie || !nonceQuery) return false;

  const partes = valorCookie.split(".");
  if (partes.length !== 3) return false;

  const [nonce, emitidoEmStr, assinatura] = partes;
  const esperada = await assinar(`${nonce}.${emitidoEmStr}`, segredo);
  if (!comparaSeguro(assinatura, esperada)) return false;

  const emitidoEm = Number(emitidoEmStr);
  if (!Number.isFinite(emitidoEm)) return false;
  const agora = Math.floor(Date.now() / 1000);
  if (agora - emitidoEm > DURACAO_STATE_S || agora - emitidoEm < 0)
    return false;

  return comparaSeguro(nonce, nonceQuery);
}

export function cookieState(valorCookie: string, seguro: boolean): string {
  return montarCookie(NOME_COOKIE_STATE, valorCookie, DURACAO_STATE_S, seguro);
}

export function cookieStateLimpo(seguro: boolean): string {
  return montarCookie(NOME_COOKIE_STATE, "", 0, seguro);
}

export function lerCookieState(req: Request): string | null {
  return lerCookie(req, NOME_COOKIE_STATE);
}
