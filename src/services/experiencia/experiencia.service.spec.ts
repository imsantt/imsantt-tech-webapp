import { describe, it, expect, vi, afterEach } from "vitest";

/**
 * Cada teste configura sua própria fonte (`@/lib/supabase`) e stub via
 * `vi.doMock` + `vi.resetModules`, importando o service em seguida — pois
 * a fonte é resolvida no import do módulo.
 */

/** Linha bruta válida no formato do Supabase (snake_case, data ISO). */
const linhaValida = {
  id: "acme",
  empresa: "ACME",
  cargo: "Engenheiro de Software",
  data_inicio: "2023-11",
  descricao: "Descrição.",
  tecnologias: ["React", "TypeScript"],
};

const linhaAntiga = {
  ...linhaValida,
  id: "antiga",
  empresa: "Antiga",
  data_inicio: "2019-01",
};

/** Cria um mock do client Supabase cuja consulta resolve `{ data, error }`. */
function mockSupabaseClient(resposta: { data: unknown; error: unknown }) {
  const select = vi.fn().mockResolvedValue(resposta);
  const from = vi.fn().mockReturnValue({ select });
  return { client: { from }, from, select };
}

async function importarService() {
  return import("./experiencia.service");
}

describe("experiencia.service (fonte Supabase + fallback)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.doUnmock("@/lib/supabase");
    vi.doUnmock("@/stubs/experiencias.stub");
  });

  describe("fonte remota (Supabase configurado)", () => {
    it("retorna e mapeia os dados vindos do Supabase, ordenados", async () => {
      const { client, from, select } = mockSupabaseClient({
        data: [linhaAntiga, linhaValida],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarExperiencias } = await importarService();
      const resultado = await listarExperiencias();

      expect(from).toHaveBeenCalledWith("experiencias");
      expect(select).toHaveBeenCalledWith("*");
      expect(resultado.map((e) => e.id)).toEqual(["acme", "antiga"]);
      // mapeado para o domínio (DateTime)
      expect(resultado[0].dataInicio.year).toBe(2023);
    });

    it("descarta resposta remota malformada e retorna lista vazia", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: [{ id: "x", empresa: "X", tecnologias: 123 }],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarExperiencias } = await importarService();
      const resultado = await listarExperiencias();

      expect(resultado).toEqual([]);
      expect(erroSpy).toHaveBeenCalled();
    });
  });

  describe("fallback sinalizado para o stub", () => {
    it("quando Supabase não está configurado (null), usa o stub e loga aviso", async () => {
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: null }));

      const { listarExperiencias } = await importarService();
      const resultado = await listarExperiencias();

      expect(resultado.length).toBeGreaterThan(0);
      expect(avisoSpy).toHaveBeenCalled();
    });

    it("quando a consulta ao Supabase falha, usa o stub e loga erro + aviso", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: null,
        error: { message: "conexão recusada" },
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { listarExperiencias } = await importarService();
      const resultado = await listarExperiencias();

      expect(resultado.length).toBeGreaterThan(0);
      expect(erroSpy).toHaveBeenCalled();
      expect(avisoSpy).toHaveBeenCalled();
    });
  });

  describe("buscarExperienciaPorId", () => {
    it("retorna a experiência correspondente vinda do Supabase", async () => {
      const { client } = mockSupabaseClient({
        data: [linhaAntiga, linhaValida],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { buscarExperienciaPorId } = await importarService();
      const resultado = await buscarExperienciaPorId("acme");

      expect(resultado).not.toBeNull();
      expect(resultado?.empresa).toBe("ACME");
    });

    it("retorna null quando o id não existe", async () => {
      const { client } = mockSupabaseClient({
        data: [linhaValida],
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { buscarExperienciaPorId } = await importarService();
      const resultado = await buscarExperienciaPorId("nao-existe");

      expect(resultado).toBeNull();
    });
  });
});
