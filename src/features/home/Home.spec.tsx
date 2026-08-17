import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { Home } from "./Home";

describe("Home", () => {
  it("deve renderizar as tres secoes (Hero, Habilidades, Contato)", () => {
    renderComProviders(<Home />);
    expect(screen.getByText("Robert")).toBeInTheDocument();
    expect(screen.getByText("O que eu faço")).toBeInTheDocument();
    expect(screen.getByText("Vamos conversar")).toBeInTheDocument();
  });

  it("deve ter main com id conteudo-principal", () => {
    renderComProviders(<Home />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "conteudo-principal");
  });
});
