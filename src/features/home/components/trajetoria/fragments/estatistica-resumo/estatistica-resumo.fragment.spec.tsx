import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { EstatisticaResumo } from "./estatistica-resumo.fragment";

describe("EstatisticaResumo", () => {
  it("deve renderizar valor e rotulo", () => {
    renderComProviders(<EstatisticaResumo valor="+7" rotulo="anos de carreira" />);
    expect(screen.getByText("+7")).toBeInTheDocument();
    expect(screen.getByText("anos de carreira")).toBeInTheDocument();
  });

  it("deve renderizar variante compacta", () => {
    renderComProviders(
      <EstatisticaResumo valor="Especialização" rotulo="formação" compacto />,
    );
    expect(screen.getByText("Especialização")).toBeInTheDocument();
    expect(screen.getByText("formação")).toBeInTheDocument();
  });
});
