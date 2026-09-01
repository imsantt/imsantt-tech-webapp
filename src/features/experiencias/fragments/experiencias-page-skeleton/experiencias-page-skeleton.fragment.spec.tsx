import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { ExperienciasPageSkeleton } from "./experiencias-page-skeleton.fragment";

describe("ExperienciasPageSkeleton", () => {
  it("deve renderizar com role status e aria-label", () => {
    renderComProviders(<ExperienciasPageSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-label", "Carregando experiências...");
  });
});
