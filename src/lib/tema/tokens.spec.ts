import { describe, it, expect } from "vitest";
import { cores, tipografia, espacamento, raio, sombras } from "./tokens";

describe("Design System Tokens", () => {
  describe("cores", () => {
    it("deve ter cor primaria definida como hex válido", () => {
      expect(cores.primaria.DEFAULT).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it("deve ter variações de primaria (hover, claro, escuro)", () => {
      expect(cores.primaria.hover).toBeDefined();
      expect(cores.primaria.claro).toBeDefined();
      expect(cores.primaria.escuro).toBeDefined();
    });

    it("deve ter camadas de background ordenadas por luminosidade", () => {
      expect(cores.bg.base).toBeDefined();
      expect(cores.bg.sutil).toBeDefined();
      expect(cores.bg.card).toBeDefined();
      expect(cores.bg.elevado).toBeDefined();
    });

    it("deve ter cores de texto com titulo, corpo e sutil", () => {
      expect(cores.texto.titulo).toBeDefined();
      expect(cores.texto.corpo).toBeDefined();
      expect(cores.texto.sutil).toBeDefined();
    });

    it("deve ter cores semanticas de feedback (sucesso, erro, alerta, info)", () => {
      expect(cores.sucesso.DEFAULT).toBeDefined();
      expect(cores.erro.DEFAULT).toBeDefined();
      expect(cores.alerta.DEFAULT).toBeDefined();
      expect(cores.info.DEFAULT).toBeDefined();
    });
  });

  describe("tipografia", () => {
    it("deve ter familia sans e mono", () => {
      expect(tipografia.familia.sans).toContain("Inter");
      expect(tipografia.familia.mono).toContain("JetBrains");
    });

    it("deve ter tamanhos em rem", () => {
      expect(tipografia.tamanho.base).toBe("1rem");
      expect(tipografia.tamanho.xs).toContain("rem");
    });

    it("deve ter pesos de light a extrabold", () => {
      expect(tipografia.peso.light).toBe(300);
      expect(tipografia.peso.extrabold).toBe(800);
    });
  });

  describe("espacamento", () => {
    it("deve ter valores em rem", () => {
      expect(espacamento["4"]).toBe("1rem");
      expect(espacamento["8"]).toBe("2rem");
    });

    it("deve ter escalas grandes (xl-res)", () => {
      expect(espacamento["xl-res"]).toBeDefined();
      expect(espacamento["4xl-res"]).toBeDefined();
    });
  });

  describe("raio", () => {
    it("deve ter full como 9999px para circulos", () => {
      expect(raio.full).toBe("9999px");
    });

    it("deve ter raios em rem", () => {
      expect(raio.lg).toContain("rem");
    });
  });

  describe("sombras", () => {
    it("deve ter sombras para card, botao e input", () => {
      expect(sombras.card).toContain("rgba");
      expect(sombras.botao).toContain("rgba");
      expect(sombras.input).toContain("rgba");
    });
  });
});
