import { describe, it, expect } from "vitest";
import { renderComProviders, screen } from "@/tests/helpers";
import { MetaChip } from "./meta-chip.fragment";

describe("MetaChip", () => {
  it("deve renderizar o conteudo textual", () => {
    renderComProviders(<MetaChip>Bancário</MetaChip>);
    expect(screen.getByText("Bancário")).toBeInTheDocument();
  });
});
