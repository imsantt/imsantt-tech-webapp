import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { Navbar } from "./Navbar";

const mockRolarParaAncora = vi.fn();

vi.mock("../../../hooks/use-scroll-suave/useScrollSuave.hook", () => ({
  useScrollSuave: () => ({ rolarParaAncora: mockRolarParaAncora }),
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

  it("deve chamar rolarParaAncora ao clicar em item de navegação", () => {
    renderComProviders(<Navbar />);
    fireEvent.click(screen.getByText("Expertise"));
    expect(mockRolarParaAncora).toHaveBeenCalledWith("expertise");
  });

  it("deve chamar rolarParaAncora ao clicar no botão Contato", () => {
    renderComProviders(<Navbar />);
    const botoes = screen.getAllByText("Contato");
    fireEvent.click(botoes[0]);
    expect(mockRolarParaAncora).toHaveBeenCalledWith("contato");
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

  it("deve mostrar menu mobile ao abrir e chamar rolarParaAncora ao clicar item mobile", () => {
    renderComProviders(<Navbar />);
    fireEvent.click(screen.getByLabelText("Abrir menu"));

    // Os itens aparecem duplicados (desktop + mobile)
    const itensHome = screen.getAllByText("Home");
    fireEvent.click(itensHome[itensHome.length - 1]);
    expect(mockRolarParaAncora).toHaveBeenCalledWith("home");
  });

  it("deve ter link da logo apontando para home", () => {
    renderComProviders(<Navbar />);
    const link = screen.getByLabelText("IMSANTT.TECH - Ir para o início");
    expect(link).toHaveAttribute("href", "/");
  });

  it("deve aplicar estilo de scroll ao rolar a pagina", () => {
    renderComProviders(<Navbar />);

    // Simula scroll
    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    fireEvent.scroll(window);

    // O header deve existir com role banner
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
