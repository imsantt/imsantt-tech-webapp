import { describe, it, expect } from "vitest";
import {
  listarExperiencias,
  buscarExperienciaPorId,
} from "./experiencia.service";

describe("experiencia.service", () => {
  describe("listarExperiencias", () => {
    it("deve retornar array de experiencias", async () => {
      const resultado = await listarExperiencias();
      expect(Array.isArray(resultado)).toBe(true);
      expect(resultado.length).toBeGreaterThan(0);
    });

    it("cada experiencia deve ter campos obrigatorios", async () => {
      const resultado = await listarExperiencias();
      resultado.forEach((exp) => {
        expect(exp.id).toBeDefined();
        expect(exp.empresa).toBeDefined();
        expect(exp.cargo).toBeDefined();
        expect(exp.dataInicio).toBeDefined();
        expect(exp.descricao).toBeDefined();
        expect(exp.tecnologias).toBeDefined();
        expect(Array.isArray(exp.tecnologias)).toBe(true);
      });
    });

    it("experiencias devem estar ordenadas por data (mais recente primeiro)", async () => {
      const resultado = await listarExperiencias();
      for (let i = 0; i < resultado.length - 1; i++) {
        expect(
          resultado[i].dataInicio.toMillis() >=
            resultado[i + 1].dataInicio.toMillis(),
        ).toBe(true);
      }
    });

    it("deve ter pelo menos uma experiencia atual (sem dataTermino)", async () => {
      const resultado = await listarExperiencias();
      const atual = resultado.find((exp) => !exp.dataTermino);
      expect(atual).toBeDefined();
    });
  });

  describe("buscarExperienciaPorId", () => {
    it("deve retornar experiencia quando id existe", async () => {
      const resultado = await buscarExperienciaPorId("yduqs");
      expect(resultado).not.toBeNull();
      expect(resultado?.empresa).toBe("YDUQS");
    });

    it("deve retornar null quando id nao existe", async () => {
      const resultado = await buscarExperienciaPorId("nao-existe");
      expect(resultado).toBeNull();
    });
  });
});
