import type { Experiencia } from "@/types/experiencia";
import { STUB_EXPERIENCIAS } from "@/stubs/experiencias.stub";
import { simularLatencia } from "@/lib/latencia";

/**
 * Service de experiências profissionais.
 * Futuramente: supabase.from('experiencias').select('*').order('data_inicio', { ascending: false })
 */
export async function listarExperiencias(): Promise<Experiencia[]> {
  await simularLatencia(300);
  return [...STUB_EXPERIENCIAS].sort(
    (a, b) => b.dataInicio.toMillis() - a.dataInicio.toMillis(),
  );
}

export async function buscarExperienciaPorId(
  id: string,
): Promise<Experiencia | null> {
  await simularLatencia(200);
  return STUB_EXPERIENCIAS.find((e) => e.id === id) ?? null;
}
