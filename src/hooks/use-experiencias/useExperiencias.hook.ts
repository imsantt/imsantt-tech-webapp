import useSWR from "swr";
import { listarExperiencias } from "@/services/experiencia/experiencia.service";
import type { Experiencia } from "@/types/experiencia";

const CACHE_KEY = "experiencias";

/**
 * Hook para buscar experiências profissionais.
 * Usa SWR para cache, revalidação automática e stale-while-revalidate.
 *
 * Quando migrar para Supabase, basta trocar o fetcher em experiencia.service.ts
 * — este hook e os componentes permanecem inalterados.
 */
export function useExperiencias() {
  const { data, error, isLoading } = useSWR<Experiencia[]>(
    CACHE_KEY,
    listarExperiencias,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000, // 1 min de deduplicação
    },
  );

  return {
    experiencias: data ?? [],
    isLoading,
    isError: !!error,
    error,
  };
}
