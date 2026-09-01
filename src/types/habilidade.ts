import type { IconType } from "react-icons";

/**
 * Modelo de domínio — Habilidade individual.
 */
export interface Habilidade {
  nome: string;
  icone?: IconType;
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
