import useSWR from "swr";
import { obterSessao } from "@/services/autenticacao/autenticacao.service";
import type { RespostaSessao } from "@/types/autenticacao";

const CACHE_KEY = "sessao-atual";

/**
 * Hook para consultar a sessão atual (via /auth/me).
 * A fonte de verdade é o cookie HttpOnly assinado no servidor; aqui só
 * refletimos o estado para a UI.
 */
export function useSessao() {
  const { data, error, isLoading, mutate } = useSWR<RespostaSessao>(
    CACHE_KEY,
    obterSessao,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      dedupingInterval: 30_000,
    },
  );

  return {
    autenticado: data?.autenticado ?? false,
    usuario: data?.usuario ?? null,
    isLoading,
    isError: !!error,
    revalidar: mutate,
  };
}
