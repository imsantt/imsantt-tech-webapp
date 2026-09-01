import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useFormacao } from "./useFormacao.hook";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

vi.mock("../../services/formacao/formacao.service", () => ({
  listarFormacao: vi.fn().mockResolvedValue([
    {
      id: "mock-1",
      instituicao: "Estácio",
      curso: "Especialização",
      grau: "especializacao",
      dataInicio: { year: 2025, month: 7 },
    },
  ]),
}));

describe("useFormacao", () => {
  it("deve iniciar com isLoading true e lista vazia", () => {
    const { result } = renderHook(() => useFormacao(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.formacoes).toEqual([]);
  });

  it("deve retornar formacoes apos carregamento", async () => {
    const { result } = renderHook(() => useFormacao(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.formacoes).toHaveLength(1);
    expect(result.current.formacoes[0].instituicao).toBe("Estácio");
    expect(result.current.isError).toBe(false);
  });
});
