import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { Habilidades } from "./Habilidades";

vi.mock("@/hooks/use-habilidades/useHabilidades.hook", () => ({
  useHabilidades: () => ({
    categorias: [
      {
        id: "arquitetura",
        titulo: "Arquitetura & Clean Code",
        descricao: "Microsserviços escaláveis",
        cor: "#a5b4fc",
        corFundo: "rgba(99, 102, 241, 0.15)",
        corBorda: "rgba(99, 102, 241, 0.35)",
        icone: () => null,
        iconeBg: "#1a1a2e",
        iconeColor: "#a5b4fc",
        habilidades: [
          { nome: "Microsserviços" },
          { nome: "Clean Architecture" },
          { nome: "DDD" },
        ],
      },
      {
        id: "dev",
        titulo: "Desenvolvimento",
        descricao: "Stack moderna",
        cor: "#4ade80",
        corFundo: "rgba(34, 197, 94, 0.15)",
        corBorda: "rgba(34, 197, 94, 0.35)",
        icone: () => null,
        iconeBg: "#1a1a2e",
        iconeColor: "#4ade80",
        habilidades: [{ nome: "TypeScript" }, { nome: "React" }],
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe("Habilidades (pagina)", () => {
  it("deve renderizar titulo Stack Completa", () => {
    renderComProviders(<Habilidades />);
    expect(screen.getByText("Stack Completa")).toBeInTheDocument();
  });

  it("deve renderizar total de habilidades no subtitulo", () => {
    renderComProviders(<Habilidades />);
    expect(
      screen.getByText(/5 tecnologias e competências/),
    ).toBeInTheDocument();
  });

  it("deve renderizar todas as categorias", () => {
    renderComProviders(<Habilidades />);
    expect(screen.getByText("Arquitetura & Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Desenvolvimento")).toBeInTheDocument();
  });

  it("deve renderizar todas as tags de cada categoria (sem limite)", () => {
    renderComProviders(<Habilidades />);
    expect(screen.getByText("Microsserviços")).toBeInTheDocument();
    expect(screen.getByText("Clean Architecture")).toBeInTheDocument();
    expect(screen.getByText("DDD")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("deve exibir badge com contagem de habilidades por categoria", () => {
    renderComProviders(<Habilidades />);
    expect(screen.getByText("3")).toBeInTheDocument(); // arquitetura
    expect(screen.getByText("2")).toBeInTheDocument(); // dev
  });

  it('deve ter main com id "conteudo-principal"', () => {
    renderComProviders(<Habilidades />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "conteudo-principal");
  });
});
