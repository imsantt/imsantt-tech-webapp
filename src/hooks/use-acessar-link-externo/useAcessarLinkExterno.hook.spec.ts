import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAcessarLinkExterno } from "./useAcessarLinkExterno.hook";

describe("useAcessarLinkExterno", () => {
  const openMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("open", openMock);
  });

  it("deve retornar a função acessar", () => {
    const { result } = renderHook(() => useAcessarLinkExterno());
    expect(result.current.acessar).toBeInstanceOf(Function);
  });

  it("deve abrir link em _blank por padrão com noopener,noreferrer", () => {
    const { result } = renderHook(() => useAcessarLinkExterno());
    result.current.acessar({ url: "https://github.com/imsantt" });

    expect(openMock).toHaveBeenCalledWith(
      "https://github.com/imsantt",
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("deve respeitar o target informado", () => {
    const { result } = renderHook(() => useAcessarLinkExterno());
    result.current.acessar({
      url: "https://linkedin.com/in/imsantt",
      target: "_self",
    });

    expect(openMock).toHaveBeenCalledWith(
      "https://linkedin.com/in/imsantt",
      "_self",
      "noopener,noreferrer",
    );
  });

  it("deve manter referência estável da função entre renders", () => {
    const { result, rerender } = renderHook(() => useAcessarLinkExterno());
    const primeiraRef = result.current.acessar;
    rerender();
    expect(result.current.acessar).toBe(primeiraRef);
  });
});
