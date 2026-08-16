import useSWR from "swr";
import { listarExpertises } from "../../services/expertise.service";
import type { Expertise } from "../../types/expertise";

const CACHE_KEY = "expertises";

/**
 * Hook para buscar expertises/competências.
 * Usa SWR para cache e revalidação.
 */
export function useExpertises() {
  const { data, error, isLoading } = useSWR<Expertise[]>(
    CACHE_KEY,
    listarExpertises,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return {
    expertises: data ?? [],
    isLoading,
    isError: !!error,
    error,
  };
}
