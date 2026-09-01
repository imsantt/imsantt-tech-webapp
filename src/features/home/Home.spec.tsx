import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { Home } from "./Home";

// Mock dos componentes lazy para resolver síncronamente no teste
vi.mock("./components", () => ({
  Hero: () => <section>Robert Santos</section>,
  HabilidadesSecao: () => <section>O que eu faço</section>,
  Trajetoria: () => <section>Trajetória & Formação</section>,
  Servicos: () => <section>Consultoria & Mentoria</section>,
  Contato: () => <section>Vamos conversar</section>,
}));

describe("Home", () => {
  it("deve ter main com id conteudo-principal", () => {
    renderComProviders(<Home />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "conteudo-principal");
  });

  it("deve renderizar Hero", () => {
    renderComProviders(<Home />);
    expect(screen.getByText("Robert Santos")).toBeInTheDocument();
  });

  it("deve renderizar secao Habilidades", () => {
    renderComProviders(<Home />);
    expect(screen.getByText("O que eu faço")).toBeInTheDocument();
  });

  it("deve renderizar secao Trajetoria", () => {
    renderComProviders(<Home />);
    expect(screen.getByText("Trajetória & Formação")).toBeInTheDocument();
  });

  it("deve renderizar secao Servicos", () => {
    renderComProviders(<Home />);
    expect(screen.getByText("Consultoria & Mentoria")).toBeInTheDocument();
  });

  it("deve renderizar secao Contato", () => {
    renderComProviders(<Home />);
    expect(screen.getByText("Vamos conversar")).toBeInTheDocument();
  });
});
