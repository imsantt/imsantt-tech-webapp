import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { ContatoError } from "./contato-error.fragment";

describe("ContatoError", () => {
  it("deve renderizar mensagem de erro", () => {
    renderComProviders(<ContatoError />);
    expect(screen.getByText("Erro ao carregar contato")).toBeInTheDocument();
  });

  it("deve renderizar texto de instrucao", () => {
    renderComProviders(<ContatoError />);
    expect(screen.getByText(/tente recarregar a página/i)).toBeInTheDocument();
  });
});
