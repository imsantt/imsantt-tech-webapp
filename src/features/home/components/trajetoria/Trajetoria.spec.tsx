import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "../../../../tests/helpers";
import { Trajetoria } from "./Trajetoria";

describe("Trajetoria", () => {
  it("deve renderizar o titulo da secao", () => {
    renderComProviders(<Trajetoria />);
    expect(screen.getByText("Experiência Profissional")).toBeInTheDocument();
  });

  it("deve renderizar todas as empresas", () => {
    renderComProviders(<Trajetoria />);
    expect(screen.getByText("YDUQS")).toBeInTheDocument();
    expect(screen.getByText("SENAI/SC")).toBeInTheDocument();
    expect(screen.getByText("act digital")).toBeInTheDocument();
    expect(screen.getByText("Gama Academy")).toBeInTheDocument();
    expect(screen.getByText("JDC")).toBeInTheDocument();
  });

  it("deve renderizar badge 'Atual' para experiencia corrente", () => {
    renderComProviders(<Trajetoria />);
    expect(screen.getByText("Atual")).toBeInTheDocument();
  });

  it("deve renderizar cargos das experiencias", () => {
    renderComProviders(<Trajetoria />);
    expect(
      screen.getByText(/Engenheiro de Software Fullstack Sr/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Instrutor em Desenvolvimento Web/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Analista Desenvolvedor Fullstack/),
    ).toBeInTheDocument();
  });

  it("deve renderizar tecnologias nos cards", () => {
    renderComProviders(<Trajetoria />);
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
  });

  it("deve ter heading h2 com id para acessibilidade", () => {
    renderComProviders(<Trajetoria />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Experiência Profissional",
    });
    expect(heading).toHaveAttribute("id", "trajetoria-titulo");
  });

  it("deve renderizar o rotulo Trajetoria", () => {
    renderComProviders(<Trajetoria />);
    expect(screen.getByText("Trajetória")).toBeInTheDocument();
  });

  it("deve renderizar descricao do subtitulo com anos dinamicos", () => {
    renderComProviders(<Trajetoria />);
    expect(screen.getByText(/anos construindo software/)).toBeInTheDocument();
  });
});
