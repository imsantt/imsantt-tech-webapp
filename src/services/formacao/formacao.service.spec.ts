import { describe, it, expect } from "vitest";
import { listarFormacao } from "./formacao.service";

describe("formacao.service", () => {
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
});
