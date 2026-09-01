import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { renderComProviders, screen } from "@/tests/helpers";
import type { Certificacao } from "@/types/certificacao";
import { CardCertificacao } from "./card-certificacao.fragment";

const certBase: Certificacao = {
  id: "c-1",
  titulo: "AWS Cloud Practitioner",
  instituicao: "Amazon Web Services (AWS)",
  categoria: "cloud",
  emitidaEm: DateTime.fromObject({ year: 2026, month: 6 }),
  competencias: ["AWS Lambda", "Amazon S3"],
};

describe("CardCertificacao", () => {
  it("deve renderizar titulo e instituicao", () => {
    renderComProviders(<CardCertificacao cert={certBase} />);
    expect(screen.getByText("AWS Cloud Practitioner")).toBeInTheDocument();
    expect(screen.getByText("Amazon Web Services (AWS)")).toBeInTheDocument();
  });

  it("deve renderizar o rotulo da categoria", () => {
    renderComProviders(<CardCertificacao cert={certBase} />);
    expect(screen.getByText("Cloud & AWS")).toBeInTheDocument();
  });

  it("deve renderizar competencias", () => {
    renderComProviders(<CardCertificacao cert={certBase} />);
    expect(screen.getByText("AWS Lambda")).toBeInTheDocument();
    expect(screen.getByText("Amazon S3")).toBeInTheDocument();
  });

  it("deve renderizar link de credencial quando disponivel", () => {
    const cert: Certificacao = {
      ...certBase,
      credencialUrl: "https://exemplo.com/cred",
    };
    renderComProviders(<CardCertificacao cert={cert} />);
    const link = screen.getByRole("link", { name: /Exibir credencial/i });
    expect(link).toHaveAttribute("href", "https://exemplo.com/cred");
  });

  it("nao deve renderizar link de credencial quando ausente", () => {
    renderComProviders(<CardCertificacao cert={certBase} />);
    expect(
      screen.queryByRole("link", { name: /Exibir credencial/i }),
    ).not.toBeInTheDocument();
  });
});
