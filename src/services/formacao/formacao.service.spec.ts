import { describe, it, expect, vi, afterEach } from "vitest";

/** Linha bruta válida no formato do Supabase (snake_case, datas ISO). */
const linhaRecente = {
  id: "pos",
  instituicao: "Estácio",
  curso: "Especialização",
  grau: "especializacao",
  data_inicio: "2025-07",
};

const linhaAntiga = {
  id: "tecnico",
  instituicao: "ETI",
  curso: "Técnico",
  grau: "tecnico",
  data_inicio: "2017-01",
};

function mockSupabaseClient(resposta: { data: unknown; error: unknown }) {
  const select = vi.fn().mockResolvedValue(resposta);
  const from = vi.fn().mockReturnValue({ select });
  return { client: { from }, from, select };
}

async function importarService() {
  return import("./formacao.service");
}

describe("formacao.service (fonte Supabase + fallback)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.doUnmock("@/lib/supabase");
  });

  describe("fonte remota", () => {
    it("retorna e mapeia os dados do Supabase, ordenados por data", async () => {
      const { client, from, select } = mockSupabaseClient({
        data: [linhaAntiga, linhaRecente],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarFormacao } = await importarService();
      const resultado = await listarFormacao();

      expect(from).toHaveBeenCalledWith("formacao");
      expect(select).toHaveBeenCalledWith("*");
      expect(resultado.map((f) => f.id)).toEqual(["pos", "tecnico"]);
      expect(resultado[0].dataInicio.year).toBe(2025);
    });

    it("descarta resposta remota malformada e retorna lista vazia", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: [{ id: "x", grau: "phd", data_inicio: "xxxx" }],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarFormacao } = await importarService();
      const resultado = await listarFormacao();

      expect(resultado).toEqual([]);
      expect(erroSpy).toHaveBeenCalled();
    });
  });

  describe("fallback sinalizado", () => {
    it("sem Supabase configurado (null), usa o stub e loga aviso", async () => {
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: null }));

      const { listarFormacao } = await importarService();
      const resultado = await listarFormacao();

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

      const { listarFormacao } = await importarService();
      const resultado = await listarFormacao();

      expect(resultado.length).toBeGreaterThan(0);
      expect(erroSpy).toHaveBeenCalled();
      expect(avisoSpy).toHaveBeenCalled();
    });
  });
});
