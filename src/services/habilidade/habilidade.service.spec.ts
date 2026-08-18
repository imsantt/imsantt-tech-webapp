import { describe, it, expect } from "vitest";
import { listarHabilidades } from "./habilidade.service";

describe("habilidade.service", () => {
  describe("listarHabilidades", () => {
    it("deve retornar array de categorias", async () => {
      const resultado = await listarHabilidades();
      expect(Array.isArray(resultado)).toBe(true);
      expect(resultado.length).toBeGreaterThan(0);
    });

    it("cada categoria deve ter campos obrigatorios", async () => {
      const resultado = await listarHabilidades();
      resultado.forEach((cat) => {
        expect(cat.id).toBeDefined();
        expect(cat.titulo).toBeDefined();
        expect(cat.descricao).toBeDefined();
        expect(cat.cor).toBeDefined();
        expect(cat.corFundo).toBeDefined();
        expect(cat.corBorda).toBeDefined();
        expect(cat.icone).toBeDefined();
        expect(cat.habilidades).toBeDefined();
        expect(Array.isArray(cat.habilidades)).toBe(true);
      });
    });

    it("deve retornar as 6 categorias do stub", async () => {
      const resultado = await listarHabilidades();
      expect(resultado).toHaveLength(6);
    });

    it("cada habilidade deve ter ao menos o campo nome", async () => {
      const resultado = await listarHabilidades();
      resultado.forEach((cat) => {
        cat.habilidades.forEach((hab) => {
          expect(hab.nome).toBeDefined();
          expect(typeof hab.nome).toBe("string");
        });
      });
    });

    it("categorias devem ter ids unicos", async () => {
      const resultado = await listarHabilidades();
      const ids = resultado.map((cat) => cat.id);
      const idsUnicos = new Set(ids);
      expect(idsUnicos.size).toBe(ids.length);
    });
  });
});
