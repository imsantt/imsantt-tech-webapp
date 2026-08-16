import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useScrollSuave } from "./useScrollSuave.hook";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("useScrollSuave", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("deve retornar a função rolarParaAncora", () => {
    const { result } = renderHook(() => useScrollSuave(), { wrapper });
    expect(result.current.rolarParaAncora).toBeInstanceOf(Function);
  });

  it("deve chamar scrollIntoView do elemento quando na home", () => {
    const scrollIntoViewMock = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as unknown as HTMLElement);

    const { result } = renderHook(() => useScrollSuave(), { wrapper });
    result.current.rolarParaAncora("expertise");

    expect(document.getElementById).toHaveBeenCalledWith("expertise");
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("deve navegar para / e depois rolar quando fora da home", () => {
    vi.useFakeTimers();
    const scrollIntoViewMock = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as unknown as HTMLElement);

    const wrapperForaHome = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={["/outra-pagina"]}>{children}</MemoryRouter>
    );

    const { result } = renderHook(() => useScrollSuave(), {
      wrapper: wrapperForaHome,
    });
    result.current.rolarParaAncora("contato");

    // Antes do timeout, scrollIntoView não deve ter sido chamado
    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    // Avança o timer
    vi.advanceTimersByTime(150);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    vi.useRealTimers();
  });
});
