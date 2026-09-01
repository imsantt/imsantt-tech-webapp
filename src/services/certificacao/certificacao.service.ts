import type { Certificacao } from "@/types/certificacao";
import { STUB_CERTIFICACOES } from "@/stubs/certificacoes.stub";
import { certificacoesBrutasSchema } from "@/schemas/certificacao/certificacao.schema";
import { mapearCertificacoes } from "./certificacao.mapper";
import { simularLatencia } from "@/lib/latencia";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/**
 * Service de cursos e certificações.
 *
 * Fonte: Supabase (`certificacoes`) com fallback SINALIZADO para o stub
 * local quando o Supabase não está configurado ou a consulta falha.
 * A validação de schema na borda garante que a UI só receba dados válidos.
 */

const TABELA = "certificacoes";

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

async function usarStub(motivo: string): Promise<unknown> {
  logger.warn(`Usando stub de certificações como fallback — ${motivo}`);
  await simularLatencia(300);
  return STUB_CERTIFICACOES;
}

async function buscarBrutas(): Promise<unknown> {
  if (!supabase) {
    return usarStub("Supabase não configurado");
  }

  const { data, error } = await supabase.from(TABELA).select("*");

  if (error) {
    logger.error("Falha ao consultar certificações no Supabase", {
      mensagem: error.message,
    });
    return usarStub("erro na consulta ao Supabase");
  }

  return data;
}

export async function listarCertificacoes(): Promise<Certificacao[]> {
  const brutas = await buscarBrutas();

  return validarEMapear(brutas).sort(
    (a, b) => b.emitidaEm.toMillis() - a.emitidaEm.toMillis(),
  );
}
