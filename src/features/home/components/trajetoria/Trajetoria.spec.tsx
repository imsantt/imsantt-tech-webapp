import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { sistema } from "@/lib/tema";
import { Trajetoria } from "./Trajetoria";

// Mock do hook diretamente — dados instantâneos, sem SWR/delay
vi.mock("@/hooks/use-experiencias/useExperiencias.hook", () => ({
  useExperiencias: () => ({
    experiencias: [
      {
        id: "yduqs",
        empresa: "YDUQS",
        cargo:
          "Engenheiro de Software Fullstack Sr. / Apoio à Liderança Técnica",
        dataInicio: DateTime.fromObject({ year: 2023, month: 11 }),
        descricao: "Apoio direto à Liderança Técnica.",
        tecnologias: ["NestJS", "React", "AWS"],
      },
      {
        id: "senai",
        empresa: "SENAI/SC",
        cargo: "Instrutor em Desenvolvimento Web / Mentor Técnico",
        dataInicio: DateTime.fromObject({ year: 2023, month: 5 }),
        dataTermino: DateTime.fromObject({ year: 2023, month: 12 }),
        descricao: "Liderança técnica de turmas.",
        tecnologias: ["React", "Angular", "TypeScript"],
      },
      {
        id: "jdc",
        empresa: "JDC",
        cargo: "Analista Desenvolvedor Fullstack",
        dataInicio: DateTime.fromObject({ year: 2021, month: 8 }),
        dataTermino: DateTime.fromObject({ year: 2022, month: 7 }),
        descricao: "Desenvolvimento fullstack.",
        tecnologias: ["Angular", "React", "Node.js"],
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

function renderTrajetoria() {
  return render(
    <MemoryRouter>
      <ChakraProvider value={sistema}>
        <Trajetoria />
      </ChakraProvider>
    </MemoryRouter>,
  );
}

describe("Trajetoria", () => {
  it("deve renderizar o titulo da secao", () => {
    renderTrajetoria();
    expect(screen.getByText("Experiência Profissional")).toBeInTheDocument();
  });

  it("deve renderizar empresas", () => {
    renderTrajetoria();
    expect(screen.getByText("YDUQS")).toBeInTheDocument();
    expect(screen.getByText("SENAI/SC")).toBeInTheDocument();
    expect(screen.getByText("JDC")).toBeInTheDocument();
  });

  it("deve renderizar badge Atual para experiencia corrente", () => {
    renderTrajetoria();
    expect(screen.getByText("Atual")).toBeInTheDocument();
  });

  it("deve renderizar cargos", () => {
    renderTrajetoria();
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
    renderTrajetoria();
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
  });

  it("deve ter heading h2 com id para acessibilidade", () => {
    renderTrajetoria();
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Experiência Profissional",
    });
    expect(heading).toHaveAttribute("id", "trajetoria-titulo");
  });

  it("deve renderizar o rotulo Trajetoria", () => {
    renderTrajetoria();
    expect(screen.getByText("Trajetória")).toBeInTheDocument();
  });

  it("deve renderizar subtitulo com anos dinamicos", () => {
    renderTrajetoria();
    expect(screen.getByText(/anos construindo software/)).toBeInTheDocument();
  });
});
