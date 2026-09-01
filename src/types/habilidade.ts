import type { IconType } from "react-icons";

/**
 * Nível de proficiência de uma competência.
 * Usado para sinalizar profundidade de domínio de forma discreta.
 */
export type NivelHabilidade = "especialista" | "avancado" | "proficiente";

/**
 * Modelo de domínio — Habilidade individual.
 */
export interface Habilidade {
  nome: string;
  icone?: IconType;
  /** Descrição curta de contexto/uso — exibida ao expandir a competência. */
  descricao?: string;
  /** Nível de proficiência — sinaliza profundidade de domínio. */
  nivel?: NivelHabilidade;
}

/**
 * Modelo de domínio — Categoria de habilidades.
 */
export interface CategoriaHabilidade {
  id: string;
  titulo: string;
  descricao: string;
  cor: string;
  corFundo: string;
  corBorda: string;
  corGlow?: string;
  icone: IconType;
  iconeBg: string;
  iconeColor: string;
  habilidades: Habilidade[];
}
