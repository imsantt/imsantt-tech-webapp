import { describe, it, expect } from "vitest";
import { renderComProviders, screen, waitFor } from "@/tests/helpers";
import { Home } from "./Home";

describe("Home", () => {
  it("deve ter main com id conteudo-principal", () => {
    renderComProviders(<Home />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "conteudo-principal");
  });

  it("deve renderizar Hero apos carregamento lazy", async () => {
    renderComProviders(<Home />);

    await waitFor(
      () => {
        expect(screen.getByText("Robert")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("deve renderizar secao Habilidades apos carregamento", async () => {
    renderComProviders(<Home />);

    await waitFor(
      () => {
        expect(screen.getByText("O que eu faço")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("deve renderizar secao Contato apos carregamento", async () => {
    renderComProviders(<Home />);

    await waitFor(
      () => {
        expect(screen.getByText("Vamos conversar")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
