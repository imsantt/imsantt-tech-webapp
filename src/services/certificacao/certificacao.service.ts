import type { Certificacao } from "@/types/certificacao";
import { STUB_CERTIFICACOES } from "@/stubs/certificacoes.stub";
import { simularLatencia } from "@/lib/latencia";

/**
 * Service de cursos e certificações.
 * Futuramente: supabase.from('certificacoes').select('*').order('emitida_em', { ascending: false })
 */
export async function listarCertificacoes(): Promise<Certificacao[]> {
  await simularLatencia(300);
  return [...STUB_CERTIFICACOES].sort(
    (a, b) => b.emitidaEm.toMillis() - a.emitidaEm.toMillis(),
  );
}
