import { describe, it, expect, vi, beforeEach } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen } from "@/tests/helpers";
import { ExperienciasTimeline } from "./experiencias-timeline.fragment";
import { useExperiencias } from "@/hooks/use-experiencias/useExperiencias.hook";

vi.mock("@/hooks/use-experiencias/useExperiencias.hook", () => ({
  useExperiencias: vi.fn(),
}));

const useExperienciasMock = vi.mocked(useExperiencias);

const experienciasMock = [
  {
    id: "yduqs",
    empresa: "YDUQS",
    cargo: "Engenheiro de Software",
    dataInicio: DateTime.fromObject({ year: 2023, month: 11 }),
    descricao: "Apoio à liderança técnica.",
    tecnologias: ["NestJS"],
  },
];

describe("ExperienciasTimeline", () => {
  beforeEach(() => {
    useExperienciasMock.mockReset();
  });

  it("deve renderizar as experiencias apos carregar", () => {
    useExperienciasMock.mockReturnValue({
      experiencias: experienciasMock,
      isLoading: false,
      isError: false,
      error: undefined,
    });
    renderComProviders(<ExperienciasTimeline />);
    expect(screen.getByText("YDUQS")).toBeInTheDocument();
    expect(screen.getByText("Engenheiro de Software")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de erro quando isError", () => {
    useExperienciasMock.mockReturnValue({
      experiencias: [],
      isLoading: false,
      isError: true,
      error: undefined,
    });
    renderComProviders(<ExperienciasTimeline />);
    expect(
      screen.getByText("Não foi possível carregar as experiências."),
    ).toBeInTheDocument();
  });

  it("nao deve renderizar experiencias durante o carregamento", () => {
    useExperienciasMock.mockReturnValue({
      experiencias: [],
      isLoading: true,
      isError: false,
      error: undefined,
    });
    renderComProviders(<ExperienciasTimeline />);
    expect(screen.queryByText("YDUQS")).not.toBeInTheDocument();
  });
});
