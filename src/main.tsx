import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { sistema } from "./lib/tema";
import App from "./App.tsx";

// Força dark mode no atributo HTML — Chakra v3 lê data-theme para aplicar tokens
document.documentElement.setAttribute("data-theme", "dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={sistema}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
);
