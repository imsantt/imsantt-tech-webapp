import type { CategoriaHabilidade } from "@/types/habilidade";
import { STUB_HABILIDADES } from "@/stubs/habilidades.stub";
import { simularLatencia } from "@/lib/latencia";

/**
 * Service de habilidades/competências (seção Habilidades e página /habilidades).
 * Futuramente: supabase.from('habilidades').select('*').order('ordem')
 */
export async function listarHabilidades(): Promise<CategoriaHabilidade[]> {
  await simularLatencia(200);
  return STUB_HABILIDADES;
}
