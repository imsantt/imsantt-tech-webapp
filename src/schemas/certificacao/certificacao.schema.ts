import { z } from "zod";

/**
 * Schema de validação da fonte de dados de certificações.
 *
 * Descreve o formato BRUTO da fonte (linha do Supabase): snake_case e
 * data de emissão como string ISO (`YYYY-MM` ou `YYYY-MM-DD`). A conversão
 * para o domínio `Certificacao` (com luxon `DateTime`) é feita no mapper.
 */

export const CATEGORIAS_CERTIFICACAO = [
  "cloud",
  "lideranca",
  "ia",
  "produto",
  "outros",
] as const;

/** Aceita `YYYY-MM` ou `YYYY-MM-DD`. */
const dataIsoParcial = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "Data deve estar no formato YYYY-MM ou YYYY-MM-DD",
  );

export const certificacaoBrutaSchema = z.object({
  id: z.string().min(1),
  titulo: z.string().min(1),
  instituicao: z.string().min(1),
  categoria: z.enum(CATEGORIAS_CERTIFICACAO),
  emitida_em: dataIsoParcial,
  competencias: z.array(z.string().min(1)).nullish(),
  credencial_url: z.string().url().nullish(),
});

export const certificacoesBrutasSchema = z.array(certificacaoBrutaSchema);

/** Formato bruto validado de uma certificação (pré-mapeamento). */
export type CertificacaoBruta = z.infer<typeof certificacaoBrutaSchema>;
