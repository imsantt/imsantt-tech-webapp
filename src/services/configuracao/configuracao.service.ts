import type { ConfiguracaoSite } from "@/types/configuracao";
import { STUB_CONFIGURACAO } from "@/stubs/configuracao.stub";

/**
 * Service de configuração do site.
 * Fonte única para dados configuráveis (contato, navegação, etc).
 * Futuramente: supabase.from('configuracao_site').select('*').single()
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function obterConfiguracao(): Promise<ConfiguracaoSite> {
  await delay(100);
  return STUB_CONFIGURACAO;
}
