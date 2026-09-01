import { DateTime } from "luxon";
import type { Certificacao } from "@/types/certificacao";
import type { CertificacaoBruta } from "@/schemas/certificacao/certificacao.schema";

/**
 * Ponto único de conversão fonte -> domínio para certificações.
 * Recebe a linha bruta já validada (snake_case, data ISO) e devolve o
 * modelo de domínio `Certificacao` (camelCase, luxon `DateTime`).
 */
export function mapearCertificacao(bruta: CertificacaoBruta): Certificacao {
  return {
    id: bruta.id,
    titulo: bruta.titulo,
    instituicao: bruta.instituicao,
    categoria: bruta.categoria,
    emitidaEm: DateTime.fromISO(bruta.emitida_em),
    competencias: bruta.competencias ?? undefined,
    credencialUrl: bruta.credencial_url ?? undefined,
  };
}

export function mapearCertificacoes(
  brutas: CertificacaoBruta[],
): Certificacao[] {
  return brutas.map(mapearCertificacao);
}
