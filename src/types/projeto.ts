/**
 * Modelo de domínio — Projeto de portfólio.
 */
export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  url?: string;
  urlRepositorio?: string;
  imagemUrl?: string;
  destaque: boolean;
  criadoEm: string;
}
