/**
 * Conteúdo estático do Hero.
 * Quando o CMS existir, basta trocar a fonte de dados
 * sem alterar o componente visual.
 */

export interface Metrica {
  valor: string;
  rotulo: string;
}

export const heroContent = {
  badge: "Estrategista em Tecnologia & IA",
  indice: "01 — Perfil",
  papel: "Software Engineering · Arquitetura de Sistemas · IA",
  nome: "Robert",
  sobrenome: "Santos",
  descricao:
    "Engenheiro de Software Sênior & Arquiteto de Sistemas com foco em microsserviços escaláveis, inteligência artificial e computação em nuvem. Conecto engenharia de alta performance, estratégia de negócio e desenvolvimento de pessoas para entregar soluções que geram impacto real e transformam equipes.",
  // Rótulo da métrica de tempo de carreira — o valor é calculado em runtime
  // a partir da experiência mais antiga retornada pelo hook useExperiencias.
  rotuloAnosExperiencia: "anos de experiência",
  // Métricas de valor fixo (não derivadas de dados).
  metricasFixas: [
    { valor: "∞", rotulo: "sistemas em produção" },
    { valor: "MG", rotulo: "Contagem, Brasil" },
  ] satisfies Metrica[],
  ctaPrimario: {
    texto: "Ver Experiências",
    ancora: "habilidades",
  },
  ctaSecundario: {
    texto: "Baixar Currículo",
    textoAtivo: "Download iniciado!",
    arquivo: "/curriculo-robert-santos.pdf",
    ariaLabel: "Baixar currículo em PDF",
  },
  imagem: {
    alt: "Foto de Robert Santos",
  },
} as const;
