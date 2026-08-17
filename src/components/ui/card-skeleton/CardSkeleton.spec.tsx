import { describe, it, expect } from "vitest";
import { renderComProviders } from "@/tests/helpers";
import { CardSkeleton } from "./CardSkeleton";

describe("CardSkeleton", () => {
  it("deve renderizar sem erros", () => {
    const { container } = renderComProviders(<CardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve manter a mesma altura do card real", () => {
    const { container } = renderComProviders(<CardSkeleton />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ height: "23.75rem" });
  });
});
