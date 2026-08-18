import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { HabilidadesError } from "./habilidades-error.fragment";

describe("HabilidadesError", () => {
  it("deve renderizar mensagem de erro", () => {
    renderComProviders(<HabilidadesError />);
    expect(
      screen.getByText("Erro ao carregar habilidades"),
    ).toBeInTheDocument();
  });

  it("deve renderizar texto de instrucao", () => {
    renderComProviders(<HabilidadesError />);
    expect(screen.getByText(/tente recarregar a página/i)).toBeInTheDocument();
  });
});
