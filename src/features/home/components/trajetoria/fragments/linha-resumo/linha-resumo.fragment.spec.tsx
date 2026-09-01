import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen } from "@/tests/helpers";
import { cores } from "@/lib/tema/tokens";
import type { Experiencia } from "@/types/experiencia";
import { LinhaResumo, type AcentoResumo } from "./linha-resumo.fragment";

const acento: AcentoResumo = cores.category.violet;

const expBase: Experiencia = {
  id: "exp-1",
  empresa: "YDUQS",
  cargo: "Engenheiro de Software",
  dataInicio: DateTime.fromObject({ year: 2023, month: 11 }),
  descricao: "Desc.",
  tecnologias: [],
};

describe("LinhaResumo", () => {
  it("deve renderizar empresa e cargo", () => {
    renderComProviders(
      <LinhaResumo exp={expBase} acento={acento} ultima={false} />,
    );
    expect(screen.getByText("YDUQS")).toBeInTheDocument();
    expect(screen.getByText("Engenheiro de Software")).toBeInTheDocument();
  });

  it("deve marcar badge Atual quando sem dataTermino", () => {
    renderComProviders(<LinhaResumo exp={expBase} acento={acento} ultima />);
    expect(screen.getByText("Atual")).toBeInTheDocument();
  });

  it("nao deve marcar Atual quando ha dataTermino", () => {
    const exp: Experiencia = {
      ...expBase,
      dataTermino: DateTime.fromObject({ year: 2024, month: 6 }),
    };
    renderComProviders(<LinhaResumo exp={exp} acento={acento} ultima />);
    expect(screen.queryByText("Atual")).not.toBeInTheDocument();
  });

  it("deve exibir 'Presente' no periodo quando experiencia atual", () => {
    renderComProviders(<LinhaResumo exp={expBase} acento={acento} ultima />);
    expect(screen.getByText(/Presente/)).toBeInTheDocument();
  });
});
