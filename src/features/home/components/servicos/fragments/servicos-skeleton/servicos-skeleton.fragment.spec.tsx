import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { ServicosSkeleton } from "./servicos-skeleton.fragment";

describe("ServicosSkeleton", () => {
  it("deve renderizar com role status e aria-label", () => {
    renderComProviders(<ServicosSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-label", "Carregando serviços...");
  });
});
