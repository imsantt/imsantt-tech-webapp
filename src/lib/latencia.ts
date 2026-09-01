/**
 * Simula latência de rede enquanto os dados vêm de stubs locais.
 * Remover quando os services passarem a consumir o Supabase.
 */
export function simularLatencia(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
