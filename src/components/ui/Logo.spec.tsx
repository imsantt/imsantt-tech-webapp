import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "../../tests/helpers";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("deve renderizar IMSANTT e TECH", () => {
    renderComProviders(<Logo />);

    expect(screen.getByText("IMSANTT")).toBeInTheDocument();
    expect(screen.getByText("TECH")).toBeInTheDocument();
  });

  it("deve renderizar imagem da logo como decorativa (aria-hidden)", () => {
    renderComProviders(<Logo />);

    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveAttribute("aria-hidden", "true");
  });

  it("deve aceitar props de tamanho customizado", () => {
    renderComProviders(<Logo tamanhoFonte="xl" tamanhoIcone="36px" />);

    expect(screen.getByText("IMSANTT")).toBeInTheDocument();
  });
});
