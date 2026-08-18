import "./instrument"; // ← Sentry MUST be first import

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { reactErrorHandler } from "@sentry/react";
import { sistema } from "./lib/tema";
import "./index.css";
import App from "./App.tsx";

// Força dark mode no atributo HTML — Chakra v3 lê data-theme para aplicar tokens
document.documentElement.setAttribute("data-theme", "dark");

createRoot(document.getElementById("root")!, {
  // React 19 error handlers — envia erros ao Sentry automaticamente
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
}).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={sistema}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
);
