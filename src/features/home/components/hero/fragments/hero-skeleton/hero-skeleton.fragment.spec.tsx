import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { HeroSkeleton } from "./hero-skeleton.fragment";

describe("HeroSkeleton", () => {
  it("deve renderizar com role status", () => {
    renderComProviders(<HeroSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("deve ter aria-label de carregamento", () => {
    renderComProviders(<HeroSkeleton />);
    expect(screen.getByLabelText(/carregando hero/i)).toBeInTheDocument();
  });
});
