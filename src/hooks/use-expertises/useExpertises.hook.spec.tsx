import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useExpertises } from "./useExpertises.hook";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

vi.mock("../../services/expertise/expertise.service", () => ({
  listarExpertises: vi.fn().mockResolvedValue([
    {
      id: "mock-1",
      titulo: "Expertise Mock",
      descricao: "Descricao mock",
      tecnologias: ["Tech"],
      icone: () => null,
      iconeBg: "#000",
      iconeColor: "#fff",
    },
  ]),
}));

describe("useExpertises", () => {
  it("deve iniciar com isLoading true", () => {
    const { result } = renderHook(() => useExpertises(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.expertises).toEqual([]);
  });

  it("deve retornar expertises apos carregamento", async () => {
    const { result } = renderHook(() => useExpertises(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.expertises).toHaveLength(1);
    expect(result.current.expertises[0].titulo).toBe("Expertise Mock");
  });

  it("deve retornar isError false quando sucesso", async () => {
    const { result } = renderHook(() => useExpertises(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
  });
});
