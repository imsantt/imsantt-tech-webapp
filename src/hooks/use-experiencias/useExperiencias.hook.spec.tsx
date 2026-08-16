import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useExperiencias } from "./useExperiencias.hook";

// Wrapper que limpa cache do SWR entre testes
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

// Mock do service
vi.mock("../../services/experiencia/experiencia.service", () => ({
  listarExperiencias: vi.fn().mockResolvedValue([
    {
      id: "mock-1",
      empresa: "Empresa Mock",
      cargo: "Dev Sr.",
      dataInicio: { year: 2023, month: 1 },
      descricao: "Desc mock",
      tecnologias: ["React"],
    },
  ]),
}));

describe("useExperiencias", () => {
  it("deve iniciar com isLoading true", () => {
    const { result } = renderHook(() => useExperiencias(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.experiencias).toEqual([]);
  });

  it("deve retornar experiencias apos carregamento", async () => {
    const { result } = renderHook(() => useExperiencias(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.experiencias).toHaveLength(1);
    expect(result.current.experiencias[0].empresa).toBe("Empresa Mock");
  });

  it("deve retornar isError false quando sucesso", async () => {
    const { result } = renderHook(() => useExperiencias(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
  });
});
