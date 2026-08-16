import { describe, it, expect } from "vitest";
import { listarExpertises } from "../expertise.service";

describe("expertise.service", () => {
  describe("listarExpertises", () => {
    it("deve retornar array de expertises", async () => {
      const resultado = await listarExpertises();
      expect(Array.isArray(resultado)).toBe(true);
      expect(resultado.length).toBeGreaterThan(0);
    });

    it("cada expertise deve ter campos obrigatorios", async () => {
      const resultado = await listarExpertises();
      resultado.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.titulo).toBeDefined();
        expect(item.descricao).toBeDefined();
        expect(item.tecnologias).toBeDefined();
        expect(item.icone).toBeDefined();
        expect(item.iconeBg).toBeDefined();
        expect(item.iconeColor).toBeDefined();
      });
    });

    it("deve ter pelo menos 3 expertises", async () => {
      const resultado = await listarExpertises();
      expect(resultado.length).toBeGreaterThanOrEqual(3);
    });
  });
});
