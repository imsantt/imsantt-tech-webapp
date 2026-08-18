import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { CardExperienciaError } from "./card-experiencia-error.fragment";

describe("CardExperienciaError", () => {
  it("deve renderizar mensagem de erro", () => {
    renderComProviders(<CardExperienciaError />);
    expect(screen.getByText("Erro ao carregar")).toBeInTheDocument();
  });

  it("deve renderizar texto explicativo", () => {
    renderComProviders(<CardExperienciaError />);
    expect(
      screen.getByText(/não foi possível exibir esta experiência/i),
    ).toBeInTheDocument();
  });

  it("deve manter a mesma altura do card real", () => {
    const { container } = renderComProviders(<CardExperienciaError />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ height: "23.75rem" });
  });
});
