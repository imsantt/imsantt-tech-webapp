import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { cores } from "@/lib/tema/tokens";
import { ChipFiltro } from "./chip-filtro.fragment";

describe("ChipFiltro", () => {
  it("deve renderizar rotulo e quantidade", () => {
    renderComProviders(
      <ChipFiltro
        ativo={false}
        rotulo="Cloud & AWS"
        quantidade={10}
        cor={cores.category.cyan.base}
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("Cloud & AWS")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("deve chamar onClick ao clicar", () => {
    const onClick = vi.fn();
    renderComProviders(
      <ChipFiltro
        ativo={false}
        rotulo="Todas"
        quantidade={17}
        cor={cores.accent.DEFAULT}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByText("Todas"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("deve renderizar como button", () => {
    renderComProviders(
      <ChipFiltro
        ativo
        rotulo="IA"
        quantidade={4}
        cor={cores.category.violet.base}
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /IA/i })).toBeInTheDocument();
  });
});
