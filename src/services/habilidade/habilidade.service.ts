import type { CategoriaHabilidade } from "@/types/habilidade";
import { STUB_HABILIDADES } from "@/stubs/habilidades.stub";
import { categoriasHabilidadeSchema } from "@/schemas/habilidade/habilidade.schema";
import { simularLatencia } from "@/lib/latencia";
import { logger } from "@/lib/logger";

/**
 * Service de habilidades/competências (seção Habilidades e página /habilidades).
 * Futuramente: supabase.from('habilidades').select('*').order('ordem')
 *
 * ─── GUARDRAIL DE SEGURANÇA (ao migrar do stub para dados remotos) ───────────
 * Ao consumir uma fonte externa, os campos de texto tornam-se dados NÃO
 * CONFIÁVEIS. A validação de schema abaixo já cobre a borda:
 *
 * 1. Renderização de texto (titulo, descricao, nome): manter SEMPRE como texto
 *    via JSX ({valor}). NUNCA usar dangerouslySetInnerHTML com esses campos.
 * 2. `id` da categoria: usado em âncoras/hrefs (`#cat-${id}`); o schema valida
 *    o padrão /^[a-z0-9-]+$/ e descarta valores fora dele.
 * 3. `nivel`: validado contra o enum NivelHabilidade; valores fora são rejeitados.
 * 4. `icone`: é um componente (IconType), NÃO é validado nem aceito da rede —
 *    o mapeamento nome→componente permanece no cliente (allowlist).
 */
function validar(categorias: unknown): CategoriaHabilidade[] {
  const resultado = categoriasHabilidadeSchema.safeParse(categorias);

  if (!resultado.success) {
    logger.error("Habilidades com formato inválido — descartando resposta", {
      erros: resultado.error.issues,
    });
    return [];
  }

  // A validação garante o contrato dos campos serializáveis; devolvemos o
  // objeto original, que preserva o `icone` (IconType) resolvido no cliente.
  return STUB_HABILIDADES;
}

export async function listarHabilidades(): Promise<CategoriaHabilidade[]> {
  await simularLatencia(200);
  return validar(STUB_HABILIDADES);
}
