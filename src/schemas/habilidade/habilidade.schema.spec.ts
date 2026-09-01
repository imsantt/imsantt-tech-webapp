import { describe, it, expect } from "vitest";
import {
  categoriaHabilidadeSchema,
  categoriasHabilidadeSchema,
} from "./habilidade.schema";

const categoriaValida = {
  id: "arquitetura",
  titulo: "Arquitetura",
  descricao: "Descrição da categoria.",
  cor: "#7c3aed",
  corFundo: "#1e1b2e",
  corBorda: "#4c1d95",
  iconeBg: "#1e1b2e",
  iconeColor: "#7c3aed",
  habilidades: [{ nome: "SOLID", nivel: "especialista" }],
};

describe("habilidade.schema", () => {
  it("aceita categoria com campos serializáveis válidos", () => {
    expect(categoriaHabilidadeSchema.safeParse(categoriaValida).success).toBe(
      true,
    );
  });

  it("tolera campo icone (IconType) não-serializável via loose", () => {
    const comIcone = {
      ...categoriaValida,
      icone: () => null, // simula IconType
      habilidades: [{ nome: "React", nivel: "avancado", icone: () => null }],
    };
    expect(categoriaHabilidadeSchema.safeParse(comIcone).success).toBe(true);
  });

  it("rejeita id fora do padrão seguro [a-z0-9-]", () => {
    const resultado = categoriaHabilidadeSchema.safeParse({
      ...categoriaValida,
      id: "Cat Inválida!",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita nivel de habilidade fora do enum", () => {
    const resultado = categoriaHabilidadeSchema.safeParse({
      ...categoriaValida,
      habilidades: [{ nome: "X", nivel: "mestre" }],
    });
    expect(resultado.success).toBe(false);
  });

  it("aceita habilidade só com nome (nivel/descricao opcionais)", () => {
    const resultado = categoriaHabilidadeSchema.safeParse({
      ...categoriaValida,
      habilidades: [{ nome: "CloudFront" }],
    });
    expect(resultado.success).toBe(true);
  });

  it("valida array via categoriasHabilidadeSchema", () => {
    expect(
      categoriasHabilidadeSchema.safeParse([categoriaValida]).success,
    ).toBe(true);
  });
});
