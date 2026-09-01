import { describe, it, expect } from "vitest";
import { mensagemErroLogin } from "./autenticacao.service";

describe("mensagemErroLogin", () => {
  it("retorna null quando não há código de erro", () => {
    expect(mensagemErroLogin(null)).toBeNull();
  });

  it("mapeia 'nao_autorizado' para mensagem de acesso negado", () => {
    expect(mensagemErroLogin("nao_autorizado")).toMatch(/não tem acesso/i);
  });

  it("mapeia 'acesso_negado' para autorização cancelada", () => {
    expect(mensagemErroLogin("acesso_negado")).toMatch(/cancelada/i);
  });

  it("mapeia 'state_invalido' para sessão expirada", () => {
    expect(mensagemErroLogin("state_invalido")).toMatch(/expirada/i);
  });

  it("mapeia falhas de token/usuário para mensagem genérica de login", () => {
    expect(mensagemErroLogin("falha_token")).toMatch(/GitHub/);
    expect(mensagemErroLogin("falha_usuario")).toMatch(/GitHub/);
  });

  it("usa mensagem padrão para código desconhecido", () => {
    expect(mensagemErroLogin("qualquer_outro")).toMatch(/erro no login/i);
  });
});
