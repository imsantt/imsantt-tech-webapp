import { describe, it, expect } from "vitest";
import { listarCertificacoes } from "./certificacao.service";

describe("certificacao.service", () => {
  describe("listarCertificacoes", () => {
    it("deve retornar array de certificacoes", async () => {
      const resultado = await listarCertificacoes();
      expect(Array.isArray(resultado)).toBe(true);
      expect(resultado.length).toBeGreaterThan(0);
    });

    it("cada certificacao deve ter campos obrigatorios", async () => {
      const resultado = await listarCertificacoes();
      resultado.forEach((c) => {
        expect(c.id).toBeDefined();
        expect(c.titulo).toBeDefined();
        expect(c.instituicao).toBeDefined();
        expect(c.categoria).toBeDefined();
        expect(c.emitidaEm).toBeDefined();
      });
    });

    it("certificacoes devem estar ordenadas por emissao (mais recente primeiro)", async () => {
      const resultado = await listarCertificacoes();
      for (let i = 0; i < resultado.length - 1; i++) {
        expect(
          resultado[i].emitidaEm.toMillis() >=
            resultado[i + 1].emitidaEm.toMillis(),
        ).toBe(true);
      }
    });

    it("nao deve conter ids duplicados", async () => {
      const resultado = await listarCertificacoes();
      const ids = resultado.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});
