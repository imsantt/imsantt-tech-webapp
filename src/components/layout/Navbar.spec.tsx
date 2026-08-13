import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "../../tests/helpers";
import { Navbar } from "./Navbar";

// Mock do hook para não depender do router real
vi.mock("../../hooks/useScrollSuave", () => ({
  useScrollSuave: () => ({ rolarParaAncora: vi.fn() }),
}));

describe("Navbar", () => {
  it("deve renderizar a logo", () => {
    renderComProviders(<Navbar />);
    expect(screen.getByText("IMSANTT")).toBeInTheDocument();
    expect(screen.getByText("TECH")).toBeInTheDocument();
  });

  it("deve renderizar todos os itens de navegação no desktop", () => {
    renderComProviders(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Trajetória")).toBeInTheDocument();
    expect(screen.getByText("Expertise")).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toBeInTheDocument();
    expect(screen.getByText("Impacto Social")).toBeInTheDocument();
  });

  it("deve renderizar botão de contato", () => {
    renderComProviders(<Navbar />);
    const botoes = screen.getAllByText("Contato");
    expect(botoes.length).toBeGreaterThanOrEqual(1);
  });

  it("deve ter botão hamburguer com aria-label correto", () => {
    renderComProviders(<Navbar />);
    const hamburguer = screen.getByLabelText("Abrir menu");
    expect(hamburguer).toBeInTheDocument();
  });

  it("deve alternar aria-label do hamburguer ao clicar", () => {
    renderComProviders(<Navbar />);
    const hamburguer = screen.getByLabelText("Abrir menu");

    fireEvent.click(hamburguer);
    expect(screen.getByLabelText("Fechar menu")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Fechar menu"));
    expect(screen.getByLabelText("Abrir menu")).toBeInTheDocument();
  });

  it("deve ter link da logo apontando para home", () => {
    renderComProviders(<Navbar />);
    const link = screen.getByLabelText("IMSANTT.TECH - Ir para o início");
    expect(link).toHaveAttribute("href", "/");
  });
});
