import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useHabilidades } from "./useHabilidades.hook";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

vi.mock("../../services/habilidade/habilidade.service", () => ({
  listarHabilidades: vi.fn().mockResolvedValue([
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
  ]),
}));

describe("useHabilidades", () => {
  it("deve iniciar com isLoading true e categorias vazio", () => {
    const { result } = renderHook(() => useHabilidades(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.categorias).toEqual([]);
  });

  it("deve retornar categorias apos carregamento", async () => {
    const { result } = renderHook(() => useHabilidades(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.categorias).toHaveLength(1);
    expect(result.current.categorias[0].titulo).toBe("Desenvolvimento");
    expect(result.current.categorias[0].habilidades).toHaveLength(2);
  });

  it("deve retornar isError false quando sucesso", async () => {
    const { result } = renderHook(() => useHabilidades(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
  });
});
