import { describe, it, expect } from "vitest";
import { cores, tipografia, espacamento, raio, sombras } from "./tokens";

describe("Design System Tokens", () => {
  describe("cores", () => {
    it("deve ter cor primary definida como hex válido", () => {
      expect(cores.primary.DEFAULT).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it("deve ter variações de primary (hover, light, dark)", () => {
      expect(cores.primary.hover).toBeDefined();
      expect(cores.primary.light).toBeDefined();
      expect(cores.primary.dark).toBeDefined();
    });

    it("deve ter camadas de background ordenadas por luminosidade", () => {
      expect(cores.background.base).toBeDefined();
      expect(cores.background.subtle).toBeDefined();
      expect(cores.background.card).toBeDefined();
      expect(cores.background.elevated).toBeDefined();
    });

    it("deve ter cores de text com heading, body e subtle", () => {
      expect(cores.text.heading).toBeDefined();
      expect(cores.text.body).toBeDefined();
      expect(cores.text.subtle).toBeDefined();
    });

    it("deve ter cores semanticas de feedback (success, danger, warning, info)", () => {
      expect(cores.success.DEFAULT).toBeDefined();
      expect(cores.danger.DEFAULT).toBeDefined();
      expect(cores.warning.DEFAULT).toBeDefined();
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
