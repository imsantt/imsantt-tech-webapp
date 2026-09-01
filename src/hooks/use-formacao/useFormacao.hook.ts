import useSWR from "swr";
import { listarFormacao } from "@/services/formacao/formacao.service";
import type { FormacaoAcademica } from "@/types/formacao";

const CACHE_KEY = "formacao";

/**
 * Hook para buscar a formação acadêmica.
 * Usa SWR para cache e revalidação — mesmo padrão de useExperiencias.
 *
 * Quando migrar para Supabase, basta trocar o fetcher em formacao.service.ts.
 */
export function useFormacao() {
  const { data, error, isLoading } = useSWR<FormacaoAcademica[]>(
    CACHE_KEY,
    listarFormacao,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return {
    formacoes: data ?? [],
    isLoading,
    isError: !!error,
    error,
  };
}
