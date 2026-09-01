/**
 * GET /auth/github/login
 *
 * Início do fluxo OAuth (Authorization Code). Gera um `state` anti-CSRF,
 * guarda-o num cookie curto e redireciona o navegador para a tela de
 * autorização do GitHub.
 */
import {
  carregarConfig,
  ConfigAusenteError,
  resolverOrigem,
  type EnvAuth,
} from "../../_lib/config";
import { cookieState, criarState, requisicaoSegura } from "../../_lib/sessao";

const GITHUB_AUTORIZAR = "https://github.com/login/oauth/authorize";
const SCOPES = "read:user user:email";

interface Contexto {
  request: Request;
  env: EnvAuth;
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

  const { nonce, valorCookie } = await criarState(config.sessionSecret);

  const url = new URL(GITHUB_AUTORIZAR);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", `${origem}/auth/github/callback`);
  url.searchParams.set("scope", SCOPES);
  url.searchParams.set("state", nonce);
  url.searchParams.set("allow_signup", "false");

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": cookieState(valorCookie, requisicaoSegura(request)),
      "Cache-Control": "no-store",
    },
  });
};
