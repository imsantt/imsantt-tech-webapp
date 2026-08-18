import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { HabilidadesPageSkeleton } from "./habilidades-page-skeleton.fragment";

describe("HabilidadesPageSkeleton", () => {
  it("deve renderizar com role status", () => {
    renderComProviders(<HabilidadesPageSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("deve ter aria-label de carregamento", () => {
    renderComProviders(<HabilidadesPageSkeleton />);
    expect(
      screen.getByLabelText(/carregando habilidades/i),
    ).toBeInTheDocument();
  });
});
