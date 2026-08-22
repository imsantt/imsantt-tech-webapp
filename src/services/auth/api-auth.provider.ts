/**
 * Provider de autenticação — Backend proprietário (imsantt-tech-api).
 *
 * Este é o provider PRINCIPAL. Assume o seguinte contrato de endpoints
 * (a serem implementados na imsantt-tech-api):
 *
 *   POST /auth/login   body: { email, senha }   -> { usuario, expiraEm? }
 *   POST /auth/logout                            -> 204
 *   GET  /auth/me                                -> { usuario, expiraEm? }
 *
 * A sessão é mantida por cookie HttpOnly emitido pelo backend (o front não
 * manipula o token diretamente — ver lib/http.ts, credentials: "include").
 *
 * Se o contrato final divergir, ajuste apenas os mapeamentos abaixo — a UI e
 * o hook useAuth não mudam.
 */

import type {
  AuthProvider,
  Credenciais,
  Sessao,
  Usuario,
} from "@/types/auth";
import { AuthError } from "@/types/auth";
import { http, HttpError, NetworkError } from "@/lib/http";
import { logger, mascararEmail } from "@/lib/logger";

/** Formato de resposta esperado do backend para sessão/login. */
interface RespostaSessao {
  usuario: Usuario;
  expiraEm?: number;
}

function paraSessao(resposta: RespostaSessao): Sessao {
  return {
    usuario: resposta.usuario,
    expiraEm: resposta.expiraEm,
  };
}

/** Converte erros de transporte em AuthError normalizado. */
function normalizarErro(erro: unknown): AuthError {
  if (erro instanceof NetworkError) {
    return new AuthError("rede", "Falha de conexão com o servidor.");
  }
  if (erro instanceof HttpError) {
    // 401/403 -> credenciais inválidas (mensagem genérica na UI)
    if (erro.status === 401 || erro.status === 403) {
      return new AuthError("credenciais-invalidas");
    }
    if (erro.status === 429) {
      return new AuthError("muitas-tentativas");
    }
    return new AuthError("desconhecido", erro.message);
  }
  return new AuthError("desconhecido");
}

export const apiAuthProvider: AuthProvider = {
  async entrar(credenciais: Credenciais): Promise<Sessao> {
    try {
      const resposta = await http.post<RespostaSessao>("/auth/login", {
        email: credenciais.email,
        senha: credenciais.senha,
      });
      logger.info("Login realizado (api)", {
        email: mascararEmail(credenciais.email),
      });
      return paraSessao(resposta);
    } catch (erro) {
      // Nunca logar a senha. E-mail é mascarado pelo logger.
      logger.warn("Falha no login (api)", {
        email: mascararEmail(credenciais.email),
      });
      throw normalizarErro(erro);
    }
  },

  async sair(): Promise<void> {
    try {
      await http.post<void>("/auth/logout");
    } catch (erro) {
      // Logout é best-effort: mesmo se falhar no servidor, seguimos deslogando localmente.
      logger.warn("Falha ao encerrar sessão no servidor (api)", {
        erro: erro instanceof Error ? erro.name : "desconhecido",
      });
    }
  },

  async sessaoAtual(): Promise<Sessao | null> {
    try {
      const resposta = await http.get<RespostaSessao>("/auth/me");
      return paraSessao(resposta);
    } catch (erro) {
      if (erro instanceof HttpError && erro.status === 401) {
        return null;
      }
      // Falha de rede/servidor: tratamos como não autenticado, sem quebrar a UI.
      return null;
    }
  },
};
