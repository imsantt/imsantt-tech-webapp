import { describe, it, expect, vi, afterEach } from "vitest";
import { listarHabilidades } from "./habilidade.service";

describe("habilidade.service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unmock("@/stubs/habilidades.stub");
  });

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

    it("deve preservar o icone (IconType) resolvido no cliente", async () => {
      const resultado = await listarHabilidades();
      resultado.forEach((cat) => {
        expect(cat.icone).toBeDefined();
      });
    });
  });

  describe("validação de schema na borda", () => {
    it("descarta dados malformados, loga erro e retorna lista vazia", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      vi.resetModules();
      vi.doMock("@/stubs/habilidades.stub", () => ({
        // id com caractere inválido e nivel fora do enum -> viola o schema
        STUB_HABILIDADES: [
          {
            id: "Cat Inválida!",
            titulo: "X",
            descricao: "Y",
            cor: "#000",
            corFundo: "#111",
            corBorda: "#222",
            iconeBg: "#333",
            iconeColor: "#444",
            habilidades: [{ nome: "Z", nivel: "mestre" }],
          },
        ],
      }));

      const { listarHabilidades: listarInvalido } =
        await import("./habilidade.service");

      const resultado = await listarInvalido();

      expect(resultado).toEqual([]);
      expect(erroSpy).toHaveBeenCalled();
    });
  });
});
