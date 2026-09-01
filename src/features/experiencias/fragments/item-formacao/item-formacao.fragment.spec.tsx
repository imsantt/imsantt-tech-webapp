import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen } from "@/tests/helpers";
import { cores } from "@/lib/tema/tokens";
import type { FormacaoAcademica } from "@/types/formacao";
import { ItemFormacao, type AcentoFormacao } from "./item-formacao.fragment";

const acento: AcentoFormacao = cores.category.amber;

const formacaoBase: FormacaoAcademica = {
  id: "f-1",
  instituicao: "Estácio",
  curso: "Master of Technology (MTech)",
  area: "Análise e Desenvolvimento de Sistemas",
  grau: "mestrado",
  dataInicio: DateTime.fromObject({ year: 2019, month: 1 }),
  dataTermino: DateTime.fromObject({ year: 2021, month: 12 }),
};

describe("ItemFormacao", () => {
  it("deve renderizar curso, area e instituicao", () => {
    renderComProviders(
      <ItemFormacao formacao={formacaoBase} acento={acento} ultima={false} />,
    );
    expect(screen.getByText("Master of Technology (MTech)")).toBeInTheDocument();
    expect(
      screen.getByText("Análise e Desenvolvimento de Sistemas"),
    ).toBeInTheDocument();
    expect(screen.getByText("Estácio")).toBeInTheDocument();
  });

  it("deve renderizar o rotulo do grau", () => {
    renderComProviders(
      <ItemFormacao formacao={formacaoBase} acento={acento} ultima={false} />,
    );
    expect(screen.getByText("Mestrado")).toBeInTheDocument();
  });

  it("deve marcar Em andamento quando sem termino", () => {
    const f: FormacaoAcademica = { ...formacaoBase, dataTermino: undefined };
    renderComProviders(<ItemFormacao formacao={f} acento={acento} ultima />);
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });

  it("deve marcar Em andamento quando termino e futuro", () => {
    const f: FormacaoAcademica = {
      ...formacaoBase,
      dataTermino: DateTime.now().plus({ years: 1 }),
    };
    renderComProviders(<ItemFormacao formacao={f} acento={acento} ultima />);
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });

  it("nao deve marcar Em andamento quando termino ja passou", () => {
    renderComProviders(
      <ItemFormacao formacao={formacaoBase} acento={acento} ultima />,
    );
    expect(screen.queryByText("Em andamento")).not.toBeInTheDocument();
  });

  it("deve renderizar certificado sem link como texto", () => {
    const f: FormacaoAcademica = {
      ...formacaoBase,
      certificado: { titulo: "Certificado de Conclusão" },
    };
    renderComProviders(<ItemFormacao formacao={f} acento={acento} ultima />);
    expect(screen.getByText("Certificado de Conclusão")).toBeInTheDocument();
  });

  it("deve renderizar certificado com link quando url disponivel", () => {
    const f: FormacaoAcademica = {
      ...formacaoBase,
      certificado: { titulo: "Diploma", url: "https://exemplo.com/diploma" },
    };
    renderComProviders(<ItemFormacao formacao={f} acento={acento} ultima />);
    const link = screen.getByRole("link", { name: /Diploma/i });
    expect(link).toHaveAttribute("href", "https://exemplo.com/diploma");
  });
});
