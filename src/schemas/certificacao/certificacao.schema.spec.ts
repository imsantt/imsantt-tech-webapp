import { describe, it, expect } from "vitest";
import {
  certificacaoBrutaSchema,
  certificacoesBrutasSchema,
} from "./certificacao.schema";
import type { CertificacaoBruta } from "./certificacao.schema";

const brutaValida: CertificacaoBruta = {
  id: "aws-x",
  titulo: "AWS X",
  instituicao: "AWS",
  categoria: "cloud",
  emitida_em: "2026-05",
};

describe("certificacao.schema", () => {
  it("aceita objeto com campos obrigatórios", () => {
    expect(certificacaoBrutaSchema.safeParse(brutaValida).success).toBe(true);
  });

  it("aceita competencias e credencial_url válidos", () => {
    const resultado = certificacaoBrutaSchema.safeParse({
      ...brutaValida,
      competencias: ["S3", "EC2"],
      credencial_url: "https://cred.example/abc",
    });
    expect(resultado.success).toBe(true);
  });

  it("aceita campos opcionais nulos", () => {
    const resultado = certificacaoBrutaSchema.safeParse({
      ...brutaValida,
      competencias: null,
      credencial_url: null,
    });
    expect(resultado.success).toBe(true);
  });

  it("rejeita categoria fora do enum", () => {
    const resultado = certificacaoBrutaSchema.safeParse({
      ...brutaValida,
      categoria: "seguranca",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita data de emissão inválida", () => {
    const resultado = certificacaoBrutaSchema.safeParse({
      ...brutaValida,
      emitida_em: "maio-2026",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita credencial_url inválida", () => {
    const resultado = certificacaoBrutaSchema.safeParse({
      ...brutaValida,
      credencial_url: "abc",
    });
    expect(resultado.success).toBe(false);
  });

  it("valida array via certificacoesBrutasSchema", () => {
    expect(certificacoesBrutasSchema.safeParse([brutaValida]).success).toBe(
      true,
    );
  });
});
