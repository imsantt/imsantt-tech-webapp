import "@testing-library/jest-dom/vitest";

// Silencia erros de CSS parsing do jsdom (não suporta @layer do Chakra UI v3)
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === "string" ? args[0] : "";
  if (msg.includes("Could not parse CSS stylesheet")) return;
  originalConsoleError(...args);
};
