import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { sistema } from "../lib/tema";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <ChakraProvider value={sistema}>{children}</ChakraProvider>
    </MemoryRouter>
  );
}

export function renderComProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: Providers, ...options });
}

export { screen, fireEvent, waitFor } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
