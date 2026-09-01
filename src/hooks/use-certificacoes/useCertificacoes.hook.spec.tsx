import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useCertificacoes } from "./useCertificacoes.hook";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

vi.mock("../../services/certificacao/certificacao.service", () => ({
  listarCertificacoes: vi.fn().mockResolvedValue([
    {
      id: "mock-1",
      titulo: "AWS Cloud Foundations",
      instituicao: "Amazon Web Services (AWS)",
      categoria: "cloud",
      emitidaEm: { year: 2026, month: 5 },
    },
  ]),
}));

describe("useCertificacoes", () => {
  it("deve iniciar com isLoading true e lista vazia", () => {
    const { result } = renderHook(() => useCertificacoes(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.certificacoes).toEqual([]);
  });

  it("deve retornar certificacoes apos carregamento", async () => {
    const { result } = renderHook(() => useCertificacoes(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.certificacoes).toHaveLength(1);
    expect(result.current.certificacoes[0].categoria).toBe("cloud");
    expect(result.current.isError).toBe(false);
  });
});
