import type { FormacaoAcademica } from "@/types/formacao";
import { STUB_FORMACAO } from "@/stubs/formacao.stub";
import { formacoesBrutasSchema } from "@/schemas/formacao/formacao.schema";
import { mapearFormacoes } from "./formacao.mapper";
import { simularLatencia } from "@/lib/latencia";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/**
 * Service de formação acadêmica.
 *
 * Fonte: Supabase (`formacao`) com fallback SINALIZADO para o stub local
 * quando o Supabase não está configurado ou a consulta falha. A validação
 * de schema na borda garante que a UI só receba dados válidos.
 */

const TABELA = "formacoes";

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

async function usarStub(motivo: string): Promise<unknown> {
  logger.warn(`Usando stub de formação como fallback — ${motivo}`);
  await simularLatencia(300);
  return STUB_FORMACAO;
}

async function buscarBrutas(): Promise<unknown> {
  if (!supabase) {
    return usarStub("Supabase não configurado");
  }

  const { data, error } = await supabase.from(TABELA).select("*");

  if (error) {
    logger.error("Falha ao consultar formação no Supabase", {
      mensagem: error.message,
    });
    return usarStub("erro na consulta ao Supabase");
  }

  return data;
}

export async function listarFormacao(): Promise<FormacaoAcademica[]> {
  const brutas = await buscarBrutas();

  return validarEMapear(brutas).sort(
    (a, b) => b.dataInicio.toMillis() - a.dataInicio.toMillis(),
  );
}
