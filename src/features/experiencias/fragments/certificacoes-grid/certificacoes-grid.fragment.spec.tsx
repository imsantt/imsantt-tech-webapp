import { describe, it, expect, vi, beforeEach } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { CertificacoesGrid } from "./certificacoes-grid.fragment";
import { useCertificacoes } from "@/hooks/use-certificacoes/useCertificacoes.hook";

vi.mock("@/hooks/use-certificacoes/useCertificacoes.hook", () => ({
  useCertificacoes: vi.fn(),
}));

const useCertificacoesMock = vi.mocked(useCertificacoes);

const certificacoesMock = [
  {
    id: "aws-1",
    titulo: "AWS Cloud Practitioner",
    instituicao: "Amazon Web Services (AWS)",
    categoria: "cloud" as const,
    emitidaEm: DateTime.fromObject({ year: 2026, month: 6 }),
  },
  {
    id: "ia-1",
    titulo: "Prompt Engineering",
    instituicao: "FIAP",
    categoria: "ia" as const,
    emitidaEm: DateTime.fromObject({ year: 2026, month: 4 }),
  },
];

describe("CertificacoesGrid", () => {
  beforeEach(() => {
    useCertificacoesMock.mockReset();
    useCertificacoesMock.mockReturnValue({
      certificacoes: certificacoesMock,
      isLoading: false,
      isError: false,
      error: undefined,
    });
  });

  it("deve renderizar todas as certificacoes por padrao", () => {
    renderComProviders(<CertificacoesGrid />);
    expect(screen.getByText("AWS Cloud Practitioner")).toBeInTheDocument();
    expect(screen.getByText("Prompt Engineering")).toBeInTheDocument();
  });

  it("deve exibir contagem total de certificacoes", () => {
    renderComProviders(<CertificacoesGrid />);
    expect(screen.getByText("2 certificações")).toBeInTheDocument();
  });

  it("deve filtrar por categoria ao clicar no chip", () => {
    renderComProviders(<CertificacoesGrid />);

    // Filtra por Inteligência Artificial
    fireEvent.click(
      screen.getByRole("button", { name: /Inteligência Artificial/i }),
    );
    expect(screen.getByText("Prompt Engineering")).toBeInTheDocument();
    expect(
      screen.queryByText("AWS Cloud Practitioner"),
    ).not.toBeInTheDocument();
  });

  it("deve voltar a exibir todas ao clicar em Todas", () => {
    renderComProviders(<CertificacoesGrid />);
    fireEvent.click(
      screen.getByRole("button", { name: /Inteligência Artificial/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Todas/i }));
    expect(screen.getByText("AWS Cloud Practitioner")).toBeInTheDocument();
    expect(screen.getByText("Prompt Engineering")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de erro quando isError", () => {
    useCertificacoesMock.mockReturnValue({
      certificacoes: [],
      isLoading: false,
      isError: true,
      error: undefined,
    });
    renderComProviders(<CertificacoesGrid />);
    expect(
      screen.getByText("Não foi possível carregar os cursos e certificações."),
    ).toBeInTheDocument();
  });
});
