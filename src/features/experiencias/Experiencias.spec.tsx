import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { Experiencias } from "./Experiencias";

// Mock das seções para isolar o comportamento das abas
vi.mock(
  "./fragments/experiencias-timeline/experiencias-timeline.fragment",
  () => ({
    ExperienciasTimeline: () => <div>SECAO_PROFISSIONAL</div>,
  }),
);
vi.mock("./fragments/formacao-timeline/formacao-timeline.fragment", () => ({
  FormacaoTimeline: () => <div>SECAO_ACADEMICA</div>,
}));
vi.mock("./fragments/certificacoes-grid/certificacoes-grid.fragment", () => ({
  CertificacoesGrid: () => <div>SECAO_CERTIFICACOES</div>,
}));

describe("Experiencias (página com abas)", () => {
  it("deve renderizar o titulo da pagina", () => {
    renderComProviders(<Experiencias />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Trajetória & Formação" }),
    ).toBeInTheDocument();
  });

  it("deve renderizar as tres abas", () => {
    renderComProviders(<Experiencias />);
    expect(
      screen.getByRole("tab", { name: /Experiência Profissional/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Formação Acadêmica/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Cursos & Certificações/i }),
    ).toBeInTheDocument();
  });

  it("deve iniciar na aba profissional", () => {
    renderComProviders(<Experiencias />);
    expect(screen.getByText("SECAO_PROFISSIONAL")).toBeInTheDocument();
    expect(screen.queryByText("SECAO_ACADEMICA")).not.toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Experiência Profissional/i }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("deve trocar para a aba academica ao clicar", () => {
    renderComProviders(<Experiencias />);
    fireEvent.click(screen.getByRole("tab", { name: /Formação Acadêmica/i }));
    expect(screen.getByText("SECAO_ACADEMICA")).toBeInTheDocument();
    expect(screen.queryByText("SECAO_PROFISSIONAL")).not.toBeInTheDocument();
  });

  it("deve trocar para a aba de certificacoes ao clicar", () => {
    renderComProviders(<Experiencias />);
    fireEvent.click(
      screen.getByRole("tab", { name: /Cursos & Certificações/i }),
    );
    expect(screen.getByText("SECAO_CERTIFICACOES")).toBeInTheDocument();
    expect(screen.queryByText("SECAO_PROFISSIONAL")).not.toBeInTheDocument();
  });

  it("deve marcar a aba clicada como selecionada", () => {
    renderComProviders(<Experiencias />);
    const abaAcademica = screen.getByRole("tab", {
      name: /Formação Acadêmica/i,
    });
    fireEvent.click(abaAcademica);
    expect(abaAcademica).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tab", { name: /Experiência Profissional/i }),
    ).toHaveAttribute("aria-selected", "false");
  });
});
