import { describe, it, expect } from "vitest";
import { sanitizar, validarContato, sanitizarContato } from "./validacao";

describe("sanitizar", () => {
  it("deve remover tags HTML e scripts perigosos", () => {
    expect(sanitizar("<script>alert('xss')</script>")).toBe("alert('xss')");
  });

  it("deve remover links javascript e atributos de evento", () => {
    expect(
      sanitizar('<a href="javascript:alert(1)" onclick="evil()">link</a>'),
    ).toBe("link");
  });

  it("deve remover javascript: protocol", () => {
    expect(sanitizar("javascript:alert(1)")).toBe("alert(1)");
  });

  it("deve remover event handlers", () => {
    expect(sanitizar('teste onclick="hack()"')).toBe("teste");
  });

  it("deve fazer trim", () => {
    expect(sanitizar("  hello  ")).toBe("hello");
  });

  it("deve manter texto normal intacto", () => {
    expect(sanitizar("Robert Santos")).toBe("Robert Santos");
  });
});

describe("validarContato", () => {
  it("deve retornar array vazio para dados válidos", () => {
    const erros = validarContato({
      nome: "Robert Santos",
      email: "robert@email.com",
      mensagem: "Olá, tenho um projeto.",
    });
    expect(erros).toHaveLength(0);
  });

  it("deve retornar erro para nome vazio", () => {
    const erros = validarContato({
      nome: "",
      email: "a@b.com",
      mensagem: "Oi",
    });
    expect(erros).toContainEqual({
      campo: "nome",
      mensagem: "Nome é obrigatório",
    });
  });

  it("deve retornar erro para email inválido", () => {
    const erros = validarContato({
      nome: "A",
      email: "invalido",
      mensagem: "Oi",
    });
    expect(erros).toContainEqual({
      campo: "email",
      mensagem: "E-mail inválido",
    });
  });

  it("deve retornar erro para mensagem vazia", () => {
    const erros = validarContato({ nome: "A", email: "a@b.com", mensagem: "" });
    expect(erros).toContainEqual({
      campo: "mensagem",
      mensagem: "Mensagem é obrigatória",
    });
  });

  it("deve retornar erro para nome muito longo", () => {
    const erros = validarContato({
      nome: "A".repeat(101),
      email: "a@b.com",
      mensagem: "Oi",
    });
    expect(erros).toContainEqual({
      campo: "nome",
      mensagem: "Nome deve ter no máximo 100 caracteres",
    });
  });

  it("deve retornar erro para mensagem muito longa", () => {
    const erros = validarContato({
      nome: "A",
      email: "a@b.com",
      mensagem: "X".repeat(2001),
    });
    expect(erros).toContainEqual({
      campo: "mensagem",
      mensagem: "Mensagem deve ter no máximo 2000 caracteres",
    });
  });
});

describe("sanitizarContato", () => {
  it("deve sanitizar todos os campos", () => {
    const resultado = sanitizarContato({
      nome: "<b>Robert</b>",
      email: "  ROBERT@EMAIL.COM  ",
      mensagem: "Olá <script>hack</script>",
    });

    expect(resultado.nome).toBe("Robert");
    expect(resultado.email).toBe("robert@email.com");
    expect(resultado.mensagem).toBe("Olá hack");
  });
});
