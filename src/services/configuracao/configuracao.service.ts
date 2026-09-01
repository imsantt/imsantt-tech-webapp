import type { ConfiguracaoSite } from "@/types/configuracao";
import { STUB_CONFIGURACAO } from "@/stubs/configuracao.stub";
import { configuracaoSiteSchema } from "@/schemas/configuracao/configuracao.schema";
import { simularLatencia } from "@/lib/latencia";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/**
 * Service de configuração do site (contato, navegação, etc).
 *
 * Fonte: Supabase (`configuracoes`, linha única) com fallback local.
 * A configuração é crítica para a UI (navegação, contato, rodapé); por isso,
 * uma falha de schema, de consulta ou de configuração NÃO retorna vazio:
 * loga o problema e devolve o stub local como fallback seguro.
 */

const TABELA = "configuracoes";

/** Fallback local sinalizado. */
function usarStub(motivo: string): ConfiguracaoSite {
  logger.warn(`Usando stub de configuração como fallback — ${motivo}`);
  return STUB_CONFIGURACAO;
}

function validar(dados: unknown): ConfiguracaoSite {
  const resultado = configuracaoSiteSchema.safeParse(dados);

  if (!resultado.success) {
    logger.error("Configuração do site inválida — usando fallback local", {
      erros: resultado.error.issues,
    });
    return STUB_CONFIGURACAO;
  }

  return resultado.data;
}

export async function obterConfiguracao(): Promise<ConfiguracaoSite> {
  if (!supabase) {
    await simularLatencia(100);
    return usarStub("Supabase não configurado");
  }

  const { data, error } = await supabase.from(TABELA).select("*").single();

  if (error) {
    logger.error("Falha ao consultar configuração no Supabase", {
      mensagem: error.message,
    });
    return usarStub("erro na consulta ao Supabase");
  }

  return validar(data);
}
