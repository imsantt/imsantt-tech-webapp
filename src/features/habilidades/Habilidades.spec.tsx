import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderComProviders, screen } from "@/tests/helpers";
import { Habilidades } from "./Habilidades";

vi.mock("@/hooks/use-habilidades/useHabilidades.hook", () => ({
  useHabilidades: () => ({
    categorias: [
      {
        id: "arquitetura",
        titulo: "Arquitetura & Clean Code",
        descricao: "Microsserviços escaláveis e arquiteturas limpas.",
        cor: "#a5b4fc",
        corFundo: "rgba(99, 102, 241, 0.15)",
        corBorda: "rgba(99, 102, 241, 0.35)",
        icone: () => null,
        iconeBg: "#1a1a2e",
        iconeColor: "#a5b4fc",
        habilidades: [
          {
            nome: "Microsserviços",
            nivel: "especialista",
            descricao: "Decomposição de domínios em serviços independentes.",
          },
          { nome: "Clean Architecture", nivel: "especialista" },
          { nome: "DDD" },
        ],
      },
      {
        id: "dev",
        titulo: "Desenvolvimento",
        descricao: "Stack moderna com TypeScript e React.",
        cor: "#4ade80",
        corFundo: "rgba(34, 197, 94, 0.15)",
        corBorda: "rgba(34, 197, 94, 0.35)",
        icone: () => null,
        iconeBg: "#1a1a2e",
        iconeColor: "#4ade80",
        habilidades: [
          { nome: "TypeScript", nivel: "especialista" },
          { nome: "React", nivel: "especialista" },
        ],
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

  it("deve renderizar cada categoria como uma seção com heading", () => {
    renderComProviders(<Habilidades />);
    expect(
      screen.getByRole("heading", {
        name: "Arquitetura & Clean Code",
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Desenvolvimento", level: 2 }),
    ).toBeInTheDocument();
  });

  it("deve renderizar a descricao de cada categoria", () => {
    renderComProviders(<Habilidades />);
    expect(
      screen.getByText("Microsserviços escaláveis e arquiteturas limpas."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Stack moderna com TypeScript e React."),
    ).toBeInTheDocument();
  });

  it("deve renderizar todas as competencias de cada categoria", () => {
    renderComProviders(<Habilidades />);
    expect(screen.getByText("Microsserviços")).toBeInTheDocument();
    expect(screen.getByText("Clean Architecture")).toBeInTheDocument();
    expect(screen.getByText("DDD")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("deve exibir a descricao da competencia diretamente (sem clique)", () => {
    renderComProviders(<Habilidades />);
    expect(
      screen.getByText("Decomposição de domínios em serviços independentes."),
    ).toBeInTheDocument();
  });

  it("deve exibir o indice de navegacao com links para as categorias", () => {
    renderComProviders(<Habilidades />);
    const nav = screen.getByRole("navigation", {
      name: "Índice de categorias",
    });
    expect(nav).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Arquitetura & Clean Code/ });
    expect(link).toHaveAttribute("href", "#cat-arquitetura");
  });

  it("deve filtrar categorias em tempo real conforme a busca", async () => {
    const user = userEvent.setup();
    renderComProviders(<Habilidades />);

    const busca = screen.getByLabelText("Buscar competência ou tecnologia");
    await user.type(busca, "TypeScript");

    expect(
      screen.getByRole("heading", { name: "Desenvolvimento", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "Arquitetura & Clean Code",
        level: 2,
      }),
    ).not.toBeInTheDocument();
  });

  it("deve exibir mensagem quando a busca nao encontra resultados", async () => {
    const user = userEvent.setup();
    renderComProviders(<Habilidades />);

    const busca = screen.getByLabelText("Buscar competência ou tecnologia");
    await user.type(busca, "xyz-inexistente");

    expect(
      screen.getByText(/Nenhuma competência encontrada/),
    ).toBeInTheDocument();
  });

  it('deve ter main com id "conteudo-principal"', () => {
    renderComProviders(<Habilidades />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "conteudo-principal");
  });
});
