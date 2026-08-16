import type { DateTime } from "luxon";

/**
 * Modelo de domínio — Experiência profissional.
 * Contrato compartilhado entre service, hook e componentes.
 */
export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: DateTime;
  dataTermino?: DateTime;
  descricao: string;
  tecnologias: string[];
}
