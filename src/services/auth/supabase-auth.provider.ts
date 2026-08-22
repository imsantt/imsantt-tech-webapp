/**
 * Provider de autenticação — Supabase (BaaS).
 *
 * PLANO B. Fica inerte enquanto VITE_AUTH_PROVIDER !== "supabase".
 * Reaproveita o client de lib/supabase.ts e adapta o SDK ao contrato AuthProvider.
 *
 * Observação de segurança: neste modo, o token de sessão é gerenciado pelo
 * SDK do Supabase (por padrão em localStorage), então uma CSP restritiva é
 * ainda mais importante para mitigar roubo de token via XSS.
 */

import type { Session } from "@supabase/supabase-js";
import type {
  AuthProvider,
  Credenciais,
  Sessao,
  Usuario,
} from "@/types/auth";
import { AuthError } from "@/types/auth";
import { supabase } from "@/lib/supabase";
import { logger, mascararEmail } from "@/lib/logger";

function paraUsuario(session: Session): Usuario {
  return {
    id: session.user.id,
    email: session.user.email ?? "",
    nome:
      (session.user.user_metadata?.nome as string | undefined) ??
      (session.user.user_metadata?.name as string | undefined),
  };
}

function paraSessao(session: Session): Sessao {
  return {
    usuario: paraUsuario(session),
    expiraEm: session.expires_at ? session.expires_at * 1000 : undefined,
  };
}

function exigirClient() {
  if (!supabase) {
    throw new AuthError(
      "nao-configurado",
      "Supabase não configurado (defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY).",
    );
  }
  return supabase;
}

export const supabaseAuthProvider: AuthProvider = {
  async entrar(credenciais: Credenciais): Promise<Sessao> {
    const client = exigirClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: credenciais.email,
      password: credenciais.senha,
    });

    if (error || !data.session) {
      logger.warn("Falha no login (supabase)", {
        email: mascararEmail(credenciais.email),
      });
      throw new AuthError("credenciais-invalidas");
    }

    logger.info("Login realizado (supabase)", {
      email: mascararEmail(credenciais.email),
    });
    return paraSessao(data.session);
  },

  async sair(): Promise<void> {
    const client = exigirClient();
    await client.auth.signOut();
  },

  async sessaoAtual(): Promise<Sessao | null> {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session ? paraSessao(data.session) : null;
  },

  aoMudarSessao(callback: (sessao: Sessao | null) => void): () => void {
    if (!supabase) return () => {};
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session ? paraSessao(session) : null);
    });
    return () => data.subscription.unsubscribe();
  },
};
