/**
 * Configuração centralizada de variáveis de ambiente.
 * Fonte única de acesso — evita cast espalhado pelo código.
 */

function getEnv(key: string): string | undefined {
  return import.meta.env[key] as string | undefined;
}

export const env = {
  supabaseUrl: getEnv("VITE_SUPABASE_URL"),
  supabaseAnonKey: getEnv("VITE_SUPABASE_ANON_KEY"),
  r2PublicUrl: getEnv("VITE_R2_PUBLIC_URL"),
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
} as const;
