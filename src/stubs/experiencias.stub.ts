import { DateTime } from "luxon";
import type { Experiencia } from "@/types/experiencia";

export const STUB_EXPERIENCIAS: Experiencia[] = [
  {
    id: "yduqs",
    empresa: "YDUQS",
    cargo:
      "Engenheiro de Software Fullstack Especialista | Apoio à Liderança Técnica",
    dataInicio: DateTime.fromObject({ year: 2023, month: 11 }),
    descricao:
      "Apoio direto à Liderança Técnica no alinhamento estratégico entre produto/negócio e arquitetura de software para os portais do maior grupo educacional do país.",
    descricaoLonga:
      "Atuação híbrida entre engenharia e liderança técnica nos portais do maior grupo de educação superior privada do Brasil. Faço a ponte entre produto, negócio e engenharia — traduzindo objetivos estratégicos em decisões de arquitetura, definindo padrões de código e conduzindo revisões técnicas que sustentam plataformas de alto tráfego com milhões de estudantes.",
    local: "Remoto · Brasil",
    modelo: "remoto",
    tipo: "clt",
    setor: "Educação (EdTech)",
    tecnologias: ["NestJS", "React", "AWS", "Terraform", "Docker"],
    destaques: [
      {
        texto:
          "Apoio à liderança técnica no alinhamento entre roadmap de produto e arquitetura de software.",
      },
      {
        texto:
          "Definição de padrões de arquitetura e boas práticas adotados por múltiplas squads.",
      },
      {
        texto:
          "Infraestrutura como código com Terraform e provisionamento em AWS.",
      },
      {
        texto:
          "Mentoria técnica de desenvolvedores e condução de revisões de código.",
      },
    ],
  },
  {
    id: "senai",
    empresa: "SENAI/SC",
    cargo: "Instrutor em Desenvolvimento Web / Mentor Técnico",
    dataInicio: DateTime.fromObject({ year: 2023, month: 5 }),
    dataTermino: DateTime.fromObject({ year: 2023, month: 12 }),
    descricao:
      "Liderança técnica de turmas do projeto DEVInHouse, instruindo sobre arquitetura moderna, código limpo e ecossistema React, Angular e TypeScript.",
    descricaoLonga:
      "Instrutor e mentor técnico no DEVInHouse, programa de formação acelerada em parceria com empresas de tecnologia de Santa Catarina. Conduzi turmas do início ao mercado de trabalho, cobrindo desde fundamentos de front-end até arquitetura de aplicações e trabalho em equipe com metodologias ágeis.",
    local: "Florianópolis, SC · Remoto",
    modelo: "hibrido",
    tipo: "pj",
    setor: "Educação | Tecnologia",
    tecnologias: ["React", "Angular", "TypeScript", "Scrum"],
    destaques: [
      {
        texto:
          "Formação de turmas de desenvolvedores do zero ao primeiro emprego em tech.",
      },
      {
        texto:
          "Ensino de arquitetura moderna, código limpo e ecossistema React/Angular.",
      },
      {
        texto:
          "Mentoria individual e acompanhamento de evolução técnica dos alunos.",
      },
    ],
  },
  {
    id: "act-digital",
    empresa: "act digital",
    cargo: "Engenheiro de Software Front-End Sr.",
    dataInicio: DateTime.fromObject({ year: 2022, month: 7 }),
    dataTermino: DateTime.fromObject({ year: 2023, month: 4 }),
    descricao:
      "Arquitetura front-end do Internet Banking PJ (Banco ABC), módulo de pagamentos de alta complexidade transacional.",
    descricaoLonga:
      "Responsável pela arquitetura front-end do Internet Banking PJ do Banco ABC, com foco no módulo de pagamentos — um dos fluxos mais críticos e de maior complexidade transacional da plataforma. Trabalho em ambiente regulado, com forte exigência de segurança, rastreabilidade e resiliência.",
    local: "Remoto · Brasil",
    modelo: "remoto",
    tipo: "pj",
    setor: "Consultoria | Bancário | Fintech",
    tecnologias: ["Angular", "TypeScript", "Azure DevOps"],
    destaques: [
      {
        texto:
          "Arquitetura front-end do módulo de pagamentos do Internet Banking PJ.",
      },
      {
        texto:
          "Implementação de fluxos transacionais de alta criticidade e segurança.",
      },
      {
        texto: "Pipeline de CI/CD e versionamento em Azure DevOps.",
      },
    ],
  },
  {
    id: "gama-academy",
    empresa: "Gama Academy",
    cargo: "Mentor em Desenvolvimento de Soluções Web",
    dataInicio: DateTime.fromObject({ year: 2022, month: 8 }),
    dataTermino: DateTime.fromObject({ year: 2022, month: 9 }),
    descricao:
      "Mentoria técnica End-to-End para squads em programas de aceleração, cobrindo arquitetura de software e desenvolvimento fullstack.",
    descricaoLonga:
      "Mentor técnico em programas de aceleração da Gama Academy, apoiando squads no desenvolvimento de soluções web end-to-end. Atuação concentrada em desbloquear equipes tecnicamente, revisar decisões de arquitetura e elevar a qualidade das entregas em ciclos curtos.",
    local: "Remoto · Brasil",
    modelo: "remoto",
    tipo: "freelance",
    setor: "Educação | Tecnologia",
    tecnologias: ["React", "TypeScript", "Node.js"],
    destaques: [
      {
        texto:
          "Mentoria técnica end-to-end de squads em programa de aceleração.",
      },
      {
        texto:
          "Orientação em arquitetura de software e desenvolvimento fullstack.",
      },
    ],
  },
  {
    id: "jdc",
    empresa: "JDC",
    cargo: "Analista Desenvolvedor Fullstack",
    dataInicio: DateTime.fromObject({ year: 2021, month: 8 }),
    dataTermino: DateTime.fromObject({ year: 2022, month: 7 }),
    descricao:
      "Desenvolvimento fullstack com Angular, React, Node.js e PHP, além de modelagem e otimização de bancos de dados relacionais.",
    descricaoLonga:
      "Desenvolvimento fullstack em múltiplos projetos, transitando entre Angular, React, Node.js e PHP conforme a stack de cada produto. Além do desenvolvimento de interfaces e APIs, atuei na modelagem e otimização de bancos de dados relacionais para sustentar consultas de alto volume.",
    local: "Brasil",
    modelo: "hibrido",
    tipo: "clt",
    setor: "Consultoria | Tecnologia",
    tecnologias: ["Angular", "React", "Node.js", "PHP", "MySQL"],
    destaques: [
      {
        texto: "Desenvolvimento fullstack em Angular, React, Node.js e PHP.",
      },
      {
        texto: "Modelagem e otimização de bancos de dados relacionais MySQL.",
      },
      {
        texto: "Entregas em múltiplos produtos e stacks simultaneamente.",
      },
    ],
  },
  {
    id: "framework",
    empresa: "framework",
    cargo: "Analista Desenvolvedor Front-End",
    dataInicio: DateTime.fromObject({ year: 2020, month: 11 }),
    dataTermino: DateTime.fromObject({ year: 2021, month: 7 }),
    descricao:
      "Atuação no desenvolvimento e manutenção de plataformas de alta escala, com foco nos projetos Portal B2B e Portal Seminovos.",
    descricaoLonga:
      "Desenvolvimento e manutenção de plataformas de alta escala nos projetos Portal B2B e Portal Seminovos. Responsável por interfaces dinâmicas de alta performance em Angular, fluxos de checkout, busca avançada e consumo de APIs em tempo real, além de componentização para acelerar entregas em ecossistemas de e-commerce.",
    local: "Brasil",
    modelo: "hibrido",
    tipo: "clt",
    setor: "Consultoria | Financeiro | Locação e venda de veiculos",
    tecnologias: ["Angular", "JWT", "DDD", "Scrum"],
    destaques: [
      {
        texto:
          "Interfaces dinâmicas de alta performance em Angular para os portais B2B e Seminovos.",
      },
      {
        texto:
          "Fluxos de checkout e busca avançada em ecossistema de e-commerce.",
      },
      {
        texto:
          "Componentização para acelerar entregas e padronizar a interface.",
      },
    ],
  },
  {
    id: "spm-365",
    empresa: "SPM 365",
    cargo: "Desenvolvedor Fullstack",
    dataInicio: DateTime.fromObject({ year: 2019, month: 9 }),
    dataTermino: DateTime.fromObject({ year: 2020, month: 11 }),
    descricao:
      "Desenvolvimento e sustentação de uma plataforma de jogos de alto tráfego, participando de todo o ciclo de vida do produto.",
    descricaoLonga:
      "Primeira experiência profissional em desenvolvimento fullstack, atuando no ciclo de vida completo de uma plataforma de jogos de alto tráfego. Construí APIs robustas com PHP e Laravel, modernizei o front-end de AngularJS para Angular e trabalhei na modelagem e otimização de bancos MySQL, entregando interfaces responsivas de alta fidelidade visual.",
    local: "Brasil",
    modelo: "presencial",
    tipo: "clt",
    setor: "Games | Entretenimento | Backoffice",
    tecnologias: ["PHP", "Laravel", "AngularJS", "Angular", "MySQL", "Git"],
    destaques: [
      {
        texto: "Construção de APIs robustas com PHP e Laravel.",
      },
      {
        texto: "Modernização de front-end de AngularJS para Angular.",
      },
      {
        texto:
          "Modelagem e otimização de bancos MySQL para uma plataforma de alto tráfego.",
      },
    ],
  },
];
