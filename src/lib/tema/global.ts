import { defineConfig } from "@chakra-ui/react";
import { cores, tipografia, raio, transicao } from "./tokens";

export const configGlobal = defineConfig({
  globalCss: {
    "html, body": {
      background: cores.bg.base,
      color: cores.texto.corpo,
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
      background: cores.acento.borda,
      color: cores.texto.titulo,
    },

    // Foco visível consistente e sóbrio (acessibilidade)
    "*:focus-visible": {
      outline: `1px solid ${cores.acento.DEFAULT}`,
      outlineOffset: "2px",
    },

    // Scrollbar refinada
    "::-webkit-scrollbar": { width: "10px", height: "10px" },
    "::-webkit-scrollbar-track": { background: cores.bg.base },
    "::-webkit-scrollbar-thumb": {
      background: cores.borda.hover,
      borderRadius: raio.full,
      border: `2px solid ${cores.bg.base}`,
    },
    "::-webkit-scrollbar-thumb:hover": { background: cores.borda.hoverForte },

    ".pular-para-conteudo": {
      position: "absolute",
      top: "-100%",
      left: 0,
      background: cores.texto.titulo,
      color: cores.bg.base,
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
