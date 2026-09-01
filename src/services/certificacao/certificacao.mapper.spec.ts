import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { mapearCertificacao, mapearCertificacoes } from "./certificacao.mapper";
import type { CertificacaoBruta } from "@/schemas/certificacao/certificacao.schema";

const bruta: CertificacaoBruta = {
  id: "aws-x",
  titulo: "AWS X",
  instituicao: "AWS",
  categoria: "cloud",
  emitida_em: "2026-05",
  competencias: ["S3"],
  credencial_url: "https://cred.example/abc",
};

describe("certificacao.mapper", () => {
  it("converte snake_case para o domínio", () => {
    const c = mapearCertificacao(bruta);
    expect(c.id).toBe("aws-x");
    expect(c.competencias).toEqual(["S3"]);
    expect(c.credencialUrl).toBe("https://cred.example/abc");
  });

  it("converte emitida_em em DateTime válido", () => {
    const c = mapearCertificacao(bruta);
    expect(DateTime.isDateTime(c.emitidaEm)).toBe(true);
    expect(c.emitidaEm.year).toBe(2026);
    expect(c.emitidaEm.month).toBe(5);
  });

  it("converte null em undefined nos opcionais", () => {
    const c = mapearCertificacao({
      ...bruta,
      competencias: null,
      credencial_url: null,
    });
    expect(c.competencias).toBeUndefined();
    expect(c.credencialUrl).toBeUndefined();
  });

  it("mapeia array preservando ordem", () => {
    const resultado = mapearCertificacoes([bruta, { ...bruta, id: "y" }]);
    expect(resultado.map((c) => c.id)).toEqual(["aws-x", "y"]);
  });
});
