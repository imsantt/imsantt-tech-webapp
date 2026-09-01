import type { FormacaoBruta } from "@/schemas/formacao/formacao.schema";

/**
 * Dados simulados de formação acadêmica no formato BRUTO da fonte
 * (snake_case, datas como string ISO YYYY-MM), espelhando o que o
 * Supabase retornará. Passam pelo schema + mapper no service.
 */
export const STUB_FORMACAO: FormacaoBruta[] = [
  {
    id: "estacio-especializacao",
    instituicao: "Estácio",
    curso: "Pós-graduação Lato Sensu",
    area: "Engenharia de Software",
    grau: "especializacao",
    data_inicio: "2025-07",
    data_termino: "2026-07",
  },
  {
    id: "estacio-mtech",
    instituicao: "Estácio",
    curso: "Graduação Técnologica",
    area: "Análise e Desenvolvimento de Sistemas",
    grau: "graduacao",
    data_inicio: "2019-01",
    data_termino: "2021-12",
  },
  {
    id: "etifontes-tecnico",
    instituicao: "Escola Estadual Técnico Industrial Professor Fontes",
    curso: "Técnico",
    area: "Informatica para Internet",
    grau: "tecnico",
    data_inicio: "2017-01",
    data_termino: "2018-12",
  },
];
