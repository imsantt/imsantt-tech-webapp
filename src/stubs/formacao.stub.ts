import { DateTime } from "luxon";
import type { FormacaoAcademica } from "@/types/formacao";

export const STUB_FORMACAO: FormacaoAcademica[] = [
  {
    id: "estacio-especializacao",
    instituicao: "Estácio",
    curso: "Pós-graduação Lato Sensu",
    area: "Engenharia de Software",
    grau: "especializacao",
    dataInicio: DateTime.fromObject({ year: 2025, month: 7 }),
    dataTermino: DateTime.fromObject({ year: 2026, month: 7 }),
  },
  {
    id: "estacio-mtech",
    instituicao: "Estácio",
    curso: "Graduação Técnologica",
    area: "Análise e Desenvolvimento de Sistemas",
    grau: "graduacao",
    dataInicio: DateTime.fromObject({ year: 2019, month: 1 }),
    dataTermino: DateTime.fromObject({ year: 2021, month: 12 }),
  },
  {
    id: "etifontes-tecnico",
    instituicao: "Escola Estadual Técnico Industrial Professor Fontes",
    curso: "Técnico",
    area: "Informatica para Internet",
    grau: "tecnico",
    dataInicio: DateTime.fromObject({ year: 2017, month: 1 }),
    dataTermino: DateTime.fromObject({ year: 2018, month: 12 }),
  },
];
