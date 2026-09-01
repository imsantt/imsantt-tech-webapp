/**
 * Serviço de autenticação (cliente).
 *
 * A segurança real vive nas Cloudflare Pages Functions (`/functions/auth/*`):
 * troca de code por token com o Client Secret, allowlist do proprietário e
 * cookie de sessão HttpOnly assinado. O cliente apenas dispara o redirect,
 * consulta a sessão e encerra — nunca vê segredos nem o token do GitHub.
 */
import type { RespostaSessao } from "@/types/autenticacao";

const ROTA_LOGIN_GITHUB = "/auth/github/login";
const ROTA_ME = "/auth/me";
const ROTA_LOGOUT = "/auth/logout";

/** Inicia o fluxo OAuth do GitHub (navegação de página inteira). */
export function entrarComGitHub(): void {
  window.location.assign(ROTA_LOGIN_GITHUB);
}

/** Consulta a sessão atual. Retorna não autenticado em qualquer falha. */
export async function obterSessao(): Promise<RespostaSessao> {
  try {
    const resp = await fetch(ROTA_ME, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });
    if (!resp.ok) return { autenticado: false };
    return (await resp.json()) as RespostaSessao;
  } catch {
    return { autenticado: false };
  }
}

/** Encerra a sessão e resolve quando o cookie foi limpo. */
export async function sair(): Promise<void> {
  try {
    await fetch(ROTA_LOGOUT, { method: "POST", credentials: "same-origin" });
  } catch {
    // silencioso: logout é best-effort no cliente
  }
}

/** Mensagens amigáveis para os códigos de erro devolvidos pelo callback. */
export function mensagemErroLogin(codigo: string | null): string | null {
  switch (codigo) {
    case null:
      return null;
    case "nao_autorizado":
      return "Esta conta do GitHub não tem acesso a este painel.";
    case "acesso_negado":
      return "Autorização cancelada no GitHub.";
    case "state_invalido":
      return "Sessão de login expirada. Tente novamente.";
    case "falha_token":
    case "falha_usuario":
      return "Não foi possível concluir o login com o GitHub. Tente novamente.";
    default:
      return "Ocorreu um erro no login. Tente novamente.";
  }
}
