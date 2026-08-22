/**
 * Seleção do provider de autenticação.
 *
 * Ponto ÚNICO de troca entre backend proprietário e Supabase.
 * Controlado por VITE_AUTH_PROVIDER (ver lib/env.ts):
 *   - "api" (padrão) -> apiAuthProvider   (imsantt-tech-api)
 *   - "supabase"     -> supabaseAuthProvider (plano B)
 *
 * A UI e os hooks importam apenas `authProvider` — nunca uma implementação
 * concreta. Trocar de backend não exige mudança fora deste arquivo.
 */

import type { AuthProvider } from "@/types/auth";
import { env } from "@/lib/env";
import { apiAuthProvider } from "./api-auth.provider";
import { supabaseAuthProvider } from "./supabase-auth.provider";
import { mockAuthProvider } from "./mock-auth.provider";

function selecionarProvider(): AuthProvider {
  switch (env.authProvider) {
    case "supabase":
      return supabaseAuthProvider;
    case "mock":
      return mockAuthProvider;
    default:
      return apiAuthProvider;
  }
}

export const authProvider: AuthProvider = selecionarProvider();

export { apiAuthProvider } from "./api-auth.provider";
export { supabaseAuthProvider } from "./supabase-auth.provider";
export { mockAuthProvider } from "./mock-auth.provider";
