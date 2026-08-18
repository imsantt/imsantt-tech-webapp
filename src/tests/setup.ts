import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock do Sentry para evitar inicialização nos testes
vi.mock("@sentry/react", () => ({
  init: vi.fn(),
  browserTracingIntegration: vi.fn(() => ({})),
  replayIntegration: vi.fn(() => ({})),
  reactRouterV7BrowserTracingIntegration: vi.fn(() => ({})),
  reactErrorHandler: vi.fn(() => vi.fn()),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  withScope: vi.fn(),
}));

// Mock do lazyComRetry para usar lazy() padrão nos testes (evita reload loop)
vi.mock("@/lib/lazy-com-retry", async () => {
  const { lazy } = await import("react");
  return {
    lazyComRetry: <T>(importFn: () => Promise<{ default: T }>) =>
      lazy(
        importFn as () => Promise<{ default: React.ComponentType<unknown> }>,
      ),
  };
});

// Silencia erros de CSS parsing do jsdom (não suporta @layer do Chakra UI v3)
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === "string" ? args[0] : "";
  if (msg.includes("Could not parse CSS stylesheet")) return;
  originalConsoleError(...args);
};
