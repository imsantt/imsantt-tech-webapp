import type { FormacaoAcademica } from "@/types/formacao";
import { STUB_FORMACAO } from "@/stubs/formacao.stub";
import { formacoesBrutasSchema } from "@/schemas/formacao/formacao.schema";
import { mapearFormacoes } from "./formacao.mapper";
import { simularLatencia } from "@/lib/latencia";
import { logger } from "@/lib/logger";

/**
 * Service de formação acadêmica.
 *
 * Fluxo: fonte (stub hoje, Supabase depois) -> validação de schema na
 * borda -> mapeamento para o domínio. Dados malformados são descartados.
 *
 * Futuramente: supabase.from('formacao').select('*')
 */
function validarEMapear(brutas: unknown): FormacaoAcademica[] {
  const resultado = formacoesBrutasSchema.safeParse(brutas);

  if (!resultado.success) {
    logger.error("Formação com formato inválido — descartando resposta", {
      erros: resultado.error.issues,
    });
    return [];
  }

  return mapearFormacoes(resultado.data);
}

export async function listarFormacao(): Promise<FormacaoAcademica[]> {
  await simularLatencia(300);

  return validarEMapear(STUB_FORMACAO).sort(
    (a, b) => b.dataInicio.toMillis() - a.dataInicio.toMillis(),
  );
}
