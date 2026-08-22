import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuth } from "./useAuth.hook";
import {
  AuthError,
  MENSAGEM_ERRO_GENERICA,
  MENSAGEM_MUITAS_TENTATIVAS,
} from "@/types/auth";

const { authProviderMock } = vi.hoisted(() => ({
  authProviderMock: {
    entrar: vi.fn(),
    sair: vi.fn(),
    sessaoAtual: vi.fn(),
  },
}));

vi.mock("@/services/auth", () => ({
  authProvider: authProviderMock,
}));

vi.mock("@/lib/logger", () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const CREDENCIAIS = { email: "user@email.com", senha: "senhaForte123" };
const SESSAO = { usuario: { id: "1", email: "user@email.com" } };

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authProviderMock.sessaoAtual.mockResolvedValue(null);
    authProviderMock.entrar.mockResolvedValue(SESSAO);
    authProviderMock.sair.mockResolvedValue(undefined);
  });

  it("deve verificar a sessão inicial e terminar carregando=false", async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.carregando).toBe(false));
    expect(result.current.autenticado).toBe(false);
  });

  it("deve autenticar com credenciais válidas", async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.carregando).toBe(false));

    let sucesso = false;
    await act(async () => {
      sucesso = await result.current.entrar(CREDENCIAIS);
    });

    expect(sucesso).toBe(true);
    expect(result.current.autenticado).toBe(true);
    expect(authProviderMock.entrar).toHaveBeenCalledWith(CREDENCIAIS);
  });

  it("não deve chamar o provider com credenciais inválidas (validação local)", async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.carregando).toBe(false));

    let sucesso = true;
    await act(async () => {
      sucesso = await result.current.entrar({ email: "x", senha: "123" });
    });

    expect(sucesso).toBe(false);
    expect(authProviderMock.entrar).not.toHaveBeenCalled();
    expect(result.current.erro).toBe(MENSAGEM_ERRO_GENERICA);
  });

  it("deve exibir erro genérico quando o provider rejeita", async () => {
    authProviderMock.entrar.mockRejectedValue(
      new AuthError("credenciais-invalidas"),
    );
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.carregando).toBe(false));

    await act(async () => {
      await result.current.entrar(CREDENCIAIS);
    });

    expect(result.current.erro).toBe(MENSAGEM_ERRO_GENERICA);
    expect(result.current.autenticado).toBe(false);
  });

  it("deve exibir mensagem específica para muitas tentativas do servidor", async () => {
    authProviderMock.entrar.mockRejectedValue(
      new AuthError("muitas-tentativas"),
    );
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.carregando).toBe(false));

    await act(async () => {
      await result.current.entrar(CREDENCIAIS);
    });

    expect(result.current.erro).toBe(MENSAGEM_MUITAS_TENTATIVAS);
  });

  it("deve limpar a sessão ao sair", async () => {
    authProviderMock.sessaoAtual.mockResolvedValue(SESSAO);
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.autenticado).toBe(true));

    await act(async () => {
      await result.current.sair();
    });

    expect(authProviderMock.sair).toHaveBeenCalled();
    expect(result.current.autenticado).toBe(false);
  });
});
