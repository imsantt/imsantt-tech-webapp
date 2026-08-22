/**
 * Configuração centralizada de variáveis de ambiente.
 * Fonte única de acesso — evita cast espalhado pelo código.
 */

function getEnv(key: string): string | undefined {
  return import.meta.env[key] as string | undefined;
}

/**
 * Provider de autenticação ativo.
 * - "api" (padrão): usa o backend proprietário (imsantt-tech-api)
 * - "supabase": usa o Supabase como BaaS (plano B)
 */
export type AuthProviderTipo = "api" | "supabase" | "mock";

function getAuthProvider(): AuthProviderTipo {
  const valor = getEnv("VITE_AUTH_PROVIDER");
  if (valor === "supabase") return "supabase";
  if (valor === "mock") return "mock";
  return "api";
}

export const env = {
  supabaseUrl: getEnv("VITE_SUPABASE_URL"),
  supabaseAnonKey: getEnv("VITE_SUPABASE_ANON_KEY"),
  r2PublicUrl: getEnv("VITE_R2_PUBLIC_URL"),
  /** URL base da API proprietária (imsantt-tech-api). Ex.: https://api.imsantt.tech */
  apiUrl: getEnv("VITE_API_URL"),
  /** Provider de autenticação ativo: "api" (padrão), "supabase" ou "mock" */
  authProvider: getAuthProvider(),
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
} as const;
