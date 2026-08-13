import { defineConfig } from "@chakra-ui/react";
import { cores, tipografia, sombras } from "./tokens";

export const configCores = defineConfig({
  theme: {
    tokens: {
      colors: {
        marca: {
          400: { value: cores.primaria.claro },
          500: { value: cores.primaria.hover },
          600: { value: cores.primaria.DEFAULT },
          700: { value: cores.primaria.escuro },
        },
      },
      fonts: {
        body: { value: tipografia.familia.sans },
        heading: { value: tipografia.familia.sans },
      },
      shadows: {
        destaque: { value: sombras.destaque },
        botao: { value: sombras.botao },
        input: { value: sombras.input },
      },
    },

    semanticTokens: {
      colors: {
        "im.fundo": { value: cores.bg.base },
        "im.fundo.sutil": { value: cores.bg.sutil },
        "im.fundo.card": { value: cores.bg.card },
        "im.fundo.elevado": { value: cores.bg.elevado },
        "im.borda": { value: cores.borda.DEFAULT },
        "im.borda.sutil": { value: cores.borda.sutil },
        "im.borda.acento": { value: cores.primaria.borda },
        "im.texto": { value: cores.texto.corpo },
        "im.texto.sutil": { value: cores.texto.sutil },
        "im.titulo": { value: cores.texto.titulo },
        "im.acento": { value: cores.primaria.DEFAULT },
        "im.acento.hover": { value: cores.primaria.hover },
        "im.acento.claro": { value: cores.primaria.claro },
        "im.acento.sutil": { value: cores.primaria.sutil },
      },
    },
  },
});
