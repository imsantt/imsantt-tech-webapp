import { defineConfig } from "@chakra-ui/react";

export const configGlobal = defineConfig({
  globalCss: {
    body: {
      background: "#0a0a0f",
      color: "#9ca3af",
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: "16px",
      lineHeight: "1.6",
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
      background: "#7c3aed",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      padding: "12px 24px",
      borderRadius: "0 0 8px 0",
      zIndex: 9999,
      textDecoration: "none",
      transition: "top 0.2s",
      "&:focus": { top: 0 },
    },
  },
});
