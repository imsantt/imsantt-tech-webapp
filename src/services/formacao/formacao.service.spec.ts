import { describe, it, expect, vi, afterEach } from "vitest";
import { listarFormacao } from "./formacao.service";

describe("formacao.service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unmock("@/stubs/formacao.stub");
  });

  describe("listarFormacao", () => {
    it("deve retornar array de formacoes", async () => {
      const resultado = await listarFormacao();
      expect(Array.isArray(resultado)).toBe(true);
      expect(resultado.length).toBeGreaterThan(0);
    });

    it("cada formacao deve ter campos obrigatorios", async () => {
      const resultado = await listarFormacao();
      resultado.forEach((f) => {
        expect(f.id).toBeDefined();
        expect(f.instituicao).toBeDefined();
        expect(f.curso).toBeDefined();
        expect(f.grau).toBeDefined();
        expect(f.dataInicio).toBeDefined();
      });
    });

    it("formacoes devem estar ordenadas por data (mais recente primeiro)", async () => {
      const resultado = await listarFormacao();
      for (let i = 0; i < resultado.length - 1; i++) {
        expect(
          resultado[i].dataInicio.toMillis() >=
            resultado[i + 1].dataInicio.toMillis(),
        ).toBe(true);
      }
    });
  });

  describe("validação de schema na borda", () => {
    it("descarta dados malformados, loga erro e retorna lista vazia", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      vi.resetModules();
      vi.doMock("@/stubs/formacao.stub", () => ({
        STUB_FORMACAO: [
          { id: "x", instituicao: "X", grau: "phd", data_inicio: "xxxx" },
        ],
      }));

      const { listarFormacao: listarInvalido } =
        await import("./formacao.service");

      const resultado = await listarInvalido();

      expect(resultado).toEqual([]);
      expect(erroSpy).toHaveBeenCalled();
    });
  });
});
