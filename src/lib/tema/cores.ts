import { defineConfig } from "@chakra-ui/react";
import { cores, tipografia, sombras } from "./tokens";

export const configCores = defineConfig({
  theme: {
    tokens: {
      colors: {
        marca: {
          400: { value: cores.accent.light },
          500: { value: cores.accent.hover },
          600: { value: cores.accent.DEFAULT },
          700: { value: cores.primary.dark },
        },
      },
      fonts: {
        body: { value: tipografia.familia.sans },
        heading: { value: tipografia.familia.sans },
        mono: { value: tipografia.familia.mono },
      },
      shadows: {
        destaque: { value: sombras.destaque },
        botao: { value: sombras.botao },
        input: { value: sombras.input },
      },
    },

    semanticTokens: {
      colors: {
        "im.bg": { value: cores.background.base },
        "im.bg.subtle": { value: cores.background.subtle },
        "im.bg.card": { value: cores.background.card },
        "im.bg.elevated": { value: cores.background.elevated },
        "im.border": { value: cores.border.DEFAULT },
        "im.border.subtle": { value: cores.border.subtle },
        "im.border.accent": { value: cores.accent.border },
        "im.text": { value: cores.text.body },
        "im.text.subtle": { value: cores.text.subtle },
        "im.heading": { value: cores.text.heading },
        // "primary" = ênfase neutra clara (texto/branco)
        "im.primary": { value: cores.primary.DEFAULT },
        "im.primary.hover": { value: cores.primary.hover },
        "im.primary.light": { value: cores.primary.light },
        "im.primary.subtle": { value: cores.primary.subtle },
        // "accent" = acento âmbar frio de sinalização (links, foco, estado ativo)
        "im.accent": { value: cores.accent.DEFAULT },
        "im.accent.hover": { value: cores.accent.hover },
        "im.accent.light": { value: cores.accent.light },
        "im.accent.subtle": { value: cores.accent.subtle },
      },
    },
  },
});
