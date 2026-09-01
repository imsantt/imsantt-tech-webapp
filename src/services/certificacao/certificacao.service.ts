import type { Certificacao } from "@/types/certificacao";
import { STUB_CERTIFICACOES } from "@/stubs/certificacoes.stub";
import { certificacoesBrutasSchema } from "@/schemas/certificacao/certificacao.schema";
import { mapearCertificacoes } from "./certificacao.mapper";
import { simularLatencia } from "@/lib/latencia";
import { logger } from "@/lib/logger";

/**
 * Service de cursos e certificações.
 *
 * Fluxo: fonte (stub hoje, Supabase depois) -> validação de schema na
 * borda -> mapeamento para o domínio. Dados malformados são descartados.
 *
 * Futuramente: supabase.from('certificacoes').select('*')
 */
function validarEMapear(brutas: unknown): Certificacao[] {
  const resultado = certificacoesBrutasSchema.safeParse(brutas);

  if (!resultado.success) {
    logger.error("Certificações com formato inválido — descartando resposta", {
      erros: resultado.error.issues,
    });
    return [];
  }

  return mapearCertificacoes(resultado.data);
}

export async function listarCertificacoes(): Promise<Certificacao[]> {
  await simularLatencia(300);

  return validarEMapear(STUB_CERTIFICACOES).sort(
    (a, b) => b.emitidaEm.toMillis() - a.emitidaEm.toMillis(),
  );
}
