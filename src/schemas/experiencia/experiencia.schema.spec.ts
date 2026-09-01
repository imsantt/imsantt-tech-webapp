import { describe, it, expect } from "vitest";
import {
  experienciaBrutaSchema,
  experienciasBrutasSchema,
} from "./experiencia.schema";
import type { ExperienciaBruta } from "./experiencia.schema";

const brutaValida: ExperienciaBruta = {
  id: "acme",
  empresa: "ACME",
  cargo: "Engenheiro de Software",
  data_inicio: "2023-11",
  descricao: "Descrição da experiência.",
  tecnologias: ["React", "TypeScript"],
};

describe("experiencia.schema", () => {
  describe("experienciaBrutaSchema", () => {
    it("aceita objeto com campos obrigatórios", () => {
      const resultado = experienciaBrutaSchema.safeParse(brutaValida);
      expect(resultado.success).toBe(true);
    });

    it("aceita data com dia (YYYY-MM-DD)", () => {
      const resultado = experienciaBrutaSchema.safeParse({
        ...brutaValida,
        data_inicio: "2023-11-15",
      });
      expect(resultado.success).toBe(true);
    });

    it("aceita campos opcionais nulos (formato Supabase)", () => {
      const resultado = experienciaBrutaSchema.safeParse({
        ...brutaValida,
        data_termino: null,
        descricao_longa: null,
        local: null,
        modelo: null,
        tipo: null,
        setor: null,
        destaques: null,
        site: null,
      });
      expect(resultado.success).toBe(true);
    });

    it("rejeita quando falta campo obrigatório", () => {
      const semEmpresa: Record<string, unknown> = { ...brutaValida };
      delete semEmpresa.empresa;
      const resultado = experienciaBrutaSchema.safeParse(semEmpresa);
      expect(resultado.success).toBe(false);
    });

    it("rejeita data em formato inválido", () => {
      const resultado = experienciaBrutaSchema.safeParse({
        ...brutaValida,
        data_inicio: "novembro/2023",
      });
      expect(resultado.success).toBe(false);
    });

    it("rejeita modelo de trabalho fora do enum", () => {
      const resultado = experienciaBrutaSchema.safeParse({
        ...brutaValida,
        modelo: "hibrido-remoto",
      });
      expect(resultado.success).toBe(false);
    });

    it("rejeita site com URL inválida", () => {
      const resultado = experienciaBrutaSchema.safeParse({
        ...brutaValida,
        site: "nao-e-url",
      });
      expect(resultado.success).toBe(false);
    });

    it("rejeita tecnologias que não são array de strings", () => {
      const resultado = experienciaBrutaSchema.safeParse({
        ...brutaValida,
        tecnologias: "React",
      });
      expect(resultado.success).toBe(false);
    });
  });

  describe("experienciasBrutasSchema", () => {
    it("aceita array de experiências válidas", () => {
      const resultado = experienciasBrutasSchema.safeParse([brutaValida]);
      expect(resultado.success).toBe(true);
    });

    it("rejeita quando qualquer item é inválido", () => {
      const resultado = experienciasBrutasSchema.safeParse([
        brutaValida,
        { ...brutaValida, data_inicio: "invalida" },
      ]);
      expect(resultado.success).toBe(false);
    });
  });
});
