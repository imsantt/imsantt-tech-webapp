import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { NavbarSimples } from "./NavbarSimples";

describe("NavbarSimples", () => {
  it("deve renderizar o logo", () => {
    renderComProviders(<NavbarSimples />);
    expect(
      screen.getByLabelText(/IMSANTT\.TECH - Ir para o início/),
    ).toBeInTheDocument();
  });

  it("deve renderizar botao de voltar", () => {
    renderComProviders(<NavbarSimples />);
    const link = screen.getByRole("link", {
      name: /voltar para a página inicial/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("deve ter texto Voltar no botao", () => {
    renderComProviders(<NavbarSimples />);
    expect(screen.getByText("Voltar")).toBeInTheDocument();
  });

  it('deve ter role "banner"', () => {
    renderComProviders(<NavbarSimples />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
