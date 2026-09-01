import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { mapearFormacao, mapearFormacoes } from "./formacao.mapper";
import type { FormacaoBruta } from "@/schemas/formacao/formacao.schema";

const bruta: FormacaoBruta = {
  id: "estacio",
  instituicao: "Estácio",
  curso: "Especialização",
  area: "Engenharia de Software",
  grau: "especializacao",
  data_inicio: "2025-07",
  data_termino: "2026-07",
  certificado: { titulo: "Diploma", url: "https://x.com/d" },
};

describe("formacao.mapper", () => {
  it("converte snake_case para o domínio", () => {
    const f = mapearFormacao(bruta);
    expect(f.id).toBe("estacio");
    expect(f.area).toBe("Engenharia de Software");
    expect(f.certificado).toEqual({
      titulo: "Diploma",
      url: "https://x.com/d",
    });
  });

  it("converte datas em DateTime válido", () => {
    const f = mapearFormacao(bruta);
    expect(DateTime.isDateTime(f.dataInicio)).toBe(true);
    expect(f.dataInicio.year).toBe(2025);
    expect(f.dataTermino?.year).toBe(2026);
  });

  it("converte null em undefined nos opcionais", () => {
    const f = mapearFormacao({
      ...bruta,
      area: null,
      data_termino: null,
      certificado: null,
    });
    expect(f.area).toBeUndefined();
    expect(f.dataTermino).toBeUndefined();
    expect(f.certificado).toBeUndefined();
  });

  it("preserva certificado sem url (url undefined)", () => {
    const f = mapearFormacao({
      ...bruta,
      certificado: { titulo: "Diploma", url: null },
    });
    expect(f.certificado).toEqual({ titulo: "Diploma", url: undefined });
  });

  it("mapeia array preservando ordem", () => {
    const resultado = mapearFormacoes([bruta, { ...bruta, id: "y" }]);
    expect(resultado.map((f) => f.id)).toEqual(["estacio", "y"]);
  });
});
