/**
 * POST /auth/logout — encerra a sessão (limpa o cookie).
 * Aceita também GET para permitir logout via link simples, se necessário.
 */
import { cookieSessaoLimpo, requisicaoSegura } from "../_lib/sessao";

interface Contexto {
  request: Request;
}

function limpar(request: Request): Response {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookieSessaoLimpo(requisicaoSegura(request)),
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost: (ctx: Contexto) => Response = ({ request }) =>
  limpar(request);
export const onRequestGet: (ctx: Contexto) => Response = ({ request }) =>
  limpar(request);
