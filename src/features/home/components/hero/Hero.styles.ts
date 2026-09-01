import type { SystemStyleObject } from "@chakra-ui/react";
import { cores, raio, sombras, tipografia, transicao } from "@/lib/tema/tokens";

/* ─── Seção ──────────────────────────────────────────────────────────────── */

export const secao: SystemStyleObject = {
  minH: "100svh",
  display: "flex",
  alignItems: "center",
  px: { base: "6", md: "12", lg: "24" },
  bg: cores.background.base,
  position: "relative",
  overflow: "hidden",
};

/** Grade estrutural sutil ao fundo (sem glow). */
export const gradeFundo: SystemStyleObject = {
  position: "absolute",
  inset: "0",
  pointerEvents: "none",
  backgroundImage: `linear-gradient(${cores.border.subtle} 1px, transparent 1px), linear-gradient(90deg, ${cores.border.subtle} 1px, transparent 1px)`,
  backgroundSize: "72px 72px",
  opacity: 0.6,
  maskImage:
    "radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 100%)",
};

export const grid: SystemStyleObject = {
  w: "full",
  gridTemplateColumns: { base: "1fr", md: "1.15fr 0.85fr" },
  alignItems: "center",
  gap: { base: "14", md: "16" },
  pt: { base: "28", md: "24" },
  pb: { base: "16", md: "24" },
  position: "relative",
  zIndex: 1,
};

/* ─── Texto ──────────────────────────────────────────────────────────────── */

export const eyebrowTraco: SystemStyleObject = {
  w: "28px",
  h: "1px",
  bg: cores.accent.DEFAULT,
  flexShrink: 0,
};

export const eyebrowTexto: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: tipografia.peso.medium,
  letterSpacing: tipografia.tracking.label,
  textTransform: "uppercase",
  color: cores.accent.light,
};

export const titulo: SystemStyleObject = {
  fontSize: { base: "5xl", md: "6xl", lg: "7xl" },
  fontWeight: tipografia.peso.light,
  letterSpacing: tipografia.tracking.tituloAmplo,
  lineHeight: String(tipografia.alturaLinha.apertada),
  color: cores.text.heading,
};

export const tituloTraco: SystemStyleObject = {
  display: "block",
  w: "64px",
  h: "2px",
  mt: "6",
  bg: cores.accent.DEFAULT,
};

export const papel: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "sm",
  letterSpacing: "0.02em",
  color: cores.text.body,
};

export const descricao: SystemStyleObject = {
  fontSize: "md",
  textAlign: "justify",
  lineHeight: String(tipografia.alturaLinha.relaxada),
  color: cores.text.body,
  maxW: "52ch",
};

/* ─── Métricas ───────────────────────────────────────────────────────────── */

export const metricasRegua: SystemStyleObject = {
  gap: { base: "8", sm: "12" },
  pt: "8",
  mt: "2",
  borderTop: `1px solid ${cores.border.DEFAULT}`,
  flexWrap: "wrap",
};

export const metricaValor: SystemStyleObject = {
  fontSize: "2xl",
  fontWeight: tipografia.peso.light,
  color: cores.text.heading,
  lineHeight: "1",
  letterSpacing: tipografia.tracking.titulo,
};

export const metricaRotulo: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  letterSpacing: "0.04em",
  color: cores.text.subtle,
};

/* ─── Retrato ────────────────────────────────────────────────────────────── */

export const molduraRetrato: SystemStyleObject = {
  position: "relative",
  border: `1px solid ${cores.border.DEFAULT}`,
  borderRadius: raio["2xl"],
  overflow: "hidden",
  bg: cores.background.card,
  boxShadow: sombras.destaque,
};

export const faixaMetadados: SystemStyleObject = {
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  px: "4",
  py: "3",
  alignItems: "center",
  justifyContent: "space-between",
  bg: "linear-gradient(to top, rgba(11,11,12,0.92) 0%, transparent 100%)",
};

export const faixaMetadadosTexto: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  letterSpacing: "0.06em",
  color: cores.text.heading,
};

/* ─── CTAs (<a> nativos, usam CSSProperties) ─────────────────────────────── */

const ctaBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: 500,
  fontSize: "15px",
  padding: "13px 22px",
  borderRadius: raio.md,
  textDecoration: "none",
};

export const ctaPrimario: React.CSSProperties = {
  ...ctaBase,
  backgroundColor: cores.text.heading,
  color: cores.background.base,
  transition: transicao.elevacao,
};

/** CTA secundário muda de aparência enquanto o download está ativo. */
export const ctaSecundario = (baixando: boolean): React.CSSProperties => ({
  ...ctaBase,
  color: baixando ? cores.accent.light : cores.text.heading,
  border: baixando
    ? `1px solid ${cores.accent.border}`
    : `1px solid ${cores.border.hover}`,
  backgroundColor: baixando ? cores.accent.subtle : cores.transparent,
  transition: transicao.lenta,
});
