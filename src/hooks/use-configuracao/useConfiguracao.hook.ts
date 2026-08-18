import useSWR from "swr";
import { obterConfiguracao } from "@/services/configuracao/configuracao.service";
import type { ConfiguracaoSite } from "@/types/configuracao";
import { STUB_CONFIGURACAO } from "@/stubs/configuracao.stub";

const CACHE_KEY = "configuracao-site";

/**
 * Hook para buscar configuração do site.
 * Usa SWR para cache e revalidação.
 * Retorna o stub como fallback enquanto carrega.
 */
export function useConfiguracao() {
  const { data, error, isLoading } = useSWR<ConfiguracaoSite>(
    CACHE_KEY,
    obterConfiguracao,
    {
      revalidateOnFocus: false,
      dedupingInterval: 120_000,
      fallbackData: STUB_CONFIGURACAO,
    },
  );

  return {
    configuracao: data ?? STUB_CONFIGURACAO,
    isLoading,
    isError: !!error,
    error,
  };
}
