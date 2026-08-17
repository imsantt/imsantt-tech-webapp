import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

// Permite build sem variáveis configuradas — o client fica null até configurar
export const supabase: SupabaseClient | null =
  env.supabaseUrl && env.supabaseAnonKey
    ? createClient(env.supabaseUrl, env.supabaseAnonKey)
    : null;
