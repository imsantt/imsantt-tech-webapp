import type { FormacaoAcademica } from "@/types/formacao";
import { STUB_FORMACAO } from "@/stubs/formacao.stub";
import { simularLatencia } from "@/lib/latencia";

/**
 * Service de formação acadêmica.
 * Futuramente: supabase.from('formacao').select('*').order('data_inicio', { ascending: false })
 */
export async function listarFormacao(): Promise<FormacaoAcademica[]> {
  await simularLatencia(300);
  return [...STUB_FORMACAO].sort(
    (a, b) => b.dataInicio.toMillis() - a.dataInicio.toMillis(),
  );
}
