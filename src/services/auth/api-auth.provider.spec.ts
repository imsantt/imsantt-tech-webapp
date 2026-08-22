import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiAuthProvider } from "./api-auth.provider";
import { HttpError, NetworkError } from "@/lib/http";
import { AuthError } from "@/types/auth";

const { httpMock } = vi.hoisted(() => ({
  httpMock: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("@/lib/http", async () => {
  const real = await vi.importActual<typeof import("@/lib/http")>("@/lib/http");
  return {
    ...real,
    http: httpMock,
  };
});

vi.mock("@/lib/logger", () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  mascararEmail: (e?: string) => (e ? e.replace(/(?<=.{2}).*(?=@)/, "***") : ""),
}));

describe("apiAuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("entrar", () => {
    it("deve chamar POST /auth/login e retornar a sessão", async () => {
      httpMock.post.mockResolvedValue({
        usuario: { id: "1", email: "a@b.com" },
        expiraEm: 123,
      });

      const sessao = await apiAuthProvider.entrar({
        email: "a@b.com",
        senha: "senhaForte123",
      });

      expect(httpMock.post).toHaveBeenCalledWith("/auth/login", {
        email: "a@b.com",
        senha: "senhaForte123",
      });
      expect(sessao.usuario.id).toBe("1");
      expect(sessao.expiraEm).toBe(123);
    });

    it("deve mapear 401 para AuthError credenciais-invalidas", async () => {
      httpMock.post.mockRejectedValue(new HttpError(401, "nao autorizado"));

      await expect(
        apiAuthProvider.entrar({ email: "a@b.com", senha: "senhaForte123" }),
      ).rejects.toMatchObject({
        name: "AuthError",
        codigo: "credenciais-invalidas",
      });
    });

    it("deve mapear 429 para AuthError muitas-tentativas", async () => {
      httpMock.post.mockRejectedValue(new HttpError(429, "rate limit"));

      await expect(
        apiAuthProvider.entrar({ email: "a@b.com", senha: "senhaForte123" }),
      ).rejects.toMatchObject({ codigo: "muitas-tentativas" });
    });

    it("deve mapear falha de rede para AuthError rede", async () => {
      httpMock.post.mockRejectedValue(new NetworkError());

      await expect(
        apiAuthProvider.entrar({ email: "a@b.com", senha: "senhaForte123" }),
      ).rejects.toMatchObject({ codigo: "rede" });
    });
  });

  describe("sessaoAtual", () => {
    it("deve retornar a sessão em GET /auth/me", async () => {
      httpMock.get.mockResolvedValue({ usuario: { id: "9", email: "x@y.com" } });

      const sessao = await apiAuthProvider.sessaoAtual();
      expect(httpMock.get).toHaveBeenCalledWith("/auth/me");
      expect(sessao?.usuario.id).toBe("9");
    });

    it("deve retornar null quando não autenticado (401)", async () => {
      httpMock.get.mockRejectedValue(new HttpError(401, "nao autorizado"));

      const sessao = await apiAuthProvider.sessaoAtual();
      expect(sessao).toBeNull();
    });

    it("deve retornar null em falha de rede (sem quebrar a UI)", async () => {
      httpMock.get.mockRejectedValue(new NetworkError());

      const sessao = await apiAuthProvider.sessaoAtual();
      expect(sessao).toBeNull();
    });
  });

  describe("sair", () => {
    it("deve chamar POST /auth/logout", async () => {
      httpMock.post.mockResolvedValue(undefined);
      await apiAuthProvider.sair();
      expect(httpMock.post).toHaveBeenCalledWith("/auth/logout");
    });

    it("não deve lançar mesmo se o logout falhar no servidor", async () => {
      httpMock.post.mockRejectedValue(new HttpError(500, "erro"));
      await expect(apiAuthProvider.sair()).resolves.toBeUndefined();
    });
  });

  it("garante que AuthError é a classe esperada", () => {
    expect(new AuthError("desconhecido")).toBeInstanceOf(AuthError);
  });
});
