import type { SystemStyleObject } from "@chakra-ui/react";
import { cores, raio, sombras, tipografia } from "@/lib/tema/tokens";

/* ─── Seção ──────────────────────────────────────────────────────────────── */

export const secao: SystemStyleObject = {
  py: { base: "20", md: "28" },
  px: "6",
  bg: cores.background.subtle,
  borderTop: `1px solid ${cores.border.DEFAULT}`,
};

export const eyebrowTraco: SystemStyleObject = {
  w: "24px",
  h: "1px",
  bg: cores.accent.DEFAULT,
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
  fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
  fontWeight: tipografia.peso.light,
  letterSpacing: tipografia.tracking.tituloAmplo,
  lineHeight: String(tipografia.alturaLinha.titulo),
  color: cores.text.heading,
};

export const subtitulo: SystemStyleObject = {
  fontSize: "md",
  color: cores.text.body,
  lineHeight: String(tipografia.alturaLinha.relaxada),
  maxW: "48ch",
};

/* ─── Cartão do formulário ───────────────────────────────────────────────── */

export const cartao: SystemStyleObject = {
  bg: cores.background.card,
  border: `1px solid ${cores.border.DEFAULT}`,
  borderRadius: raio["2xl"],
  p: { base: "6", md: "10" },
};

/* ─── Feedback (sucesso / erro) ──────────────────────────────────────────── */

export const feedbackSucesso: SystemStyleObject = {
  display: "flex",
  alignItems: "flex-start",
  gap: "3",
  bg: cores.success.subtle,
  border: "1px solid rgba(34, 197, 94, 0.35)",
  borderRadius: raio.xl,
  px: "4",
  py: "3",
  mb: "6",
};

export const feedbackErro: SystemStyleObject = {
  display: "flex",
  alignItems: "flex-start",
  gap: "3",
  bg: cores.danger.subtle,
  border: "1px solid rgba(239, 68, 68, 0.35)",
  borderRadius: raio.xl,
  px: "4",
  py: "3",
  mb: "6",
};

/* ─── Campos ─────────────────────────────────────────────────────────────── */

export const entrada: SystemStyleObject = {
  bg: cores.background.base,
  border: "1px solid",
  borderColor: cores.border.DEFAULT,
  borderRadius: raio.md,
  color: cores.text.heading,
  fontSize: "sm",
  px: "4",
  py: "3",
  _placeholder: { color: cores.text.subtle },
  _hover: { borderColor: cores.border.hover },
  _focus: {
    borderColor: cores.accent.DEFAULT,
    boxShadow: sombras.input,
    outline: "none",
  },
};

export const rotulo: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "500",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: cores.text.body,
  mb: "2.5",
};

export const botaoEnviar: SystemStyleObject = {
  bg: cores.text.heading,
  color: cores.background.base,
  fontWeight: "500",
  px: "8",
  borderRadius: raio.md,
  alignSelf: "flex-start",
  _hover: { bg: cores.primary.hover },
};

/* ─── <form> nativo (usa CSSProperties) ──────────────────────────────────── */

export const formulario: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};
