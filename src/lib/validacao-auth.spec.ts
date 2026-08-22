import { describe, it, expect } from "vitest";
import { validarCredenciais } from "./validacao-auth";

describe("validarCredenciais", () => {
  it("deve aceitar credenciais válidas", () => {
    const erros = validarCredenciais({
      email: "user@email.com",
      senha: "senhaForte123",
    });
    expect(erros).toEqual([]);
  });

  it("deve exigir e-mail", () => {
    const erros = validarCredenciais({ email: "", senha: "senhaForte123" });
    expect(erros).toContainEqual({
      campo: "email",
      mensagem: "E-mail é obrigatório",
    });
  });

  it("deve rejeitar e-mail com formato inválido", () => {
    const erros = validarCredenciais({
      email: "invalido",
      senha: "senhaForte123",
    });
    expect(erros).toContainEqual({
      campo: "email",
      mensagem: "E-mail inválido",
    });
  });

  it("deve exigir senha", () => {
    const erros = validarCredenciais({ email: "user@email.com", senha: "" });
    expect(erros).toContainEqual({
      campo: "senha",
      mensagem: "Senha é obrigatória",
    });
  });

  it("deve rejeitar senha curta (menos de 8 caracteres)", () => {
    const erros = validarCredenciais({ email: "user@email.com", senha: "123" });
    expect(erros.some((e) => e.campo === "senha")).toBe(true);
  });

  it("deve rejeitar senha absurdamente longa", () => {
    const erros = validarCredenciais({
      email: "user@email.com",
      senha: "a".repeat(200),
    });
    expect(erros.some((e) => e.campo === "senha")).toBe(true);
  });
});
