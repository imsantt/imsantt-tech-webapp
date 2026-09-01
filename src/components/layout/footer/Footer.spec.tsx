import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("deve renderizar o nome Robert Santos", () => {
    renderComProviders(<Footer />);
    expect(screen.getByText("Robert Santos")).toBeInTheDocument();
  });

  it("deve renderizar o ano atual", () => {
    renderComProviders(<Footer />);
    const anoAtual = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(anoAtual))).toBeInTheDocument();
  });

  it("deve ter role contentinfo", () => {
    renderComProviders(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("deve renderizar o cargo", () => {
    renderComProviders(<Footer />);
    expect(
      screen.getByText(/Especialista em Arquitetura e Engenharia de Software/),
    ).toBeInTheDocument();
  });

  it("deve renderizar links de redes sociais", () => {
    renderComProviders(<Footer />);
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  it("deve renderizar status de disponibilidade", () => {
    renderComProviders(<Footer />);
    expect(screen.getByText("Disponível para projetos")).toBeInTheDocument();
  });
});
