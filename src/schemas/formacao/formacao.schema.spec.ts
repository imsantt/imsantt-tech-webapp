import { describe, it, expect } from "vitest";
import { formacaoBrutaSchema, formacoesBrutasSchema } from "./formacao.schema";
import type { FormacaoBruta } from "./formacao.schema";

const brutaValida: FormacaoBruta = {
  id: "estacio",
  instituicao: "Estácio",
  curso: "Especialização",
  grau: "especializacao",
  data_inicio: "2025-07",
};

describe("formacao.schema", () => {
  it("aceita objeto com campos obrigatórios", () => {
    expect(formacaoBrutaSchema.safeParse(brutaValida).success).toBe(true);
  });

  it("aceita certificado com url válida", () => {
    const resultado = formacaoBrutaSchema.safeParse({
      ...brutaValida,
      certificado: { titulo: "Diploma", url: "https://x.com/d" },
    });
    expect(resultado.success).toBe(true);
  });

  it("aceita opcionais nulos", () => {
    const resultado = formacaoBrutaSchema.safeParse({
      ...brutaValida,
      area: null,
      data_termino: null,
      certificado: null,
    });
    expect(resultado.success).toBe(true);
  });

  it("rejeita grau fora do enum", () => {
    const resultado = formacaoBrutaSchema.safeParse({
      ...brutaValida,
      grau: "phd",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita data de início inválida", () => {
    const resultado = formacaoBrutaSchema.safeParse({
      ...brutaValida,
      data_inicio: "2025",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita certificado sem título", () => {
    const resultado = formacaoBrutaSchema.safeParse({
      ...brutaValida,
      certificado: { url: "https://x.com/d" },
    });
    expect(resultado.success).toBe(false);
  });

  it("valida array via formacoesBrutasSchema", () => {
    expect(formacoesBrutasSchema.safeParse([brutaValida]).success).toBe(true);
  });
});
