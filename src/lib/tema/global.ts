import { defineConfig } from "@chakra-ui/react";
import { cores, tipografia, raio, transicao } from "./tokens";

export const configGlobal = defineConfig({
  globalCss: {
    body: {
      background: cores.bg.base,
      color: cores.texto.corpo,
      fontFamily: tipografia.familia.sans,
      fontSize: tipografia.tamanho.base,
      lineHeight: String(tipografia.alturaLinha.corpo),
    },

    "#root": {
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
    },

    ".pular-para-conteudo": {
      position: "absolute",
      top: "-100%",
      left: 0,
      background: cores.primaria.DEFAULT,
      color: cores.branco,
      fontSize: tipografia.tamanho.sm,
      fontWeight: String(tipografia.peso.semibold),
      padding: "12px 24px",
      borderRadius: `0 0 ${raio.lg} 0`,
      zIndex: 9999,
      textDecoration: "none",
      transition: transicao.rapida,
      "&:focus": { top: 0 },
    },

    "@keyframes spin": {
      to: { transform: "rotate(360deg)" },
    },
  },
});
