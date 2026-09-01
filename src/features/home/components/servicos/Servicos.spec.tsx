import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { Servicos } from "./Servicos";

const mockRolarParaAncora = vi.fn();

vi.mock("@/hooks/use-scroll-suave/useScrollSuave.hook", () => ({
  useScrollSuave: () => ({ rolarParaAncora: mockRolarParaAncora }),
}));

describe("Servicos", () => {
  it("deve renderizar o titulo e o eyebrow", () => {
    renderComProviders(<Servicos />);
    expect(screen.getByText("Consultoria & Mentoria")).toBeInTheDocument();
    expect(screen.getByText("04 — Serviços")).toBeInTheDocument();
  });

  it("deve renderizar os cards de servico", () => {
    renderComProviders(<Servicos />);
    expect(
      screen.getByText("Engenharia & Arquitetura de Software"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sistemas e Sites Escaláveis")).toBeInTheDocument();
    expect(
      screen.getByText("Mentoria & Liderança Técnica"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Consultoria para Times de Produto"),
    ).toBeInTheDocument();
  });

  it("deve ter section com id servicos", () => {
    renderComProviders(<Servicos />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Consultoria & Mentoria",
    });
    expect(heading).toHaveAttribute("id", "servicos-titulo");
  });

  it("deve chamar rolarParaAncora('contato') ao clicar no CTA", () => {
    renderComProviders(<Servicos />);
    fireEvent.click(screen.getByRole("button", { name: /Iniciar conversa/i }));
    expect(mockRolarParaAncora).toHaveBeenCalledWith("contato");
  });
});
