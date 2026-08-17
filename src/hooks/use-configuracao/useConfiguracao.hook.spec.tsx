import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useConfiguracao } from "./useConfiguracao.hook";
import { STUB_CONFIGURACAO } from "@/stubs/configuracao.stub";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

vi.mock("../../services/configuracao/configuracao.service", () => ({
  obterConfiguracao: vi.fn().mockResolvedValue({
    contato: { email: "test@test.com", telefone: "" },
    navegacao: [{ label: "Início", href: "#hero" }],
    linksAjuda: [{ label: "Privacidade", href: "#" }],
    redesSociais: [
      { label: "GitHub", href: "https://github.com/imsantt", icone: "github" },
    ],
    nomeAutor: "Robert Santos",
    cargo: "Engenheiro de Software Sênior & Arquiteto",
    disponivel: true,
  }),
}));

describe("useConfiguracao", () => {
  it("deve retornar fallback (stub) enquanto carrega", () => {
    const { result } = renderHook(() => useConfiguracao(), { wrapper });
    expect(result.current.configuracao.nomeAutor).toBe(
      STUB_CONFIGURACAO.nomeAutor,
    );
  });

  it("deve retornar configuracao apos carregamento", async () => {
    const { result } = renderHook(() => useConfiguracao(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.configuracao.nomeAutor).toBe("Robert Santos");
    expect(result.current.configuracao.cargo).toContain("Engenheiro");
    expect(result.current.isError).toBe(false);
  });

  it("deve ter redesSociais na configuracao", async () => {
    const { result } = renderHook(() => useConfiguracao(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.configuracao.redesSociais.length).toBeGreaterThan(0);
  });
});
