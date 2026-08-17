import type { CategoriaHabilidade } from "@/types/habilidade";
import { STUB_HABILIDADES } from "@/stubs/habilidades.stub";

/**
 * Service de habilidades/competências.
 * Fonte única de dados para a seção Habilidades (Home) e a página /habilidades.
 * Futuramente: supabase.from('habilidades').select('*').order('ordem')
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function listarHabilidades(): Promise<CategoriaHabilidade[]> {
  await delay(200);
  return STUB_HABILIDADES;
}
