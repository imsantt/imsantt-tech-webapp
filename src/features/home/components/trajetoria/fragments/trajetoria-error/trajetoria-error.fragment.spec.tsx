import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { TrajetoriaError } from "./trajetoria-error.fragment";

describe("TrajetoriaError", () => {
  it("deve renderizar mensagem de erro", () => {
    renderComProviders(<TrajetoriaError />);
    expect(screen.getByText("Erro ao carregar trajetória")).toBeInTheDocument();
  });

  it("deve renderizar texto de instrucao", () => {
    renderComProviders(<TrajetoriaError />);
    expect(screen.getByText(/tente recarregar a página/i)).toBeInTheDocument();
  });
});
