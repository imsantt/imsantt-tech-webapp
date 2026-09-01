import { DateTime } from "luxon";
import type { Experiencia } from "@/types/experiencia";

export const STUB_EXPERIENCIAS: Experiencia[] = [
  {
    id: "yduqs",
    empresa: "YDUQS",
    cargo: "Engenheiro de Software Fullstack Sr. / Apoio à Liderança Técnica",
    dataInicio: DateTime.fromObject({ year: 2023, month: 11 }),
    descricao:
      "Apoio direto à Liderança Técnica no alinhamento estratégico entre produto/negócio e arquitetura de software para os portais do maior grupo educacional do país.",
    tecnologias: ["NestJS", "React", "AWS", "Terraform", "Docker"],
  },
  {
    id: "senai",
    empresa: "SENAI/SC",
    cargo: "Instrutor em Desenvolvimento Web / Mentor Técnico",
    dataInicio: DateTime.fromObject({ year: 2023, month: 5 }),
    dataTermino: DateTime.fromObject({ year: 2023, month: 12 }),
    descricao:
      "Liderança técnica de turmas do projeto DEVInHouse, instruindo sobre arquitetura moderna, código limpo e ecossistema React, Angular e TypeScript.",
    tecnologias: ["React", "Angular", "TypeScript", "Scrum"],
  },
  {
    id: "act-digital",
    empresa: "act digital",
    cargo: "Engenheiro de Software Front-End Sr.",
    dataInicio: DateTime.fromObject({ year: 2022, month: 7 }),
    dataTermino: DateTime.fromObject({ year: 2023, month: 4 }),
    descricao:
      "Arquitetura front-end do Internet Banking PJ (Banco ABC), módulo de pagamentos de alta complexidade transacional.",
    tecnologias: ["Angular", "TypeScript", "Azure DevOps"],
  },
  {
    id: "gama-academy",
    empresa: "Gama Academy",
    cargo: "Mentor em Desenvolvimento de Soluções Web",
    dataInicio: DateTime.fromObject({ year: 2022, month: 8 }),
    dataTermino: DateTime.fromObject({ year: 2022, month: 9 }),
    descricao:
      "Mentoria técnica End-to-End para squads em programas de aceleração, cobrindo arquitetura de software e desenvolvimento fullstack.",
    tecnologias: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "jdc",
    empresa: "JDC",
    cargo: "Analista Desenvolvedor Fullstack",
    dataInicio: DateTime.fromObject({ year: 2021, month: 8 }),
    dataTermino: DateTime.fromObject({ year: 2022, month: 7 }),
    descricao:
      "Desenvolvimento fullstack com Angular, React, Node.js e PHP, além de modelagem e otimização de bancos de dados relacionais.",
    tecnologias: ["Angular", "React", "Node.js", "PHP", "MySQL"],
  },
  {
    id: "framework",
    empresa: "framework",
    cargo: "Analista Desenvolvedor Front-End",
    dataInicio: DateTime.fromObject({ year: 2020, month: 11 }),
    dataTermino: DateTime.fromObject({ year: 2021, month: 7 }),
    descricao:
      "Atuação no desenvolvimento e manutenção de plataformas de alta escala, com foco nos projetos Portal B2B e Portal Seminovos. Responsável por interfaces dinâmicas de alta performance em Angular, fluxos de checkout e busca avançada, consumo de APIs em tempo real e componentização para acelerar entregas em ecossistemas de e-commerce.",
    tecnologias: ["Angular", "JWT", "DDD", "Scrum"],
  },
  {
    id: "spm-365",
    empresa: "SPM 365",
    cargo: "Desenvolvedor Fullstack",
    dataInicio: DateTime.fromObject({ year: 2019, month: 9 }),
    dataTermino: DateTime.fromObject({ year: 2020, month: 11 }),
    descricao:
      "Desenvolvimento e sustentação de uma plataforma de jogos de alto tráfego, participando de todo o ciclo de vida do produto. Construção de APIs robustas com PHP e Laravel, modernização de frontend com AngularJS e Angular, modelagem e otimização de bancos MySQL e interfaces responsivas de alta fidelidade visual.",
    tecnologias: ["PHP", "Laravel", "AngularJS", "Angular", "MySQL", "Git"],
  },
];
