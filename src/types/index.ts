// Tipos globais da aplicação
// Tipos específicos de feature ficam dentro de src/features/<feature>/types.ts

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

export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  descricao: string;
  tecnologias: string[];
  inicio: string;
  fim?: string; // undefined = emprego atual
  atual: boolean;
}

export interface MensagemContato {
  nome: string;
  email: string;
  mensagem: string;
}
