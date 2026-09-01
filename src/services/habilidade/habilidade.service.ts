import type { CategoriaHabilidade } from "@/types/habilidade";
import { STUB_HABILIDADES } from "@/stubs/habilidades.stub";
import { simularLatencia } from "@/lib/latencia";

/**
 * Service de habilidades/competências (seção Habilidades e página /habilidades).
 * Futuramente: supabase.from('habilidades').select('*').order('ordem')
 *
 * ─── GUARDRAIL DE SEGURANÇA (ao migrar do stub para dados remotos) ───────────
 * Hoje os dados vêm de um stub estático e confiável, sem risco. Ao passar a
 * consumir uma fonte externa (Supabase/API), os campos abaixo tornam-se dados
 * NÃO CONFIÁVEIS e precisam de cuidado ao serem exibidos:
 *
 * 1. Renderização de texto (titulo, descricao, nome): manter SEMPRE como texto
 *    via JSX ({valor}). NUNCA usar dangerouslySetInnerHTML com esses campos —
 *    isso reabriria vetor de XSS.
 * 2. `id` da categoria: é usado para montar âncoras de navegação (href={`#cat-${id}`})
 *    e ids de elementos. Validar/sanitizar para o padrão esperado (ex.: /^[a-z0-9-]+$/)
 *    antes de usar em href/id, evitando injeção de atributo ou seletores quebrados.
 * 3. `nivel`: só deve assumir os valores de NivelHabilidade
 *    ("especialista" | "avancado" | "proficiente"). Validar na entrada e descartar
 *    valores fora do enum, já que ele indexa mapas (ROTULO_NIVEL/OPACIDADE_NIVEL).
 * 4. `icone`: no stub é uma referência a componente (IconType). NÃO aceitar nome
 *    de ícone vindo da rede para resolver dinamicamente sem uma allowlist —
 *    manter o mapeamento nome→componente no cliente.
 *
 * Recomendação: validar/normalizar a resposta remota (ex.: schema Zod) neste
 * service antes de devolvê-la às camadas de UI.
 */
export async function listarHabilidades(): Promise<CategoriaHabilidade[]> {
  await simularLatencia(200);
  return STUB_HABILIDADES;
}
