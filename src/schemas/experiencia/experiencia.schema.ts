import { z } from "zod";

/**
 * Schema de validação da fonte de dados de experiências.
 *
 * Este schema descreve o formato BRUTO da fonte (linha do Supabase):
 * snake_case e datas como string ISO (`YYYY-MM` ou `YYYY-MM-DD`).
 * A conversão para o modelo de domínio `Experiencia` (com luxon `DateTime`)
 * é responsabilidade do mapper — ver `experiencia.mapper.ts`.
 *
 * Fase 1: a fonte ainda é o stub, mas os dados passam por este schema
 * na borda do service, garantindo que a UI só receba dados no formato
 * esperado. Quando migrar para Supabase (Fase 2), o `select(...)` alimenta
 * exatamente este mesmo schema — nenhuma mudança em hook ou componentes.
 */

export const MODELOS_TRABALHO = [
  "remoto",
  "presencial",
  "hibrido",
] as const;

export const TIPOS_VINCULO = [
  "clt",
  "pj",
  "estagio",
  "freelance",
  "temporario",
] as const;

/** Aceita `YYYY-MM` ou `YYYY-MM-DD`. */
const dataIsoParcial = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "Data deve estar no formato YYYY-MM ou YYYY-MM-DD",
  );

export const destaqueBrutoSchema = z.object({
  texto: z.string().min(1),
  metrica: z.string().min(1).optional(),
});

export const experienciaBrutaSchema = z.object({
  id: z.string().min(1),
  empresa: z.string().min(1),
  cargo: z.string().min(1),
  data_inicio: dataIsoParcial,
  data_termino: dataIsoParcial.nullish(),
  descricao: z.string().min(1),
  tecnologias: z.array(z.string().min(1)),

  descricao_longa: z.string().min(1).nullish(),
  local: z.string().min(1).nullish(),
  modelo: z.enum(MODELOS_TRABALHO).nullish(),
  tipo: z.enum(TIPOS_VINCULO).nullish(),
  setor: z.string().min(1).nullish(),
  destaques: z.array(destaqueBrutoSchema).nullish(),
  site: z.string().url().nullish(),
});

export const experienciasBrutasSchema = z.array(experienciaBrutaSchema);

/** Formato bruto validado de uma experiência (pré-mapeamento). */
export type ExperienciaBruta = z.infer<typeof experienciaBrutaSchema>;
