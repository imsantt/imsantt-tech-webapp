import type { ConfiguracaoSite } from "@/types/configuracao";
import { STUB_CONFIGURACAO } from "@/stubs/configuracao.stub";
import { simularLatencia } from "@/lib/latencia";

/**
 * Service de configuração do site (contato, navegação, etc).
 * Futuramente: supabase.from('configuracao_site').select('*').single()
 */
export async function obterConfiguracao(): Promise<ConfiguracaoSite> {
  await simularLatencia(100);
  return STUB_CONFIGURACAO;
}
