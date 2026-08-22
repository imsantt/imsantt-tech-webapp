/**
 * Provider de autenticação — Mock (localStorage).
 *
 * Provider TEMPORÁRIO para desenvolvimento do front sem backend.
 * A "sessão" é um token fake persistido em localStorage; qualquer credencial
 * válida (passando na validação client-side) resulta em login bem-sucedido.
 *
 * Ativação: VITE_AUTH_PROVIDER="mock" (ver lib/env.ts).
 *
 * AVISO: não use em produção. Não há verificação real de credenciais nem
 * segurança de token — é apenas um stub para exercitar o fluxo de UI/rotas.
 */

import type { AuthProvider, Credenciais, Sessao } from "@/types/auth";
import { logger, mascararEmail } from "@/lib/logger";

const CHAVE_TOKEN = "imsantt.mock.auth";

interface RegistroMock {
  token: string;
  sessao: Sessao;
}

function lerRegistro(): RegistroMock | null {
  try {
    const bruto = localStorage.getItem(CHAVE_TOKEN);
    if (!bruto) return null;
    const registro = JSON.parse(bruto) as RegistroMock;
    return registro.token && registro.sessao ? registro : null;
  } catch {
    return null;
  }
}

function gravarRegistro(registro: RegistroMock): void {
  localStorage.setItem(CHAVE_TOKEN, JSON.stringify(registro));
}

function limparRegistro(): void {
  localStorage.removeItem(CHAVE_TOKEN);
}

export const mockAuthProvider: AuthProvider = {
  entrar(credenciais: Credenciais): Promise<Sessao> {
    const sessao: Sessao = {
      usuario: {
        id: "mock-user",
        email: credenciais.email,
        nome: "Usuário Mock",
      },
      // Expira em 8h — apenas ilustrativo.
      expiraEm: Date.now() + 8 * 60 * 60 * 1000,
    };

    gravarRegistro({
      token: `mock-token-${Date.now()}`,
      sessao,
    });

    logger.info("Login realizado (mock)", {
      email: mascararEmail(credenciais.email),
    });

    return Promise.resolve(sessao);
  },

  sair(): Promise<void> {
    limparRegistro();
    return Promise.resolve();
  },

  sessaoAtual(): Promise<Sessao | null> {
    const registro = lerRegistro();
    return Promise.resolve(registro?.sessao ?? null);
  },
};
