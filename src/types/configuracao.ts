/**
 * Configuração do site gerenciável via CMS.
 */

export interface ContatoSite {
  email: string;
  telefone: string;
}

export interface LinkNavegacao {
  label: string;
  href: string;
}

export interface RedeSocial {
  label: string;
  href: string;
  icone: "github" | "linkedin" | "instagram";
}

export interface ConfiguracaoSite {
  contato: ContatoSite;
  navegacao: LinkNavegacao[];
  linksAjuda: LinkNavegacao[];
  redesSociais: RedeSocial[];
  nomeAutor: string;
  cargo: string;
  disponivel: boolean;
}
