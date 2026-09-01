import { DateTime } from "luxon";
import type { Certificacao } from "@/types/certificacao";

/** Atalho para construir a data de emissão (mês/ano). */
function emissao(year: number, month: number): DateTime {
  return DateTime.fromObject({ year, month });
}

export const STUB_CERTIFICACOES: Certificacao[] = [
  // ─── Cloud / AWS ────────────────────────────────────────────────────────
  {
    id: "aws-academy-cloud-foundations",
    titulo: "AWS Academy Graduate · Cloud Foundations",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 5),
    competencias: ["Amazon CloudWatch", "Elastic Load Balancing (ELB)"],
  },
  {
    id: "aws-educate-storage",
    titulo: "AWS Educate · Getting Started with Storage",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 5),
    competencias: ["Amazon Web Services", "Amazon S3"],
  },
  {
    id: "aws-cloud-quest-practitioner",
    titulo: "AWS Cloud Quest · Cloud Practitioner",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 6),
    competencias: ["AWS Lambda", "Amazon Web Services"],
  },
  {
    id: "aws-educate-databases",
    titulo: "AWS Educate · Getting Started with Databases",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 6),
    competencias: ["Amazon RDS", "Amazon DynamoDB"],
  },
  {
    id: "aws-educate-cloud-ops",
    titulo: "AWS Educate · Getting Started with Cloud Ops",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 6),
  },
  {
    id: "aws-educate-compute",
    titulo: "AWS Educate · Getting Started with Compute",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 5),
    competencias: ["Amazon EC2"],
  },
  {
    id: "aws-educate-networking",
    titulo: "AWS Educate · Getting Started with Networking",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 6),
    competencias: ["Amazon VPC"],
  },
  {
    id: "aws-educate-security",
    titulo: "AWS Educate · Getting Started with Security",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 6),
    competencias: ["AWS IAM"],
  },
  {
    id: "aws-educate-intro-cloud-101",
    titulo: "AWS Educate · Introduction to Cloud 101",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitidaEm: emissao(2026, 5),
  },
  {
    id: "tidwit-fundamentos-nuvem",
    titulo: "Fundamentos de Nuvem",
    instituicao: "TIDWIT",
    categoria: "cloud",
    emitidaEm: emissao(2026, 4),
    competencias: ["Amazon Web Services", "Amazon S3"],
  },

  // ─── Liderança & Gestão ─────────────────────────────────────────────────
  {
    id: "udemy-lideranca-gestao-pessoas",
    titulo: "Liderança e Gestão de Pessoas · Formação Completa + 5 Extras",
    instituicao: "Udemy",
    categoria: "lideranca",
    emitidaEm: emissao(2026, 7),
    competencias: ["Escuta ativa", "Scrum"],
  },
  {
    id: "ud-primeira-lideranca",
    titulo: "Primeira Liderança · Inspire e Gere Resultados Ousados",
    instituicao: "Universidade Divergente",
    categoria: "lideranca",
    emitidaEm: emissao(2026, 7),
    competencias: ["Desenvolvimento de liderança", "Feedback construtivo"],
  },
  {
    id: "ciadetalentos-escola-lideranca",
    titulo: "Escola de Liderança",
    instituicao: "Cia de Talentos",
    categoria: "lideranca",
    emitidaEm: emissao(2026, 6),
    competencias: ["Gestão de pessoas", "Scrum"],
  },
  {
    id: "estacio-certificacao-lideranca",
    titulo: "Certificação em Liderança",
    instituicao: "Estácio",
    categoria: "lideranca",
    emitidaEm: emissao(2026, 8),
    competencias: ["Liderança", "Liderança estratégica"],
  },
  {
    id: "fiap-leadership-communication",
    titulo: "Leadership Communication",
    instituicao: "FIAP",
    categoria: "lideranca",
    emitidaEm: emissao(2026, 8),
    competencias: ["Liderança", "Liderança estratégica"],
  },
  {
    id: "fiap-jovens-lideres",
    titulo: "Jovens Líderes",
    instituicao: "FIAP",
    categoria: "lideranca",
    emitidaEm: emissao(2026, 8),
    competencias: ["Liderança", "Liderança estratégica"],
  },

  // ─── Inteligência Artificial ────────────────────────────────────────────
  {
    id: "ud-ia-resolver-automatizar",
    titulo: "IA para Resolver, Automatizar e Avançar",
    instituicao: "Universidade Divergente",
    categoria: "ia",
    emitidaEm: emissao(2026, 8),
    competencias: ["Inteligência artificial", "Modelos de raciocínio de IA"],
  },
  {
    id: "ud-ia-dia-a-dia",
    titulo: "Inteligência Artificial no Seu Dia a Dia",
    instituicao: "Universidade Divergente",
    categoria: "ia",
    emitidaEm: emissao(2026, 8),
    competencias: ["Inteligência artificial", "Ferramentas de IA generativa"],
  },
  {
    id: "ibmec-ia-carreira-exponencial",
    titulo: "Inteligência Artificial · Carreira Exponencial",
    instituicao: "Ibmec",
    categoria: "ia",
    emitidaEm: emissao(2026, 8),
    competencias: ["Inteligência artificial", "Ferramentas de IA generativa"],
  },
  {
    id: "fiap-prompt-engineering",
    titulo: "Prompt Engineering",
    instituicao: "FIAP",
    categoria: "ia",
    emitidaEm: emissao(2026, 4),
    competencias: ["Inteligência artificial", "Ferramentas de IA generativa"],
  },

  // ─── Produto & Negócio / Outros ─────────────────────────────────────────
  {
    id: "ud-arte-da-negociacao",
    titulo: "Arte da Negociação · Transforme Cada Conversa em Oportunidade",
    instituicao: "Universidade Divergente",
    categoria: "produto",
    emitidaEm: emissao(2026, 8),
    competencias: ["Vendas", "Comunicação"],
  },
  {
    id: "afreektech-transformacao-digital",
    titulo: "Transformação Digital",
    instituicao: "Cursos Afreektech MBM",
    categoria: "produto",
    emitidaEm: emissao(2026, 4),
    competencias: ["Inteligência artificial", "Computação em nuvem"],
  },
];
