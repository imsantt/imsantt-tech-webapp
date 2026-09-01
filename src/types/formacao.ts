import type { DateTime } from "luxon";

/**
 * Grau/tipo de formação acadêmica.
 */
export type GrauFormacao =
  | "especializacao"
  | "mestrado"
  | "graduacao"
  | "tecnologo"
  | "tecnico";

/**
 * Certificado/diploma anexado a uma formação.
 */
export interface CertificadoFormacao {
  /** Título exibido (ex.: "Certificado Especialização em Engenharia de Software"). */
  titulo: string;
  /** URL do documento/certificado, quando disponível. */
  url?: string;
}

/**
 * Modelo de domínio — Formação acadêmica.
 * Segue o mesmo padrão de Experiencia: consumido por service, hook e componentes.
 */
export interface FormacaoAcademica {
  id: string;
  instituicao: string;
  /** Curso/título obtido (ex.: "Pós-graduação Lato Sensu - Especialização"). */
  curso: string;
  /** Área de estudo (ex.: "Computer Software Engineering"). */
  area?: string;
  grau: GrauFormacao;
  dataInicio: DateTime;
  dataTermino?: DateTime;
  /** Certificado/diploma associado. */
  certificado?: CertificadoFormacao;
}
