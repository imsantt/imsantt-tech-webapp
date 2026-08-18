import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { HabilidadesSkeleton } from "./habilidades-skeleton.fragment";

describe("HabilidadesSkeleton", () => {
  it("deve renderizar com role status", () => {
    renderComProviders(<HabilidadesSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("deve ter aria-label de carregamento", () => {
    renderComProviders(<HabilidadesSkeleton />);
    expect(
      screen.getByLabelText(/carregando habilidades/i),
    ).toBeInTheDocument();
  });
});
