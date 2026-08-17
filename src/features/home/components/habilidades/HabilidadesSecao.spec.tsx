import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, waitFor } from "@/tests/helpers";
import { HabilidadesSecao } from "./HabilidadesSecao";

vi.mock("@/hooks/use-habilidades/useHabilidades.hook", () => ({
  useHabilidades: () => ({
    categorias: [
      {
        id: "dev",
        titulo: "Desenvolvimento",
        descricao: "Stack moderna com TypeScript",
        cor: "#4ade80",
        corFundo: "rgba(34, 197, 94, 0.15)",
        corBorda: "rgba(34, 197, 94, 0.35)",
        icone: () => null,
        iconeBg: "#1a1a2e",
        iconeColor: "#4ade80",
        habilidades: [
          { nome: "TypeScript" },
          { nome: "React" },
          { nome: "Node.js" },
          { nome: "NestJS" },
          { nome: "Next.js" },
          { nome: "Angular" },
          { nome: "PHP" },
          { nome: "Python" },
        ],
      },
      {
        id: "cloud",
        titulo: "Cloud & DevOps",
        descricao: "AWS Serverless e Terraform",
        cor: "#22d3ee",
        corFundo: "rgba(6, 182, 212, 0.15)",
        corBorda: "rgba(6, 182, 212, 0.35)",
        icone: () => null,
        iconeBg: "#1a1a2e",
        iconeColor: "#22d3ee",
        habilidades: [{ nome: "AWS" }, { nome: "Docker" }],
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe("HabilidadesSecao", () => {
  it("deve renderizar o titulo da secao", () => {
    renderComProviders(<HabilidadesSecao />);
    expect(screen.getByText("O que eu faço")).toBeInTheDocument();
  });

  it("deve renderizar cards de categorias", () => {
    renderComProviders(<HabilidadesSecao />);
    expect(screen.getByText("Desenvolvimento")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
  });

  it("deve limitar tags a no maximo 6 por card", () => {
    renderComProviders(<HabilidadesSecao />);
    // Desenvolvimento tem 8 habilidades mas deve mostrar somente 6
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    // As 2 ultimas (PHP, Python) não devem aparecer
    expect(screen.queryByText("PHP")).not.toBeInTheDocument();
    expect(screen.queryByText("Python")).not.toBeInTheDocument();
  });

  it("deve ter link para pagina de habilidades", () => {
    renderComProviders(<HabilidadesSecao />);
    const link = screen.getByRole("link", {
      name: /ver todas as habilidades/i,
    });
    expect(link).toHaveAttribute("href", "/habilidades");
  });

  it('deve ter section com id "habilidades"', () => {
    renderComProviders(<HabilidadesSecao />);
    const section = document.getElementById("habilidades");
    expect(section).toBeInTheDocument();
  });
});
