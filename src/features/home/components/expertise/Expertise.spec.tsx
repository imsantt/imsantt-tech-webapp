import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { sistema } from "../../../../lib/tema";
import { Expertise } from "./Expertise";

// Mock do hook diretamente
vi.mock("../../../../hooks/use-expertises/useExpertises.hook", () => ({
  useExpertises: () => ({
    expertises: [
      {
        id: "arq",
        icone: () => null,
        iconeBg: "#000",
        iconeColor: "#fff",
        titulo: "Arquitetura & Clean Code",
        descricao: "Microsserviços escaláveis, Hexagonal Architecture, NestJS.",
        tecnologias: ["NestJS", "Node.js", "React"],
      },
      {
        id: "ia",
        icone: () => null,
        iconeBg: "#000",
        iconeColor: "#fff",
        titulo: "Estratégia de IA & Cloud",
        descricao: "Ecossistemas nativos em nuvem integrados a IA.",
        tecnologias: ["Terraform", "AWS Lambda"],
      },
      {
        id: "lid",
        icone: () => null,
        iconeBg: "#000",
        iconeColor: "#fff",
        titulo: "Liderança Inclusiva",
        descricao:
          "Co-idealizador das iniciativas Pret[IA] e Guardiões Digitais.",
        tecnologias: ["Pret[IA]", "Mentoria"],
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

function renderExpertise() {
  return render(
    <MemoryRouter>
      <ChakraProvider value={sistema}>
        <Expertise />
      </ChakraProvider>
    </MemoryRouter>,
  );
}

describe("Expertise", () => {
  it("deve renderizar o titulo da secao", () => {
    renderExpertise();
    expect(screen.getByText("O que eu faço")).toBeInTheDocument();
  });

  it("deve renderizar os 3 cards", () => {
    renderExpertise();
    expect(screen.getByText("Arquitetura & Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Estratégia de IA & Cloud")).toBeInTheDocument();
    expect(screen.getByText("Liderança Inclusiva")).toBeInTheDocument();
  });

  it("deve renderizar descricoes dos cards", () => {
    renderExpertise();
    expect(screen.getByText(/Microsserviços escaláveis/)).toBeInTheDocument();
    expect(
      screen.getByText(/Ecossistemas nativos em nuvem/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Co-idealizador das iniciativas/),
    ).toBeInTheDocument();
  });

  it("deve renderizar tags de tecnologia", () => {
    renderExpertise();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
    expect(screen.getByText("Terraform")).toBeInTheDocument();
    expect(screen.getByText("Pret[IA]")).toBeInTheDocument();
  });

  it("deve ter heading h2 com id para aria-labelledby", () => {
    renderExpertise();
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "O que eu faço",
    });
    expect(heading).toHaveAttribute("id", "expertise-titulo");
  });

  it("deve ter artigos com aria-label correto", () => {
    renderExpertise();
    expect(
      screen.getByLabelText("Arquitetura & Clean Code"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Estratégia de IA & Cloud"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Liderança Inclusiva")).toBeInTheDocument();
  });
});
