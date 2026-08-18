import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { HabilidadesPageError } from "./habilidades-page-error.fragment";

describe("HabilidadesPageError", () => {
  it("deve renderizar mensagem de erro", () => {
    renderComProviders(<HabilidadesPageError />);
    expect(
      screen.getByText("Erro ao carregar habilidades"),
    ).toBeInTheDocument();
  });

  it("deve renderizar texto de instrucao", () => {
    renderComProviders(<HabilidadesPageError />);
    expect(screen.getByText(/tente recarregar/i)).toBeInTheDocument();
  });
});
