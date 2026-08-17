import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("deve renderizar o nome Robert Santos", () => {
    renderComProviders(<Hero />);
    expect(screen.getByText("Robert")).toBeInTheDocument();
    expect(screen.getByText("Santos")).toBeInTheDocument();
  });

  it("deve renderizar o badge de estrategista", () => {
    renderComProviders(<Hero />);
    expect(screen.getByText(/Estrategista em Tecnologia/)).toBeInTheDocument();
  });

  it("deve renderizar a descrição profissional", () => {
    renderComProviders(<Hero />);
    expect(
      screen.getByText(/Engenheiro de Software Sênior/),
    ).toBeInTheDocument();
  });

  it("deve ter link de Ver Experiências apontando para #habilidades", () => {
    renderComProviders(<Hero />);
    const link = screen.getByText(/Ver Experiências/);
    expect(link.closest("a")).toHaveAttribute("href", "#habilidades");
  });

  it("deve ter link de Baixar Currículo com download", () => {
    renderComProviders(<Hero />);
    const link = screen.getByLabelText("Baixar currículo em PDF");
    expect(link).toHaveAttribute("href", "/curriculo-robert-santos.pdf");
    expect(link).toHaveAttribute("download");
  });

  it("deve mudar texto do botão ao clicar em Baixar Currículo", () => {
    renderComProviders(<Hero />);
    const link = screen.getByLabelText("Baixar currículo em PDF");

    fireEvent.click(link);
    expect(screen.getByText("Download iniciado!")).toBeInTheDocument();
  });

  it("deve renderizar a imagem com alt correto", () => {
    renderComProviders(<Hero />);
    expect(screen.getByAltText("Foto de Robert Santos")).toBeInTheDocument();
  });

  it("deve ter heading h1 com id para acessibilidade", () => {
    renderComProviders(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "hero-titulo");
  });

  it("deve chamar scrollIntoView ao clicar em Ver Experiências", () => {
    const scrollIntoViewMock = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as unknown as HTMLElement);

    renderComProviders(<Hero />);
    const link = screen.getByText(/Ver Experiências/);
    fireEvent.click(link.closest("a")!);

    expect(document.getElementById).toHaveBeenCalledWith("habilidades");
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    vi.restoreAllMocks();
  });
});
