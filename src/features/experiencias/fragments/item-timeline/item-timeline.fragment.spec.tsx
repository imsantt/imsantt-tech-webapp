import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen } from "@/tests/helpers";
import { cores } from "@/lib/tema/tokens";
import type { Experiencia } from "@/types/experiencia";
import { ItemTimeline, type AcentoTimeline } from "./item-timeline.fragment";

const acento: AcentoTimeline = cores.category.violet;

const expBase: Experiencia = {
  id: "exp-1",
  empresa: "YDUQS",
  cargo: "Engenheiro de Software",
  dataInicio: DateTime.fromObject({ year: 2023, month: 11 }),
  descricao: "Descrição curta.",
  tecnologias: ["NestJS", "React"],
};

describe("ItemTimeline", () => {
  it("deve renderizar cargo, empresa e tecnologias", () => {
    renderComProviders(<ItemTimeline exp={expBase} indice={0} acento={acento} />);
    expect(screen.getByText("Engenheiro de Software")).toBeInTheDocument();
    expect(screen.getByText("YDUQS")).toBeInTheDocument();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("deve renderizar badge Atual quando nao ha dataTermino", () => {
    renderComProviders(<ItemTimeline exp={expBase} indice={0} acento={acento} />);
    expect(screen.getByText("Atual")).toBeInTheDocument();
  });

  it("nao deve renderizar badge Atual quando ha dataTermino", () => {
    const exp: Experiencia = {
      ...expBase,
      dataTermino: DateTime.fromObject({ year: 2024, month: 6 }),
    };
    renderComProviders(<ItemTimeline exp={exp} indice={1} acento={acento} />);
    expect(screen.queryByText("Atual")).not.toBeInTheDocument();
  });

  it("deve preferir descricaoLonga quando disponivel", () => {
    const exp: Experiencia = {
      ...expBase,
      descricaoLonga: "Descrição estendida detalhada.",
    };
    renderComProviders(<ItemTimeline exp={exp} indice={0} acento={acento} />);
    expect(
      screen.getByText("Descrição estendida detalhada."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Descrição curta.")).not.toBeInTheDocument();
  });

  it("deve renderizar meta chips (setor, modelo, tipo)", () => {
    const exp: Experiencia = {
      ...expBase,
      setor: "Educação",
      modelo: "remoto",
      tipo: "clt",
    };
    renderComProviders(<ItemTimeline exp={exp} indice={0} acento={acento} />);
    expect(screen.getByText("Educação")).toBeInTheDocument();
    expect(screen.getByText("Remoto")).toBeInTheDocument();
    expect(screen.getByText("CLT")).toBeInTheDocument();
  });

  it("deve renderizar destaques quando fornecidos", () => {
    const exp: Experiencia = {
      ...expBase,
      destaques: [{ texto: "Liderou a migração para microsserviços." }],
    };
    renderComProviders(<ItemTimeline exp={exp} indice={0} acento={acento} />);
    expect(
      screen.getByText("Liderou a migração para microsserviços."),
    ).toBeInTheDocument();
  });

  it("deve renderizar link externo quando ha site", () => {
    const exp: Experiencia = { ...expBase, site: "https://exemplo.com" };
    renderComProviders(<ItemTimeline exp={exp} indice={0} acento={acento} />);
    const link = screen.getByRole("link", { name: /YDUQS/i });
    expect(link).toHaveAttribute("href", "https://exemplo.com");
  });

  it("deve expor aria-label com cargo e empresa", () => {
    renderComProviders(<ItemTimeline exp={expBase} indice={0} acento={acento} />);
    expect(
      screen.getByLabelText("Engenheiro de Software na YDUQS"),
    ).toBeInTheDocument();
  });
});
