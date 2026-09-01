/**
 * GET /auth/github/callback?code=...&state=...
 *
 * Fim do fluxo OAuth. Valida o `state`, troca o `code` por um access token
 * (usando o Client Secret — server-side apenas), busca o usuário no GitHub,
 * aplica a allowlist (só o proprietário) e emite um cookie de sessão assinado.
 *
 * O access token do GitHub é usado apenas para identificar o usuário e é
 * descartado em seguida — não é persistido nem devolvido ao cliente.
 */
import {
  carregarConfig,
  ConfigAusenteError,
  resolverOrigem,
  usuarioAutorizado,
  type EnvAuth,
} from "../../_lib/config";
import {
  cookieSessao,
  cookieStateLimpo,
  criarTokenSessao,
  lerCookieState,
  requisicaoSegura,
  verificarState,
} from "../../_lib/sessao";

const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";
const GITHUB_API_USER = "https://api.github.com/user";

interface Contexto {
  request: Request;
  env: EnvAuth;
}

interface UsuarioGitHub {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string | null;
}

/** Redireciona para /login com um código de erro legível pela UI. */
function redirecionarErro(
  origem: string,
  motivo: string,
  seguro: boolean,
): Response {
  const url = new URL(`${origem}/login`);
  url.searchParams.set("erro", motivo);
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": cookieStateLimpo(seguro),
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestGet: (ctx: Contexto) => Promise<Response> = async ({
  request,
  env,
}) => {
  let origem: string;
  let config;
  try {
    config = carregarConfig(env);
    origem = resolverOrigem(request, config);
  } catch (e) {
    if (e instanceof ConfigAusenteError) {
      return new Response("Autenticação indisponível.", { status: 500 });
    }
    throw e;
  }

  const seguro = requisicaoSegura(request);
  const params = new URL(request.url).searchParams;
  const code = params.get("code");
  const state = params.get("state");
  const stateCookie = lerCookieState(request);

  // O GitHub pode devolver erro (ex.: usuário negou).
  if (params.get("error")) {
    return redirecionarErro(origem, "acesso_negado", seguro);
  }

  // Validação anti-CSRF: cookie de state assinado + nonce da query em tempo
  // constante (bloqueia login CSRF / session fixation).
  if (
    !code ||
    !(await verificarState(stateCookie, state, config.sessionSecret))
  ) {
    return redirecionarErro(origem, "state_invalido", seguro);
  }

  // 1) Troca code → access token (server-side, com o Client Secret).
  let accessToken: string;
  try {
    const resp = await fetch(GITHUB_TOKEN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: `${origem}/auth/github/callback`,
      }),
    });
    const dados = (await resp.json()) as {
      access_token?: string;
      error?: string;
    };
    if (!resp.ok || !dados.access_token) {
      return redirecionarErro(origem, "falha_token", seguro);
    }
    accessToken = dados.access_token;
  } catch {
    return redirecionarErro(origem, "falha_token", seguro);
  }

  // 2) Identifica o usuário.
  let usuario: UsuarioGitHub;
  try {
    const resp = await fetch(GITHUB_API_USER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "imsantt-tech-auth",
      },
    });
    if (!resp.ok) return redirecionarErro(origem, "falha_usuario", seguro);
    usuario = (await resp.json()) as UsuarioGitHub;
  } catch {
    return redirecionarErro(origem, "falha_usuario", seguro);
  }

  // 3) Allowlist — só o proprietário entra.
  if (!usuarioAutorizado(config, { login: usuario.login, id: usuario.id })) {
    return redirecionarErro(origem, "nao_autorizado", seguro);
  }

  // 4) Emite a sessão assinada. O access token do GitHub é descartado aqui.
  const { token } = await criarTokenSessao(
    {
      login: usuario.login,
      id: usuario.id,
      nome: usuario.name,
      avatar: usuario.avatar_url,
      ver: config.sessionVersion,
    },
    config.sessionSecret,
  );

  // Redireciona para o painel, seta sessão e limpa o cookie de state.
  const headers = new Headers({
    Location: `${origem}/painel`,
    "Cache-Control": "no-store",
  });
  headers.append("Set-Cookie", cookieSessao(token, seguro));
  headers.append("Set-Cookie", cookieStateLimpo(seguro));

  return new Response(null, { status: 302, headers });
};
