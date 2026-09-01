import { z } from "zod";

/**
 * Schema de validação da fonte de dados de formação acadêmica.
 *
 * Descreve o formato BRUTO da fonte (linha do Supabase): snake_case e
 * datas como string ISO (`YYYY-MM` ou `YYYY-MM-DD`). A conversão para o
 * domínio `FormacaoAcademica` (com luxon `DateTime`) é feita no mapper.
 */

export const GRAUS_FORMACAO = [
  "especializacao",
  "mestrado",
  "graduacao",
  "tecnologo",
  "tecnico",
] as const;

/** Aceita `YYYY-MM` ou `YYYY-MM-DD`. */
const dataIsoParcial = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "Data deve estar no formato YYYY-MM ou YYYY-MM-DD",
  );

export const certificadoFormacaoBrutoSchema = z.object({
  titulo: z.string().min(1),
  url: z.string().url().nullish(),
});

export const formacaoBrutaSchema = z.object({
  id: z.string().min(1),
  instituicao: z.string().min(1),
  curso: z.string().min(1),
  area: z.string().min(1).nullish(),
  grau: z.enum(GRAUS_FORMACAO),
  data_inicio: dataIsoParcial,
  data_termino: dataIsoParcial.nullish(),
  certificado: certificadoFormacaoBrutoSchema.nullish(),
});

export const formacoesBrutasSchema = z.array(formacaoBrutaSchema);

/** Formato bruto validado de uma formação (pré-mapeamento). */
export type FormacaoBruta = z.infer<typeof formacaoBrutaSchema>;
