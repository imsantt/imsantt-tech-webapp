import type { Experiencia } from "@/types/experiencia";
import { STUB_EXPERIENCIAS } from "@/stubs/experiencias.stub";
import { experienciasBrutasSchema } from "@/schemas/experiencia.schema";
import { mapearExperiencias } from "./experiencia.mapper";
import { simularLatencia } from "@/lib/latencia";
import { logger } from "@/lib/logger";

/**
 * Service de experiências profissionais.
 *
 * Fluxo: fonte (stub hoje, Supabase na Fase 2) -> validação de schema
 * na borda -> mapeamento para o domínio. A UI só recebe dados que
 * respeitam o contrato; dados malformados nunca chegam ao componente.
 *
 * Futuramente: supabase.from('experiencias').select('*')
 */

/**
 * Valida a resposta bruta da fonte contra o schema e a converte para o
 * domínio. Em caso de falha de schema, loga e devolve lista vazia — a UI
 * trata "sem dados" com segurança, em vez de renderizar dado inconsistente.
 */
function validarEMapear(brutas: unknown): Experiencia[] {
  const resultado = experienciasBrutasSchema.safeParse(brutas);

  if (!resultado.success) {
    logger.error("Experiências com formato inválido — descartando resposta", {
      erros: resultado.error.issues,
    });
    return [];
  }

  return mapearExperiencias(resultado.data);
}

export async function listarExperiencias(): Promise<Experiencia[]> {
  await simularLatencia(300);

  return validarEMapear(STUB_EXPERIENCIAS).sort(
    (a, b) => b.dataInicio.toMillis() - a.dataInicio.toMillis(),
  );
}

export async function buscarExperienciaPorId(
  id: string,
): Promise<Experiencia | null> {
  await simularLatencia(200);

  return validarEMapear(STUB_EXPERIENCIAS).find((e) => e.id === id) ?? null;
}
