import { z } from "zod";

/**
 * Schema de validação da fonte de dados de habilidades/competências.
 *
 * Diferente dos demais domínios, `CategoriaHabilidade` carrega um `icone`
 * do tipo `IconType` (componente React), que NÃO é serializável e NUNCA
 * virá de dados remotos — o guardrail em `habilidade.service.ts` determina
 * que ícones sejam resolvidos no cliente via allowlist.
 *
 * Por isso, este schema valida apenas os campos SERIALIZÁVEIS (texto,
 * cores, enums) e usa `.loose()` para tolerar o `icone` presente no objeto
 * sem rejeitá-lo. O `id` é validado com um padrão restrito porque é usado
 * para montar âncoras/hrefs na UI (`#cat-${id}`), evitando injeção.
 */

export const NIVEIS_HABILIDADE = [
  "especialista",
  "avancado",
  "proficiente",
] as const;

/** Padrão seguro para ids usados em href/id de elementos. */
const idSeguro = z
  .string()
  .regex(/^[a-z0-9-]+$/, "id deve conter apenas [a-z0-9-]");

const habilidadeSchema = z
  .object({
    nome: z.string().min(1),
    descricao: z.string().min(1).optional(),
    nivel: z.enum(NIVEIS_HABILIDADE).optional(),
  })
  .loose(); // tolera `icone` (IconType) sem validá-lo

export const categoriaHabilidadeSchema = z
  .object({
    id: idSeguro,
    titulo: z.string().min(1),
    descricao: z.string().min(1),
    cor: z.string().min(1),
    corFundo: z.string().min(1),
    corBorda: z.string().min(1),
    corGlow: z.string().min(1).optional(),
    iconeBg: z.string().min(1),
    iconeColor: z.string().min(1),
    habilidades: z.array(habilidadeSchema),
  })
  .loose(); // tolera `icone` (IconType) da categoria sem validá-lo

export const categoriasHabilidadeSchema = z.array(categoriaHabilidadeSchema);
