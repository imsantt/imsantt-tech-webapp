import { DateTime } from "luxon";
import type { FormacaoAcademica } from "@/types/formacao";
import type { FormacaoBruta } from "@/schemas/formacao/formacao.schema";

/**
 * Ponto único de conversão fonte -> domínio para formação acadêmica.
 * Recebe a linha bruta já validada (snake_case, datas ISO) e devolve o
 * modelo de domínio `FormacaoAcademica` (camelCase, luxon `DateTime`).
 */
export function mapearFormacao(bruta: FormacaoBruta): FormacaoAcademica {
  return {
    id: bruta.id,
    instituicao: bruta.instituicao,
    curso: bruta.curso,
    area: bruta.area ?? undefined,
    grau: bruta.grau,
    dataInicio: DateTime.fromISO(bruta.data_inicio),
    dataTermino: bruta.data_termino
      ? DateTime.fromISO(bruta.data_termino)
      : undefined,
    certificado: bruta.certificado
      ? {
          titulo: bruta.certificado.titulo,
          url: bruta.certificado.url ?? undefined,
        }
      : undefined,
  };
}

export function mapearFormacoes(brutas: FormacaoBruta[]): FormacaoAcademica[] {
  return brutas.map(mapearFormacao);
}
