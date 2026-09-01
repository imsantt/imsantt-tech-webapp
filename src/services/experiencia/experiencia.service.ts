import type { Experiencia } from "@/types/experiencia";
import { STUB_EXPERIENCIAS } from "@/stubs/experiencias.stub";
import { experienciasBrutasSchema } from "@/schemas/experiencia/experiencia.schema";
import { mapearExperiencias } from "./experiencia.mapper";
import { simularLatencia } from "@/lib/latencia";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/**
 * Service de experiências profissionais.
 *
 * Fluxo: fonte (Supabase, com fallback para stub) -> validação de schema
 * na borda -> mapeamento para o domínio. A UI só recebe dados que respeitam
 * o contrato; dados malformados nunca chegam ao componente.
 *
 * Fonte:
 * - Supabase quando as variáveis de ambiente estão configuradas.
 * - Stub local como fallback SINALIZADO (log) quando o Supabase não está
 *   configurado ou a consulta falha — o app não quebra, mas o fallback é
 *   sempre registrado, evitando mascarar ausência de configuração.
 */

const TABELA = "experiencias";

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

/** Fallback local sinalizado: usa o stub e registra o motivo. */
async function usarStub(motivo: string): Promise<unknown> {
  logger.warn(`Usando stub de experiências como fallback — ${motivo}`);
  await simularLatencia(300);
  return STUB_EXPERIENCIAS;
}

/**
 * Busca as linhas brutas da fonte. Retorna o formato bruto (snake_case),
 * que é validado e mapeado pela borda em `validarEMapear`.
 */
async function buscarBrutas(): Promise<unknown> {
  if (!supabase) {
    return usarStub("Supabase não configurado");
  }

  const { data, error } = await supabase.from(TABELA).select("*");

  if (error) {
    logger.error("Falha ao consultar experiências no Supabase", {
      mensagem: error.message,
    });
    return usarStub("erro na consulta ao Supabase");
  }

  return data;
}

export async function listarExperiencias(): Promise<Experiencia[]> {
  const brutas = await buscarBrutas();

  return validarEMapear(brutas).sort(
    (a, b) => b.dataInicio.toMillis() - a.dataInicio.toMillis(),
  );
}

export async function buscarExperienciaPorId(
  id: string,
): Promise<Experiencia | null> {
  const brutas = await buscarBrutas();

  return validarEMapear(brutas).find((e) => e.id === id) ?? null;
}
