import type { ConfiguracaoSite } from "@/types/configuracao";

export const STUB_CONFIGURACAO: ConfiguracaoSite = {
  contato: {
    email: "contato@imsantt.tech",
    telefone: "",
  },
  navegacao: [
    { label: "Início", href: "#hero" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Contato", href: "#contato" },
  ],
  linksAjuda: [
    { label: "Política de privacidade", href: "#" },
    { label: "Termos de uso", href: "#" },
  ],
  redesSociais: [
    { label: "GitHub", href: "https://github.com/imsantt", icone: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/imsantt",
      icone: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/_imsantt",
      icone: "instagram",
    },
  ],
  nomeAutor: "Robert Santos",
  cargo: "Especialista em Arquitetura e Engenharia de Software",
  disponivel: true,
};
