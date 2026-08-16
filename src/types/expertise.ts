import type { IconType } from "react-icons";

/**
 * Modelo de domínio — Expertise/competência.
 */
export interface Expertise {
  id: string;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  icone: IconType;
  iconeBg: string;
  iconeColor: string;
}
