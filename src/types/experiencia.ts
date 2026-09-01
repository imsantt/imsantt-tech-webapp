import type { DateTime } from "luxon";

/**
 * Modalidade de trabalho de uma experiência.
 */
export type ModeloTrabalho = "remoto" | "presencial" | "hibrido";

/**
 * Vínculo/regime de contratação.
 */
export type TipoVinculo = "clt" | "pj" | "estagio" | "freelance" | "temporario";

/**
 * Destaque/conquista de uma experiência — item de bullet na timeline.
 */
export interface DestaqueExperiencia {
  /** Texto do destaque/conquista. */
  texto: string;
  /** Métrica ou impacto opcional exibido em evidência (ex.: "-40% tempo de deploy"). */
  metrica?: string;
}

/**
 * Modelo de domínio — Experiência profissional.
 * Contrato compartilhado entre service, hook e componentes.
 *
 * Os campos abaixo do `descricao` são opcionais: a versão resumida (card na home)
 * usa apenas os campos base, enquanto a página de detalhes (/experiencias)
 * aproveita todo o conteúdo enriquecido quando disponível.
 */
export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: DateTime;
  dataTermino?: DateTime;
  descricao: string;
  tecnologias: string[];

  /** Descrição estendida — parágrafo(s) de contexto para a página de detalhes. */
  descricaoLonga?: string;
  /** Localização (cidade/estado ou país). */
  local?: string;
  /** Modalidade de trabalho. */
  modelo?: ModeloTrabalho;
  /** Regime de contratação. */
  tipo?: TipoVinculo;
  /** Setor/segmento da empresa (ex.: "Educação", "Bancário"). */
  setor?: string;
  /** Principais entregas e conquistas — exibidas como bullets na timeline. */
  destaques?: DestaqueExperiencia[];
  /** Site institucional da empresa, quando público. */
  site?: string;
}
