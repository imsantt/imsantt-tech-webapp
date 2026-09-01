import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { ServicosError } from "./servicos-error.fragment";

describe("ServicosError", () => {
  it("deve renderizar a mensagem de erro", () => {
    renderComProviders(<ServicosError />);
    expect(screen.getByText("Erro ao carregar serviços")).toBeInTheDocument();
  });
});
