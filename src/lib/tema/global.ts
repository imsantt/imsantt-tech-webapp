import { defineConfig } from "@chakra-ui/react";
import { cores, tipografia, raio, transicao } from "./tokens";

export const configGlobal = defineConfig({
  globalCss: {
    "html, body": {
      background: cores.background.base,
      color: cores.text.body,
      fontFamily: tipografia.familia.sans,
      fontSize: tipografia.tamanho.base,
      lineHeight: String(tipografia.alturaLinha.corpo),
      textRendering: "optimizeLegibility",
      fontFeatureSettings: "'ss01', 'cv11', 'tnum'",
    },

    "#root": {
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
    },

    // Seleção de texto — acento discreto em vez do azul padrão
    "::selection": {
      background: cores.accent.border,
      color: cores.text.heading,
    },

    // Foco visível consistente e sóbrio (acessibilidade)
    "*:focus-visible": {
      outline: `1px solid ${cores.accent.DEFAULT}`,
      outlineOffset: "2px",
    },

    // Scrollbar refinada
    "::-webkit-scrollbar": { width: "10px", height: "10px" },
    "::-webkit-scrollbar-track": { background: cores.background.base },
    "::-webkit-scrollbar-thumb": {
      background: cores.border.hover,
      borderRadius: raio.full,
      border: `2px solid ${cores.background.base}`,
    },
    "::-webkit-scrollbar-thumb:hover": { background: cores.border.hoverStrong },

    ".pular-para-conteudo": {
      position: "absolute",
      top: "-100%",
      left: 0,
      background: cores.text.heading,
      color: cores.background.base,
      fontFamily: tipografia.familia.mono,
      fontSize: tipografia.tamanho.xs,
      fontWeight: String(tipografia.peso.medium),
      letterSpacing: tipografia.tracking.label,
      textTransform: "uppercase",
      padding: "12px 24px",
      borderRadius: `0 0 ${raio.md} 0`,
      zIndex: 9999,
      textDecoration: "none",
      transition: transicao.rapida,
      "&:focus": { top: 0 },
    },
  },
});
