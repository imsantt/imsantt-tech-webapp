import { defineConfig } from "@chakra-ui/react";

export const configCores = defineConfig({
  theme: {
    tokens: {
      colors: {
        marca: {
          400: { value: "#a855f7" },
          500: { value: "#9333ea" },
          600: { value: "#7c3aed" },
        },
      },
      fonts: {
        body: { value: "'Inter', system-ui, sans-serif" },
        heading: { value: "'Inter', system-ui, sans-serif" },
      },
      shadows: {
        destaque: { value: "0 0 40px rgba(124, 58, 237, 0.15)" },
        botao: { value: "0 8px 30px rgba(124, 58, 237, 0.4)" },
      },
    },

    semanticTokens: {
      colors: {
        // Nomes únicos com prefixo "im" para não colidir com defaultConfig
        "im.fundo": { value: "#0a0a0f" },
        "im.fundo.sutil": { value: "#111118" },
        "im.fundo.card": { value: "#16161f" },
        "im.borda": { value: "#2a2a3a" },
        "im.borda.acento": { value: "rgba(124, 58, 237, 0.4)" },
        "im.texto": { value: "#9ca3af" },
        "im.titulo": { value: "#f3f4f6" },
        "im.acento": { value: "#7c3aed" },
        "im.acento.hover": { value: "#9333ea" },
        "im.acento.sutil": { value: "rgba(124, 58, 237, 0.1)" },
        "im.acento.fg": { value: "#a855f7" },
        "im.texto.sutil": { value: "rgba(156, 163, 175, 0.6)" },
      },
    },
  },
});
