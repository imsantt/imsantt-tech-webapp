import type { ConfiguracaoSite } from "@/types/configuracao";
import { STUB_CONFIGURACAO } from "@/stubs/configuracao.stub";
import { configuracaoSiteSchema } from "@/schemas/configuracao/configuracao.schema";
import { simularLatencia } from "@/lib/latencia";
import { logger } from "@/lib/logger";

/**
 * Service de configuração do site (contato, navegação, etc).
 *
 * A configuração é um objeto único e crítico para a UI (navegação, contato,
 * rodapé). Por isso, ao contrário dos serviços de listagem, uma falha de
 * schema NÃO retorna vazio: loga o problema e devolve o stub local como
 * fallback seguro, evitando derrubar a navegação por config remota inválida.
 *
 * Futuramente: supabase.from('configuracao_site').select('*').single()
 */
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
  await simularLatencia(100);
  return validar(STUB_CONFIGURACAO);
}
