import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { HeroError } from "./hero-error.fragment";

describe("HeroError", () => {
  it("deve renderizar mensagem de erro", () => {
    renderComProviders(<HeroError />);
    expect(screen.getByText("Não foi possível carregar")).toBeInTheDocument();
  });

  it("deve renderizar texto de instrucao", () => {
    renderComProviders(<HeroError />);
    expect(screen.getByText(/tente recarregar a página/i)).toBeInTheDocument();
  });
});
