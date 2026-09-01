import { describe, it, expect, vi, afterEach } from "vitest";

/** Linha bruta válida no formato do Supabase (snake_case, data ISO). */
const linhaRecente = {
  id: "aws-recente",
  titulo: "AWS Recente",
  instituicao: "AWS",
  categoria: "cloud",
  emitida_em: "2026-08",
};

const linhaAntiga = {
  id: "aws-antiga",
  titulo: "AWS Antiga",
  instituicao: "AWS",
  categoria: "cloud",
  emitida_em: "2024-01",
};

function mockSupabaseClient(resposta: { data: unknown; error: unknown }) {
  const select = vi.fn().mockResolvedValue(resposta);
  const from = vi.fn().mockReturnValue({ select });
  return { client: { from }, from, select };
}

async function importarService() {
  return import("./certificacao.service");
}

describe("certificacao.service (fonte Supabase + fallback)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.doUnmock("@/lib/supabase");
  });

  describe("fonte remota", () => {
    it("retorna e mapeia os dados do Supabase, ordenados por emissão", async () => {
      const { client, from, select } = mockSupabaseClient({
        data: [linhaAntiga, linhaRecente],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarCertificacoes } = await importarService();
      const resultado = await listarCertificacoes();

      expect(from).toHaveBeenCalledWith("certificacoes");
      expect(select).toHaveBeenCalledWith("*");
      expect(resultado.map((c) => c.id)).toEqual(["aws-recente", "aws-antiga"]);
      expect(resultado[0].emitidaEm.year).toBe(2026);
    });

    it("descarta resposta remota malformada e retorna lista vazia", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: [{ id: "x", categoria: "invalida", emitida_em: "xxxx" }],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarCertificacoes } = await importarService();
      const resultado = await listarCertificacoes();

      expect(resultado).toEqual([]);
      expect(erroSpy).toHaveBeenCalled();
    });
  });

  describe("fallback sinalizado", () => {
    it("sem Supabase configurado (null), usa o stub e loga aviso", async () => {
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: null }));

      const { listarCertificacoes } = await importarService();
      const resultado = await listarCertificacoes();

      expect(resultado.length).toBeGreaterThan(0);
      expect(avisoSpy).toHaveBeenCalled();
    });

    it("com erro na consulta, usa o stub e loga erro + aviso", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: null,
        error: { message: "falha" },
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarCertificacoes } = await importarService();
      const resultado = await listarCertificacoes();

      expect(resultado.length).toBeGreaterThan(0);
      expect(erroSpy).toHaveBeenCalled();
      expect(avisoSpy).toHaveBeenCalled();
    });

    it("stub de fallback vem ordenado e sem ids duplicados", async () => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: null }));

      const { listarCertificacoes } = await importarService();
      const resultado = await listarCertificacoes();

      for (let i = 0; i < resultado.length - 1; i++) {
        expect(
          resultado[i].emitidaEm.toMillis() >=
            resultado[i + 1].emitidaEm.toMillis(),
        ).toBe(true);
      }
      const ids = resultado.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});
