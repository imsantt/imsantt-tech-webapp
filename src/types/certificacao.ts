import type { DateTime } from "luxon";

/**
 * Categoria temática de uma certificação — usada para filtro na UI.
 */
export type CategoriaCertificacao =
  | "cloud"
  | "lideranca"
  | "ia"
  | "produto"
  | "outros";

/**
 * Modelo de domínio — Curso / Certificação.
 * Segue o mesmo padrão de Experiencia e FormacaoAcademica.
 */
export interface Certificacao {
  id: string;
  titulo: string;
  /** Instituição/plataforma emissora (ex.: "Amazon Web Services (AWS)"). */
  instituicao: string;
  categoria: CategoriaCertificacao;
  /** Data de emissão. */
  emitidaEm: DateTime;
  /** Principais competências associadas. */
  competencias?: string[];
  /** URL pública da credencial, quando disponível. */
  credencialUrl?: string;
}
