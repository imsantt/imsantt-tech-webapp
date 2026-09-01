/**
 * Design System — Tokens centralizados
 * Fonte única de verdade para cores, tipografia, espaçamentos, raios e sombras.
 * Importar em qualquer componente: import { tokens } from "@/lib/tema/tokens"
 *
 * Linguagem visual: "Editorial Tech Minimalism".
 * Paleta quase monocromática (tinta profunda), bordas em fio de cabelo,
 * um único acento disciplinado e um sistema tipográfico mono para metadados.
 * Sem glows radiais, gradientes de texto ou ornamentos genéricos.
 */
export const tokens = {
  // ─── Cores ───────────────────────────────────────────────────────────────────

  cores: {
    // Primária (acento único — usado com parcimônia)
    primaria: {
      DEFAULT: "#e4e4e7",
      hover: "#ffffff",
      claro: "#fafafa",
      escuro: "#a1a1aa",
      sutil: "rgba(255, 255, 255, 0.04)",
      borda: "rgba(255, 255, 255, 0.14)",
      bordaForte: "rgba(255, 255, 255, 0.28)",
    },

    // Acento de sinalização (link/foco/estado ativo) — âmbar frio, discreto
    acento: {
      DEFAULT: "#c8b68f",
      hover: "#dccca6",
      claro: "#e8dcc0",
      sutil: "rgba(200, 182, 143, 0.08)",
      borda: "rgba(200, 182, 143, 0.28)",
    },

    // Secundária (ações alternativas / acentos complementares)
    secundaria: {
      DEFAULT: "#a1a1aa",
      hover: "#d4d4d8",
      claro: "#e4e4e7",
      sutil: "rgba(161, 161, 170, 0.1)",
    },

    // Sucesso
    sucesso: {
      DEFAULT: "#34d399",
      claro: "#6ee7b7",
      sutil: "rgba(52, 211, 153, 0.12)",
    },

    // Alerta
    alerta: {
      DEFAULT: "#d4b062",
      claro: "#e5c983",
      sutil: "rgba(212, 176, 98, 0.12)",
    },

    // Erro
    erro: {
      DEFAULT: "#e5675f",
      claro: "#f0938c",
      sutil: "rgba(229, 103, 95, 0.12)",
    },

    // Info
    info: {
      DEFAULT: "#7aa2c4",
      claro: "#a3c2dc",
      sutil: "rgba(122, 162, 196, 0.12)",
    },

    // Background (camadas de profundidade — tinta neutra fria)
    bg: {
      base: "#0b0b0c",
      sutil: "#0f0f11",
      card: "#141416",
      elevado: "#1a1a1d",
      overlay: "rgba(11, 11, 12, 0.72)",
      overlayForte: "rgba(11, 11, 12, 0.96)",
    },

    // Texto
    texto: {
      titulo: "#fafafa",
      corpo: "#a1a1aa",
      sutil: "rgba(161, 161, 170, 0.55)",
      invertido: "#0b0b0c",
    },

    // Bordas — fio de cabelo, quase invisíveis em repouso
    borda: {
      DEFAULT: "rgba(255, 255, 255, 0.09)",
      sutil: "rgba(255, 255, 255, 0.05)",
      hover: "rgba(255, 255, 255, 0.18)",
      hoverForte: "rgba(255, 255, 255, 0.3)",
    },

    // Neutros (auxiliares)
    branco: "#ffffff",
    preto: "#000000",
    transparente: "transparent",

    // ─── Acentos por categoria ──────────────────────────────────────────────
    // Tons dessaturados e sóbrios — cor como sinal, não como preenchimento.
    // Cada categoria expõe: base (ícone/tag/texto), fundo (chip), borda e glow.
    categoria: {
      violeta: {
        base: "#a99be0",
        fundo: "rgba(139, 122, 214, 0.08)",
        borda: "rgba(139, 122, 214, 0.24)",
        glow: "rgba(139, 122, 214, 0.14)",
      },
      esmeralda: {
        base: "#7fc9a6",
        fundo: "rgba(88, 178, 138, 0.08)",
        borda: "rgba(88, 178, 138, 0.24)",
        glow: "rgba(88, 178, 138, 0.14)",
      },
      ciano: {
        base: "#7bbcca",
        fundo: "rgba(92, 168, 184, 0.08)",
        borda: "rgba(92, 168, 184, 0.24)",
        glow: "rgba(92, 168, 184, 0.14)",
      },
      ambar: {
        base: "#d3b483",
        fundo: "rgba(200, 165, 110, 0.08)",
        borda: "rgba(200, 165, 110, 0.26)",
        glow: "rgba(200, 165, 110, 0.16)",
      },
      dourado: {
        base: "#cdbd7c",
        fundo: "rgba(191, 170, 95, 0.08)",
        borda: "rgba(191, 170, 95, 0.24)",
        glow: "rgba(191, 170, 95, 0.14)",
      },
      rosa: {
        base: "#d69ba0",
        fundo: "rgba(198, 122, 130, 0.08)",
        borda: "rgba(198, 122, 130, 0.24)",
        glow: "rgba(198, 122, 130, 0.14)",
      },
    },
  },

  // ─── Tipografia ──────────────────────────────────────────────────────────────

  tipografia: {
    familia: {
      sans: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
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
      titulo: 1.1,
      corpo: 1.6,
      relaxada: 1.75,
    },
    // Espaçamento entre letras para eyebrows/labels técnicos
    tracking: {
      normal: "0",
      titulo: "-0.02em",
      tituloAmplo: "-0.03em",
      label: "0.18em",
      labelAmplo: "0.28em",
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

  // ─── Raios de borda — cantos contidos, arquitetônicos ────────────────────────

  raio: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.1875rem", // 3px
    lg: "0.25rem", // 4px
    xl: "0.375rem", // 6px
    "2xl": "0.5rem", // 8px
    "3xl": "0.75rem", // 12px
    full: "9999px",
  },

  // ─── Sombras — profundidade sóbria, sem glow colorido ────────────────────────

  sombras: {
    card: "0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.24)",
    destaque:
      "0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 12px 40px rgba(0, 0, 0, 0.5)",
    destaqueForte:
      "0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 20px 60px rgba(0, 0, 0, 0.6)",
    botao: "0 1px 2px rgba(0, 0, 0, 0.5)",
    botaoForte: "0 2px 8px rgba(0, 0, 0, 0.55)",
    input: "0 0 0 1px rgba(200, 182, 143, 0.35)",
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
    rapida: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
    padrao: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    lenta: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    cor: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
    transformar: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
    elevacao:
      "background 0.25s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.25s ease",
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
      descricaoMaxLinhas: 4,
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
