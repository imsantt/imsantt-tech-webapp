import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { mapearExperiencia, mapearExperiencias } from "./experiencia.mapper";
import type { ExperienciaBruta } from "@/schemas/experiencia.schema";

const brutaCompleta: ExperienciaBruta = {
  id: "acme",
  empresa: "ACME",
  cargo: "Engenheiro de Software",
  data_inicio: "2023-11",
  data_termino: "2024-06",
  descricao: "Descrição curta.",
  tecnologias: ["React", "TypeScript"],
  descricao_longa: "Descrição longa.",
  local: "Remoto · Brasil",
  modelo: "remoto",
  tipo: "clt",
  setor: "Tecnologia",
  destaques: [{ texto: "Entrega X", metrica: "-40% tempo" }],
  site: "https://acme.com",
};

describe("experiencia.mapper", () => {
  describe("mapearExperiencia", () => {
    it("converte snake_case para camelCase do domínio", () => {
      const exp = mapearExperiencia(brutaCompleta);
      expect(exp.id).toBe("acme");
      expect(exp.empresa).toBe("ACME");
      expect(exp.descricaoLonga).toBe("Descrição longa.");
      expect(exp.destaques?.[0]).toEqual({
        texto: "Entrega X",
        metrica: "-40% tempo",
      });
    });

    it("converte datas ISO string em DateTime válido", () => {
      const exp = mapearExperiencia(brutaCompleta);
      expect(DateTime.isDateTime(exp.dataInicio)).toBe(true);
      expect(exp.dataInicio.year).toBe(2023);
      expect(exp.dataInicio.month).toBe(11);
      expect(exp.dataTermino?.year).toBe(2024);
      expect(exp.dataTermino?.month).toBe(6);
    });

    it("converte null/ausente em undefined para campos opcionais", () => {
      const minima: ExperienciaBruta = {
        id: "min",
        empresa: "Min",
        cargo: "Dev",
        data_inicio: "2020-01",
        data_termino: null,
        descricao: "Curta.",
        tecnologias: ["Node.js"],
        descricao_longa: null,
        local: null,
        modelo: null,
        tipo: null,
        setor: null,
        destaques: null,
        site: null,
      };
      const exp = mapearExperiencia(minima);
      expect(exp.dataTermino).toBeUndefined();
      expect(exp.descricaoLonga).toBeUndefined();
      expect(exp.local).toBeUndefined();
      expect(exp.modelo).toBeUndefined();
      expect(exp.tipo).toBeUndefined();
      expect(exp.setor).toBeUndefined();
      expect(exp.destaques).toBeUndefined();
      expect(exp.site).toBeUndefined();
    });
  });

  describe("mapearExperiencias", () => {
    it("mapeia um array preservando a ordem", () => {
      const resultado = mapearExperiencias([
        brutaCompleta,
        { ...brutaCompleta, id: "outra" },
      ]);
      expect(resultado).toHaveLength(2);
      expect(resultado[0].id).toBe("acme");
      expect(resultado[1].id).toBe("outra");
    });
  });
});
