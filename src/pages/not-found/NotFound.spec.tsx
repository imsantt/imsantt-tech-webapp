import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "../../tests/helpers";
import { NotFound } from "./NotFound";

describe("NotFound (404)", () => {
  it("deve renderizar o código 404", () => {
    renderComProviders(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("deve renderizar título de página não encontrada", () => {
    renderComProviders(<NotFound />);
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("deve renderizar descrição do erro", () => {
    renderComProviders(<NotFound />);
    expect(screen.getByText(/essa rota não existe/)).toBeInTheDocument();
  });

  it("deve ter link para voltar ao início", () => {
    renderComProviders(<NotFound />);
    const link = screen.getByText("Voltar para o início");
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});
