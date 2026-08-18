import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { ContatoSkeleton } from "./contato-skeleton.fragment";

describe("ContatoSkeleton", () => {
  it("deve renderizar com role status", () => {
    renderComProviders(<ContatoSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("deve ter aria-label de carregamento", () => {
    renderComProviders(<ContatoSkeleton />);
    expect(screen.getByLabelText(/carregando contato/i)).toBeInTheDocument();
  });
});
