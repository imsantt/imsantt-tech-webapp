import type { SystemStyleObject } from "@chakra-ui/react";
import { cores, raio, sombras, tipografia } from "@/lib/tema/tokens";

/* ─── Shell / layout split ───────────────────────────────────────────────── */

export const pagina: SystemStyleObject = {
  minH: "100svh",
  bg: cores.background.base,
  display: "grid",
  gridTemplateColumns: { base: "1fr", lg: "1.05fr 1fr" },
  position: "relative",
  overflow: "hidden",
};

/* Linha-guia sutil no topo (fio de cabelo do DS) */
export const traceTopo: SystemStyleObject = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  h: "1px",
  bg: cores.border.DEFAULT,
  zIndex: 2,
};

/* ─── Painel editorial (coluna esquerda) ─────────────────────────────────── */

export const painel: SystemStyleObject = {
  position: "relative",
  display: { base: "none", lg: "flex" },
  flexDirection: "column",
  justifyContent: "space-between",
  bg: cores.background.subtle,
  borderRight: `1px solid ${cores.border.DEFAULT}`,
  px: { lg: "12", xl: "16" },
  py: { lg: "12", xl: "16" },
  overflow: "hidden",
};

/* Grid arquitetônico sutil ao fundo do painel */
export const painelGrade: SystemStyleObject = {
  position: "absolute",
  inset: 0,
  backgroundImage: `linear-gradient(${cores.border.subtle} 1px, transparent 1px), linear-gradient(90deg, ${cores.border.subtle} 1px, transparent 1px)`,
  backgroundSize: "3.5rem 3.5rem",
  maskImage:
    "radial-gradient(ellipse 80% 60% at 30% 40%, #000 0%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 80% 60% at 30% 40%, #000 0%, transparent 75%)",
  pointerEvents: "none",
};

export const painelConteudo: SystemStyleObject = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  h: "100%",
  gap: "12",
};

export const painelTagline: SystemStyleObject = {
  fontSize: { lg: "4xl", xl: "5xl" },
  fontWeight: tipografia.peso.light,
  letterSpacing: tipografia.tracking.tituloAmplo,
  lineHeight: String(tipografia.alturaLinha.titulo),
  color: cores.text.heading,
  maxW: "18ch",
};

export const painelTaglineAcento: SystemStyleObject = {
  color: cores.accent.light,
};

export const painelDescricao: SystemStyleObject = {
  fontSize: "md",
  color: cores.text.body,
  lineHeight: String(tipografia.alturaLinha.relaxada),
  maxW: "44ch",
  mt: "6",
};

/* Rodapé de metadados no painel (estilo terminal / mono) */
export const painelMeta: SystemStyleObject = {
  display: "flex",
  flexDirection: "column",
  gap: "2.5",
};

export const metaLinha: SystemStyleObject = {
  display: "flex",
  alignItems: "center",
  gap: "3",
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  color: cores.text.subtle,
  letterSpacing: "0.04em",
};

export const metaChave: SystemStyleObject = {
  color: cores.accent.DEFAULT,
};

export const metaPonto: SystemStyleObject = {
  w: "6px",
  h: "6px",
  borderRadius: raio.full,
  bg: cores.success.DEFAULT,
  boxShadow: `0 0 0 3px ${cores.success.subtle}`,
  flexShrink: 0,
};

/* ─── Coluna do formulário (direita) ─────────────────────────────────────── */

export const colunaFormulario: SystemStyleObject = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: { base: "6", md: "10" },
  py: { base: "16", md: "20" },
};

export const cartao: SystemStyleObject = {
  w: "100%",
  maxW: "25rem",
};

/* ─── Cabeçalho ──────────────────────────────────────────────────────────── */

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
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: tipografia.peso.light,
  letterSpacing: tipografia.tracking.tituloAmplo,
  lineHeight: String(tipografia.alturaLinha.titulo),
  color: cores.text.heading,
};

export const subtitulo: SystemStyleObject = {
  fontSize: "sm",
  color: cores.text.body,
  lineHeight: String(tipografia.alturaLinha.corpo),
  maxW: "40ch",
};

/* ─── Aviso "interface only" ─────────────────────────────────────────────── */

export const aviso: SystemStyleObject = {
  display: "flex",
  alignItems: "flex-start",
  gap: "3",
  bg: cores.warning.subtle,
  border: "1px solid",
  borderColor: "rgba(212, 176, 98, 0.35)",
  borderRadius: raio.xl,
  px: "4",
  py: "3",
};

/* ─── Erro de login ──────────────────────────────────────────────────────── */

export const erro: SystemStyleObject = {
  display: "flex",
  alignItems: "flex-start",
  gap: "3",
  bg: cores.danger.subtle,
  border: "1px solid",
  borderColor: "rgba(229, 103, 95, 0.35)",
  borderRadius: raio.xl,
  px: "4",
  py: "3",
};

/* ─── Provedor GitHub (ação primária destacada) ──────────────────────────── */

export const botaoGithub: SystemStyleObject = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2.5",
  w: "100%",
  bg: cores.text.heading,
  color: cores.background.base,
  border: "1px solid transparent",
  borderRadius: raio.md,
  fontSize: "sm",
  fontWeight: tipografia.peso.semibold,
  px: "4",
  py: "3.5",
  cursor: "pointer",
  boxShadow: sombras.botao,
  transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
  _hover: {
    bg: cores.primary.hover,
    transform: "translateY(-1px)",
    boxShadow: sombras.botaoForte,
  },
  _active: { transform: "translateY(0)" },
};

export const badgeExclusivo: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "0.625rem",
  letterSpacing: tipografia.tracking.label,
  textTransform: "uppercase",
  color: cores.accent.light,
  border: `1px solid ${cores.accent.border}`,
  bg: cores.accent.subtle,
  borderRadius: raio.full,
  px: "2.5",
  py: "1",
};

/* ─── Campos ─────────────────────────────────────────────────────────────── */

export const rotulo: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "500",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: cores.text.body,
  mb: "2.5",
};

export const entrada: SystemStyleObject = {
  bg: cores.background.base,
  border: "1px solid",
  borderColor: cores.border.DEFAULT,
  borderRadius: raio.md,
  color: cores.text.heading,
  fontSize: "sm",
  px: "4",
  py: "3",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  _placeholder: { color: cores.text.subtle },
  _hover: { borderColor: cores.border.hover },
  _focus: {
    borderColor: cores.accent.DEFAULT,
    boxShadow: sombras.input,
    outline: "none",
  },
};

export const olhoBotao: SystemStyleObject = {
  position: "absolute",
  top: "50%",
  right: "3",
  transform: "translateY(-50%)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: cores.text.subtle,
  cursor: "pointer",
  bg: "transparent",
  border: "none",
  p: "1",
  borderRadius: raio.sm,
  transition: "color 0.2s ease",
  _hover: { color: cores.text.body },
};

/* ─── Linha auxiliar (lembrar / esqueci senha) ───────────────────────────── */

export const linhaAuxiliar: SystemStyleObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "3",
  flexWrap: "wrap",
};

export const checkboxLabel: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  gap: "2",
  fontSize: "xs",
  color: cores.text.body,
  cursor: "pointer",
  userSelect: "none",
};

export const linkDiscreto: SystemStyleObject = {
  fontSize: "xs",
  fontWeight: tipografia.peso.medium,
  color: cores.accent.light,
  textDecoration: "none",
  transition: "color 0.2s ease",
  _hover: { color: cores.accent.hover },
};

/* ─── Botão de credenciais (ação secundária) ─────────────────────────────── */

export const botaoEntrar: SystemStyleObject = {
  bg: cores.primary.subtle,
  color: cores.text.heading,
  border: `1px solid ${cores.border.DEFAULT}`,
  fontWeight: "500",
  w: "100%",
  borderRadius: raio.md,
  transition: "background 0.2s ease, border-color 0.2s ease",
  _hover: { bg: cores.primary.border, borderColor: cores.border.hover },
};

/* ─── Separador ──────────────────────────────────────────────────────────── */

export const separador: SystemStyleObject = {
  display: "flex",
  alignItems: "center",
  gap: "4",
  w: "100%",
};

export const separadorLinha: SystemStyleObject = {
  flex: 1,
  h: "1px",
  bg: cores.border.DEFAULT,
};

export const separadorTexto: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "0.6875rem",
  letterSpacing: tipografia.tracking.label,
  textTransform: "uppercase",
  color: cores.text.subtle,
  whiteSpace: "nowrap",
};

/* ─── Rodapé do cartão ───────────────────────────────────────────────────── */

export const rodapeTexto: SystemStyleObject = {
  fontSize: "xs",
  color: cores.text.body,
  textAlign: "center",
};

export const voltarLink: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  gap: "2",
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  letterSpacing: "0.04em",
  color: cores.text.subtle,
  textDecoration: "none",
  transition: "color 0.2s ease",
  _hover: { color: cores.text.body },
};

/* ─── <form> nativo (usa CSSProperties) ──────────────────────────────────── */

export const formulario: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
