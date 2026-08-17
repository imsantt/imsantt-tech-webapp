import { describe, it, expect, vi } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import {
  CardExperiencia,
  type ExperienciaProps,
} from "./CardExperiencia.component";

const expAtualMock: ExperienciaProps = {
  id: "test-1",
  empresa: "Empresa Teste",
  cargo: "Engenheiro de Software Sr.",
  dataInicio: DateTime.fromObject({ year: 2024, month: 1 }),
  descricao: "Desenvolvimento de sistemas escaláveis.",
  tecnologias: ["React", "Node.js"],
};

const expFinalizadaMock: ExperienciaProps = {
  ...expAtualMock,
  id: "test-2",
  dataTermino: DateTime.fromObject({ year: 2024, month: 12 }),
};

describe("CardExperiencia", () => {
  it("deve renderizar empresa", () => {
    renderComProviders(<CardExperiencia exp={expAtualMock} />);
    expect(screen.getByText("Empresa Teste")).toBeInTheDocument();
  });

  it("deve renderizar cargo e descricao", () => {
    renderComProviders(<CardExperiencia exp={expAtualMock} />);
    expect(screen.getByText("Engenheiro de Software Sr.")).toBeInTheDocument();
    expect(
      screen.getByText("Desenvolvimento de sistemas escaláveis."),
    ).toBeInTheDocument();
  });

  it("deve renderizar badge Atual quando sem dataTermino", () => {
    renderComProviders(<CardExperiencia exp={expAtualMock} />);
    expect(screen.getByText("Atual")).toBeInTheDocument();
  });

  it("nao deve renderizar badge Atual quando tem dataTermino", () => {
    renderComProviders(<CardExperiencia exp={expFinalizadaMock} />);
    expect(screen.queryByText("Atual")).not.toBeInTheDocument();
  });

  it("deve renderizar tecnologias (max 6)", () => {
    renderComProviders(<CardExperiencia exp={expAtualMock} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("deve limitar a 6 tags", () => {
    const exp: ExperienciaProps = {
      ...expAtualMock,
      tecnologias: ["A", "B", "C", "D", "E", "F", "G", "H"],
    };
    renderComProviders(<CardExperiencia exp={exp} />);
    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.queryByText("G")).not.toBeInTheDocument();
  });

  it("deve chamar onVerDetalhes ao clicar em Ver detalhes", () => {
    const onVerDetalhes = vi.fn();
    renderComProviders(
      <CardExperiencia exp={{ ...expAtualMock, onVerDetalhes }} />,
    );
    fireEvent.click(screen.getByText("Ver detalhes"));
    expect(onVerDetalhes).toHaveBeenCalledWith("test-1");
  });

  it("deve ter aria-label com cargo e empresa", () => {
    renderComProviders(<CardExperiencia exp={expAtualMock} />);
    expect(
      screen.getByLabelText("Engenheiro de Software Sr. na Empresa Teste"),
    ).toBeInTheDocument();
  });
});
