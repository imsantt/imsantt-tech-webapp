/**
 * Design System — Tokens centralizados
 * Fonte única de verdade para cores, tipografia, espaçamentos, raios e sombras.
 * Importar em qualquer componente: import { tokens } from "@/lib/tema/tokens"
 */
export const tokens = {
  // ─── Cores ───────────────────────────────────────────────────────────────────

  cores: {
    // Primária (marca / ações principais)
    primaria: {
      DEFAULT: "#7c3aed",
      hover: "#9333ea",
      claro: "#a855f7",
      escuro: "#6d28d9",
      sutil: "rgba(124, 58, 237, 0.1)",
      borda: "rgba(124, 58, 237, 0.35)",
      bordaForte: "rgba(124, 58, 237, 0.6)",
    },

    // Secundária (ações alternativas / acentos complementares)
    secundaria: {
      DEFAULT: "#818cf8",
      hover: "#6366f1",
      claro: "#a5b4fc",
      sutil: "rgba(99, 102, 241, 0.15)",
    },

    // Sucesso
    sucesso: {
      DEFAULT: "#22c55e",
      claro: "#4ade80",
      sutil: "rgba(34, 197, 94, 0.15)",
    },

    // Alerta
    alerta: {
      DEFAULT: "#eab308",
      claro: "#facc15",
      sutil: "rgba(234, 179, 8, 0.15)",
    },

    // Erro
    erro: {
      DEFAULT: "#ef4444",
      claro: "#f87171",
      sutil: "rgba(239, 68, 68, 0.15)",
    },

    // Info
    info: {
      DEFAULT: "#06b6d4",
      claro: "#22d3ee",
      sutil: "rgba(6, 182, 212, 0.15)",
    },

    // Background (camadas de profundidade)
    bg: {
      base: "#0a0a0f",
      sutil: "#111118",
      card: "#16161f",
      elevado: "#1e1e2a",
      overlay: "rgba(10, 10, 15, 0.88)",
      overlayForte: "rgba(10, 10, 15, 0.97)",
    },

    // Texto
    texto: {
      titulo: "#f3f4f6",
      corpo: "#9ca3af",
      sutil: "rgba(156, 163, 175, 0.6)",
      invertido: "#0a0a0f",
    },

    // Bordas
    borda: {
      DEFAULT: "#2a2a3a",
      sutil: "#1e1e2e",
      hover: "rgba(255, 255, 255, 0.2)",
      hoverForte: "rgba(255, 255, 255, 0.35)",
    },

    // Neutros (auxiliares)
    branco: "#ffffff",
    preto: "#000000",
    transparente: "transparent",
  },

  // ─── Tipografia ──────────────────────────────────────────────────────────────

  tipografia: {
    familia: {
      sans: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    tamanho: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      md: "1.0625rem", // 17px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
      "8xl": "6rem", // 96px
    },
    peso: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    alturaLinha: {
      apertada: 1.0,
      titulo: 1.2,
      corpo: 1.6,
      relaxada: 1.7,
    },
  },

  // ─── Espaçamento (rem — base 16px) ──────────────────────────────────────────

  espacamento: {
    px: "1px",
    "0.5": "0.125rem", // 2px
    "1": "0.25rem", // 4px
    "1.5": "0.375rem", // 6px
    "2": "0.5rem", // 8px
    "2.5": "0.625rem", // 10px
    "3": "0.75rem", // 12px
    "3.5": "0.875rem", // 14px
    "4": "1rem", // 16px
    "5": "1.25rem", // 20px
    "6": "1.5rem", // 24px
    "7": "1.75rem", // 28px
    "8": "2rem", // 32px
    "9": "2.25rem", // 36px
    "10": "2.5rem", // 40px
    "12": "3rem", // 48px
    "14": "3.5rem", // 56px
    "16": "4rem", // 64px
    "20": "5rem", // 80px
    "24": "6rem", // 96px
    "28": "7rem", // 112px
    "32": "8rem", // 128px
    // Escalas grandes para seções/hero
    "xl-res": "10rem", // 160px
    "2xl-res": "12rem", // 192px
    "3xl-res": "16rem", // 256px
    "4xl-res": "20rem", // 320px
  },

  // ─── Raios de borda ──────────────────────────────────────────────────────────

  raio: {
    none: "0",
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.25rem", // 20px
    full: "9999px",
  },

  // ─── Sombras ─────────────────────────────────────────────────────────────────

  sombras: {
    card: "0 4px 24px rgba(0, 0, 0, 0.4)",
    destaque: "0 0 40px rgba(124, 58, 237, 0.15)",
    destaqueForte: "0 0 40px rgba(124, 58, 237, 0.25)",
    botao: "0 8px 30px rgba(124, 58, 237, 0.4)",
    botaoForte: "0 8px 30px rgba(124, 58, 237, 0.45)",
    input: "0 0 0 3px rgba(124, 58, 237, 0.15)",
  },

  // ─── Breakpoints ─────────────────────────────────────────────────────────────

  breakpoints: {
    sm: "30rem", // 480px
    md: "48rem", // 768px
    lg: "56.25rem", // 900px
    xl: "75rem", // 1200px
    "2xl": "90rem", // 1440px
  },

  // ─── Transições ──────────────────────────────────────────────────────────────

  transicao: {
    rapida: "all 0.15s ease",
    padrao: "all 0.2s ease",
    lenta: "all 0.3s ease",
    cor: "background 0.2s, color 0.2s",
    transformar: "transform 0.2s ease",
    elevacao: "background 0.2s, transform 0.2s, box-shadow 0.2s",
  },

  // ─── Layout ──────────────────────────────────────────────────────────────────

  layout: {
    maxWidth: "75rem", // 1200px
    maxWidthEstrito: "42.5rem", // 680px
    navbarAltura: "4.5rem", // 72px
    navbarAlturaMenor: "3.5rem", // 56px
  },

  // ─── Componentes (constantes de UI reutilizáveis) ────────────────────────────

  componentes: {
    card: {
      altura: "23.75rem", // 380px
      tituloMinAltura: "2.6em",
      descricaoMaxChars: 750,
      descricaoMaxLinhas: 5,
      tituloMaxLinhas: 2,
      maxTags: 6,
    },
  },
} as const;

/** Atalhos para tokens mais usados */
export const {
  cores,
  tipografia,
  espacamento,
  raio,
  sombras,
  transicao,
  layout,
  componentes,
} = tokens;
