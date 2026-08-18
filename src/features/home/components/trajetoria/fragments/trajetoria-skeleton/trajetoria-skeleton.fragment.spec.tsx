import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { TrajetoriaSkeleton } from "./trajetoria-skeleton.fragment";

describe("TrajetoriaSkeleton", () => {
  it("deve renderizar com role status", () => {
    renderComProviders(<TrajetoriaSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("deve ter aria-label de carregamento", () => {
    renderComProviders(<TrajetoriaSkeleton />);
    expect(screen.getByLabelText(/carregando trajetória/i)).toBeInTheDocument();
  });
});
