import useSWR from "swr";
import { listarCertificacoes } from "@/services/certificacao/certificacao.service";
import type { Certificacao } from "@/types/certificacao";

const CACHE_KEY = "certificacoes";

/**
 * Hook para buscar cursos e certificações.
 * Usa SWR para cache e revalidação — mesmo padrão de useExperiencias.
 *
 * Quando migrar para Supabase, basta trocar o fetcher em certificacao.service.ts.
 */
export function useCertificacoes() {
  const { data, error, isLoading } = useSWR<Certificacao[]>(
    CACHE_KEY,
    listarCertificacoes,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return {
    certificacoes: data ?? [],
    isLoading,
    isError: !!error,
    error,
  };
}
