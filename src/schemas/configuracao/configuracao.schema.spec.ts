import { describe, it, expect } from "vitest";
import { configuracaoSiteSchema } from "./configuracao.schema";

const configValida = {
  contato: { email: "contato@imsantt.tech", telefone: "" },
  navegacao: [{ label: "Início", href: "#hero" }],
  linksAjuda: [{ label: "Termos", href: "#" }],
  redesSociais: [
    { label: "GitHub", href: "https://github.com/imsantt", icone: "github" },
  ],
  nomeAutor: "Robert Santos",
  cargo: "Engenheiro de Software",
  disponivel: true,
};

describe("configuracao.schema", () => {
  it("aceita configuração válida", () => {
    expect(configuracaoSiteSchema.safeParse(configValida).success).toBe(true);
  });

  it("aceita telefone vazio", () => {
    const resultado = configuracaoSiteSchema.safeParse({
      ...configValida,
      contato: { email: "a@b.com", telefone: "" },
    });
    expect(resultado.success).toBe(true);
  });

  it("rejeita email inválido", () => {
    const resultado = configuracaoSiteSchema.safeParse({
      ...configValida,
      contato: { email: "nao-e-email", telefone: "" },
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita icone de rede social fora do enum", () => {
    const resultado = configuracaoSiteSchema.safeParse({
      ...configValida,
      redesSociais: [{ label: "X", href: "https://x.com", icone: "twitter" }],
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita href de rede social que não é URL", () => {
    const resultado = configuracaoSiteSchema.safeParse({
      ...configValida,
      redesSociais: [{ label: "GitHub", href: "#", icone: "github" }],
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita disponivel não-booleano", () => {
    const resultado = configuracaoSiteSchema.safeParse({
      ...configValida,
      disponivel: "sim",
    });
    expect(resultado.success).toBe(false);
  });
});
