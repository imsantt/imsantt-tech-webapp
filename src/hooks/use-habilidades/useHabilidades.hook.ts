import useSWR from "swr";
import { listarHabilidades } from "@/services/habilidade/habilidade.service";
import type { CategoriaHabilidade } from "@/types/habilidade";

const CACHE_KEY = "habilidades";

/**
 * Hook para buscar categorias de habilidades.
 * Usa SWR para cache e revalidação.
 */
export function useHabilidades() {
  const { data, error, isLoading } = useSWR<CategoriaHabilidade[]>(
    CACHE_KEY,
    listarHabilidades,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return {
    categorias: data ?? [],
    isLoading,
    isError: !!error,
    error,
  };
}
