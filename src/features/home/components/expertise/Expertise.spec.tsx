import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "../../../../tests/helpers";
import { Expertise } from "./Expertise";

describe("Expertise", () => {
  it("deve renderizar o título da seção", () => {
    renderComProviders(<Expertise />);
    expect(screen.getByText("O que eu faço")).toBeInTheDocument();
  });

  it("deve renderizar os 3 cards de expertise", () => {
    renderComProviders(<Expertise />);
    expect(screen.getByText("Arquitetura & Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Estratégia de IA & Cloud")).toBeInTheDocument();
    expect(screen.getByText("Liderança Inclusiva")).toBeInTheDocument();
  });

  it("deve renderizar descrições dos cards", () => {
    renderComProviders(<Expertise />);
    expect(screen.getByText(/Microsserviços escaláveis/)).toBeInTheDocument();
    expect(
      screen.getByText(/Ecossistemas nativos em nuvem/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Co-idealizador das iniciativas/),
    ).toBeInTheDocument();
  });

  it("deve renderizar tags de tecnologia", () => {
    renderComProviders(<Expertise />);
    expect(screen.getByText("NestJS")).toBeInTheDocument();
    expect(screen.getByText("Terraform")).toBeInTheDocument();
    expect(screen.getByText("Potenc[IA]")).toBeInTheDocument();
  });

  it("deve ter heading h2 com id para aria-labelledby", () => {
    renderComProviders(<Expertise />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "O que eu faço",
    });
    expect(heading).toHaveAttribute("id", "expertise-titulo");
  });

  it("deve ter artigos com aria-label correto", () => {
    renderComProviders(<Expertise />);
    expect(
      screen.getByLabelText("Arquitetura & Clean Code"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Estratégia de IA & Cloud"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Liderança Inclusiva")).toBeInTheDocument();
  });
});
