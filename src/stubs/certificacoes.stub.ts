import type { CertificacaoBruta } from "@/schemas/certificacao/certificacao.schema";

/**
 * Dados simulados de certificações no formato BRUTO da fonte
 * (snake_case, `emitida_em` como string ISO YYYY-MM), espelhando o
 * que o Supabase retornará. Passam pelo schema + mapper no service.
 */
export const STUB_CERTIFICACOES: CertificacaoBruta[] = [
  // ─── Cloud / AWS ────────────────────────────────────────────────────────
  {
    id: "aws-academy-cloud-foundations",
    titulo: "AWS Academy Graduate · Cloud Foundations",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-05",
    competencias: ["Amazon CloudWatch", "Elastic Load Balancing (ELB)"],
  },
  {
    id: "aws-educate-storage",
    titulo: "AWS Educate · Getting Started with Storage",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-05",
    competencias: ["Amazon Web Services", "Amazon S3"],
  },
  {
    id: "aws-cloud-quest-practitioner",
    titulo: "AWS Cloud Quest · Cloud Practitioner",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-06",
    competencias: ["AWS Lambda", "Amazon Web Services"],
  },
  {
    id: "aws-educate-databases",
    titulo: "AWS Educate · Getting Started with Databases",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-06",
    competencias: ["Amazon RDS", "Amazon DynamoDB"],
  },
  {
    id: "aws-educate-cloud-ops",
    titulo: "AWS Educate · Getting Started with Cloud Ops",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-06",
  },
  {
    id: "aws-educate-compute",
    titulo: "AWS Educate · Getting Started with Compute",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-05",
    competencias: ["Amazon EC2"],
  },
  {
    id: "aws-educate-networking",
    titulo: "AWS Educate · Getting Started with Networking",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-06",
    competencias: ["Amazon VPC"],
  },
  {
    id: "aws-educate-security",
    titulo: "AWS Educate · Getting Started with Security",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-06",
    competencias: ["AWS IAM"],
  },
  {
    id: "aws-educate-intro-cloud-101",
    titulo: "AWS Educate · Introduction to Cloud 101",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud",
    emitida_em: "2026-05",
  },
  {
    id: "tidwit-fundamentos-nuvem",
    titulo: "Fundamentos de Nuvem",
    instituicao: "TIDWIT",
    categoria: "cloud",
    emitida_em: "2026-04",
    competencias: ["Amazon Web Services", "Amazon S3"],
  },

  // ─── Liderança & Gestão ─────────────────────────────────────────────────
  {
    id: "udemy-lideranca-gestao-pessoas",
    titulo: "Liderança e Gestão de Pessoas · Formação Completa + 5 Extras",
    instituicao: "Udemy",
    categoria: "lideranca",
    emitida_em: "2026-07",
    competencias: ["Escuta ativa", "Scrum"],
  },
  {
    id: "ud-primeira-lideranca",
    titulo: "Primeira Liderança · Inspire e Gere Resultados Ousados",
    instituicao: "Universidade Divergente",
    categoria: "lideranca",
    emitida_em: "2026-07",
    competencias: ["Desenvolvimento de liderança", "Feedback construtivo"],
  },
  {
    id: "ciadetalentos-escola-lideranca",
    titulo: "Escola de Liderança",
    instituicao: "Cia de Talentos",
    categoria: "lideranca",
    emitida_em: "2026-06",
    competencias: ["Gestão de pessoas", "Scrum"],
  },
  {
    id: "estacio-certificacao-lideranca",
    titulo: "Certificação em Liderança",
    instituicao: "Estácio",
    categoria: "lideranca",
    emitida_em: "2026-08",
    competencias: ["Liderança", "Liderança estratégica"],
  },
  {
    id: "fiap-leadership-communication",
    titulo: "Leadership Communication",
    instituicao: "FIAP",
    categoria: "lideranca",
    emitida_em: "2026-08",
    competencias: ["Liderança", "Liderança estratégica"],
  },
  {
    id: "fiap-jovens-lideres",
    titulo: "Jovens Líderes",
    instituicao: "FIAP",
    categoria: "lideranca",
    emitida_em: "2026-08",
    competencias: ["Liderança", "Liderança estratégica"],
  },

  // ─── Inteligência Artificial ────────────────────────────────────────────
  {
    id: "ud-ia-resolver-automatizar",
    titulo: "IA para Resolver, Automatizar e Avançar",
    instituicao: "Universidade Divergente",
    categoria: "ia",
    emitida_em: "2026-08",
    competencias: ["Inteligência artificial", "Modelos de raciocínio de IA"],
  },
  {
    id: "ud-ia-dia-a-dia",
    titulo: "Inteligência Artificial no Seu Dia a Dia",
    instituicao: "Universidade Divergente",
    categoria: "ia",
    emitida_em: "2026-08",
    competencias: ["Inteligência artificial", "Ferramentas de IA generativa"],
  },
  {
    id: "ibmec-ia-carreira-exponencial",
    titulo: "Inteligência Artificial · Carreira Exponencial",
    instituicao: "Ibmec",
    categoria: "ia",
    emitida_em: "2026-08",
    competencias: ["Inteligência artificial", "Ferramentas de IA generativa"],
  },
  {
    id: "fiap-prompt-engineering",
    titulo: "Prompt Engineering",
    instituicao: "FIAP",
    categoria: "ia",
    emitida_em: "2026-04",
    competencias: ["Inteligência artificial", "Ferramentas de IA generativa"],
  },

  // ─── Produto & Negócio / Outros ─────────────────────────────────────────
  {
    id: "ud-arte-da-negociacao",
    titulo: "Arte da Negociação · Transforme Cada Conversa em Oportunidade",
    instituicao: "Universidade Divergente",
    categoria: "produto",
    emitida_em: "2026-08",
    competencias: ["Vendas", "Comunicação"],
  },
  {
    id: "afreektech-transformacao-digital",
    titulo: "Transformação Digital",
    instituicao: "Cursos Afreektech MBM",
    categoria: "produto",
    emitida_em: "2026-04",
    competencias: ["Inteligência artificial", "Computação em nuvem"],
  },
];
