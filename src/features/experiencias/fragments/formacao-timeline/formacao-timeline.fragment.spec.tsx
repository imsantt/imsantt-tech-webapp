import { describe, it, expect, vi, beforeEach } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen } from "@/tests/helpers";
import { FormacaoTimeline } from "./formacao-timeline.fragment";
import { useFormacao } from "@/hooks/use-formacao/useFormacao.hook";

vi.mock("@/hooks/use-formacao/useFormacao.hook", () => ({
  useFormacao: vi.fn(),
}));

const useFormacaoMock = vi.mocked(useFormacao);

const formacoesMock = [
  {
    id: "estacio-mtech",
    instituicao: "Estácio",
    curso: "Master of Technology (MTech)",
    area: "Análise e Desenvolvimento de Sistemas",
    grau: "mestrado" as const,
    dataInicio: DateTime.fromObject({ year: 2019, month: 1 }),
    dataTermino: DateTime.fromObject({ year: 2021, month: 12 }),
  },
];

describe("FormacaoTimeline", () => {
  beforeEach(() => {
    useFormacaoMock.mockReset();
  });

  it("deve renderizar o titulo da secao", () => {
    useFormacaoMock.mockReturnValue({
      formacoes: formacoesMock,
      isLoading: false,
      isError: false,
      error: undefined,
    });
    renderComProviders(<FormacaoTimeline />);
    expect(screen.getByText("Base Acadêmica")).toBeInTheDocument();
  });

  it("deve renderizar as formacoes apos carregar", () => {
    useFormacaoMock.mockReturnValue({
      formacoes: formacoesMock,
      isLoading: false,
      isError: false,
      error: undefined,
    });
    renderComProviders(<FormacaoTimeline />);
    expect(screen.getByText("Master of Technology (MTech)")).toBeInTheDocument();
    expect(screen.getByText("Estácio")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de erro quando isError", () => {
    useFormacaoMock.mockReturnValue({
      formacoes: [],
      isLoading: false,
      isError: true,
      error: undefined,
    });
    renderComProviders(<FormacaoTimeline />);
    expect(
      screen.getByText("Não foi possível carregar a formação acadêmica."),
    ).toBeInTheDocument();
  });
});
