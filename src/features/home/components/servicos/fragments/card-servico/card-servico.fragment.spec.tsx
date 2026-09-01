import { describe, it, expect } from "vitest";
import { FaCubes } from "react-icons/fa6";
import { renderComProviders, screen } from "@/tests/helpers";
import { cores } from "@/lib/tema/tokens";
import { CardServico, type Servico } from "./card-servico.fragment";

const servico: Servico = {
  id: "engenharia",
  icone: FaCubes,
  titulo: "Engenharia & Arquitetura de Software",
  descricao: "Decisões técnicas que sustentam produtos.",
  itens: ["Arquitetura de APIs", "Revisão técnica"],
  acento: cores.category.violet,
};

describe("CardServico", () => {
  it("deve renderizar titulo e descricao", () => {
    renderComProviders(<CardServico servico={servico} />);
    expect(
      screen.getByText("Engenharia & Arquitetura de Software"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Decisões técnicas que sustentam produtos."),
    ).toBeInTheDocument();
  });

  it("deve renderizar todos os itens", () => {
    renderComProviders(<CardServico servico={servico} />);
    expect(screen.getByText("Arquitetura de APIs")).toBeInTheDocument();
    expect(screen.getByText("Revisão técnica")).toBeInTheDocument();
  });
});
