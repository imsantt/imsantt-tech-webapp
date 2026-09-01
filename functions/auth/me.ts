/**
 * GET /auth/me
 *
 * Retorna o usuário da sessão atual (ou 401 se não autenticado). O frontend
 * usa isto para saber se há sessão válida — sem nunca ver o segredo.
 */
import {
  carregarConfig,
  ConfigAusenteError,
  type EnvAuth,
} from "../_lib/config";
import { lerCookieSessao, verificarTokenSessao } from "../_lib/sessao";

interface Contexto {
  request: Request;
  env: EnvAuth;
}

const SEM_CACHE = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

export const onRequestGet: (ctx: Contexto) => Promise<Response> = async ({
  request,
  env,
}) => {
  let config;
  try {
    config = carregarConfig(env);
  } catch (e) {
    if (e instanceof ConfigAusenteError) {
      return new Response(JSON.stringify({ autenticado: false }), {
        status: 200,
        headers: SEM_CACHE,
      });
    }
    throw e;
  }

  const token = lerCookieSessao(request);
  if (!token) {
    return new Response(JSON.stringify({ autenticado: false }), {
      status: 401,
      headers: SEM_CACHE,
    });
  }

  const sessao = await verificarTokenSessao(
    token,
    config.sessionSecret,
    config.sessionVersion,
  );
  if (!sessao) {
    return new Response(JSON.stringify({ autenticado: false }), {
      status: 401,
      headers: SEM_CACHE,
    });
  }

  return new Response(
    JSON.stringify({
      autenticado: true,
      usuario: {
        login: sessao.login,
        nome: sessao.nome,
        avatar: sessao.avatar,
      },
    }),
    { status: 200, headers: SEM_CACHE },
  );
};
