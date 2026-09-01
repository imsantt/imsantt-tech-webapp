/**
 * Configuração e allowlist das Pages Functions de autenticação.
 *
 * Todas as variáveis vivem apenas no ambiente do Cloudflare Pages (Settings →
 * Environment variables). Os segredos (`GITHUB_CLIENT_SECRET`, `SESSION_SECRET`)
 * NUNCA têm prefixo `VITE_` e portanto nunca entram no bundle do cliente.
 */

export interface EnvAuth {
  /** Client ID do GitHub OAuth App. */
  GITHUB_CLIENT_ID?: string;
  /** Client Secret do GitHub OAuth App (segredo — server-side apenas). */
  GITHUB_CLIENT_SECRET?: string;
  /** Segredo de assinatura HMAC da sessão (server-side apenas). */
  SESSION_SECRET?: string;
  /**
   * Allowlist: logins do GitHub autorizados, separados por vírgula.
   * Ex.: "imsantt". Comparação case-insensitive.
   */
  GITHUB_ALLOWED_LOGINS?: string;
  /**
   * Allowlist opcional por id numérico do GitHub, separados por vírgula.
   * Mais robusto que login (login pode ser renomeado).
   */
  GITHUB_ALLOWED_IDS?: string;
  /** Origem canônica opcional (ex.: https://imsantt.tech) para montar o redirect. */
  APP_ORIGIN?: string;
  /** Versão da sessão. Bumpar invalida todas as sessões emitidas. */
  SESSION_VERSION?: string;
}

export interface ConfigAuth {
  clientId: string;
  clientSecret: string;
  sessionSecret: string;
  sessionVersion: number;
  loginsPermitidos: string[];
  idsPermitidos: number[];
  appOrigin?: string;
}

/** Erro de configuração ausente — sinaliza 500 sem vazar detalhe ao cliente. */
export class ConfigAusenteError extends Error {
  readonly chave: string;

  constructor(chave: string) {
    super(`Configuração ausente: ${chave}`);
    this.name = "ConfigAusenteError";
    this.chave = chave;
  }
}

export function carregarConfig(env: EnvAuth): ConfigAuth {
  if (!env.GITHUB_CLIENT_ID) throw new ConfigAusenteError("GITHUB_CLIENT_ID");
  if (!env.GITHUB_CLIENT_SECRET)
    throw new ConfigAusenteError("GITHUB_CLIENT_SECRET");
  if (!env.SESSION_SECRET) throw new ConfigAusenteError("SESSION_SECRET");

  const loginsPermitidos = (env.GITHUB_ALLOWED_LOGINS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const idsPermitidos = (env.GITHUB_ALLOWED_IDS ?? "")
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);

  const versaoParseada = Number((env.SESSION_VERSION ?? "1").trim());
  const sessionVersion =
    Number.isFinite(versaoParseada) && versaoParseada > 0 ? versaoParseada : 1;

  return {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    sessionSecret: env.SESSION_SECRET,
    sessionVersion,
    loginsPermitidos,
    idsPermitidos,
    appOrigin: env.APP_ORIGIN,
  };
}

/** Aplica a allowlist: só o proprietário passa. */
export function usuarioAutorizado(
  config: ConfigAuth,
  usuario: { login: string; id: number },
): boolean {
  const loginOk = config.loginsPermitidos.includes(usuario.login.toLowerCase());
  const idOk = config.idsPermitidos.includes(usuario.id);
  // Se qualquer allowlist estiver definida, o usuário precisa casar com ela.
  if (
    config.loginsPermitidos.length === 0 &&
    config.idsPermitidos.length === 0
  ) {
    // Sem allowlist configurada → nega por padrão (deny-by-default).
    return false;
  }
  return loginOk || idOk;
}

/**
 * Deriva a origem base para montar o redirect_uri.
 *
 * Em produção (HTTPS) exige `APP_ORIGIN` explícito, para não depender do host
 * da requisição (que poderia ser manipulado por um proxy/Host header hostil).
 * Em dev local (HTTP) cai para a origem da requisição por conveniência.
 */
export function resolverOrigem(req: Request, config: ConfigAuth): string {
  if (config.appOrigin) return config.appOrigin.replace(/\/$/, "");
  const url = new URL(req.url);
  if (url.protocol === "https:") {
    throw new ConfigAusenteError("APP_ORIGIN");
  }
  return url.origin;
}
