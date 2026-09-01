import type { SystemStyleObject } from "@chakra-ui/react";
import { cores, raio, sombras, tipografia, transicao } from "@/lib/tema/tokens";
import type { CategoriaHabilidade } from "@/types/habilidade";

/** Máximo de tags exibidas por card na Home */
export const MAX_TAGS_HOME = 6;

/* ─── Card de categoria ──────────────────────────────────────────────────── */

/**
 * Estilo do card de habilidade. Depende da cor da categoria (borda, glow e
 * fio de acento no topo), por isso é uma função e não uma constante.
 */
export const cardHabilidade = (
  item: CategoriaHabilidade,
): SystemStyleObject => ({
  bg: cores.bg.card,
  border: `1px solid ${cores.borda.DEFAULT}`,
  borderRadius: raio["2xl"],
  p: "7",
  position: "relative",
  overflow: "hidden",
  transition: transicao.elevacao,
  _hover: {
    borderColor: item.corBorda,
    transform: "translateY(-3px)",
    boxShadow: item.corGlow ? `0 12px 40px ${item.corGlow}` : sombras.card,
  },
  // Fio de acento no topo, revelado no hover
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: item.cor,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": { opacity: 0.8 },
});

export const cardIcone = (item: CategoriaHabilidade): SystemStyleObject => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  w: "44px",
  h: "44px",
  bg: item.iconeBg,
  border: `1px solid ${item.corBorda}`,
  borderRadius: raio.md,
  flexShrink: 0,
});

export const cardIndice = (item: CategoriaHabilidade): SystemStyleObject => ({
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  color: item.cor,
  opacity: 0.7,
  letterSpacing: "0.06em",
});

export const cardTitulo: SystemStyleObject = {
  fontSize: "lg",
  fontWeight: tipografia.peso.semibold,
  letterSpacing: tipografia.tracking.titulo,
  color: cores.texto.titulo,
};

export const cardDescricao: SystemStyleObject = {
  fontSize: "sm",
  color: cores.texto.corpo,
  lineHeight: String(tipografia.alturaLinha.relaxada),
  flex: 1,
};

export const cardTag = (item: CategoriaHabilidade): SystemStyleObject => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "1.5",
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "400",
  color: item.cor,
  bg: item.corFundo,
  border: `1px solid ${item.corBorda}`,
  px: "2.5",
  py: "1",
  borderRadius: raio.sm,
  whiteSpace: "nowrap",
});

/* ─── Seção ──────────────────────────────────────────────────────────────── */

export const secao: SystemStyleObject = {
  py: { base: "20", md: "28" },
  px: { base: "6", md: "12", lg: "24" },
  bg: cores.bg.sutil,
  borderTop: `1px solid ${cores.borda.DEFAULT}`,
};

export const cabecalhoGrid: SystemStyleObject = {
  gridTemplateColumns: { base: "1fr", md: "1fr 1.4fr" },
  gap: { base: "6", md: "12" },
  mb: { base: "12", md: "16" },
  alignItems: "end",
};

export const eyebrowTraco: SystemStyleObject = {
  w: "24px",
  h: "1px",
  bg: cores.acento.DEFAULT,
};

export const eyebrowTexto: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: tipografia.peso.medium,
  letterSpacing: tipografia.tracking.label,
  textTransform: "uppercase",
  color: cores.acento.claro,
};

export const titulo: SystemStyleObject = {
  fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
  fontWeight: tipografia.peso.light,
  letterSpacing: tipografia.tracking.tituloAmplo,
  lineHeight: String(tipografia.alturaLinha.titulo),
  color: cores.texto.titulo,
};

export const subtitulo: SystemStyleObject = {
  fontSize: "md",
  color: cores.texto.corpo,
  maxW: "46ch",
  lineHeight: String(tipografia.alturaLinha.relaxada),
};

export const cardsGrid: SystemStyleObject = {
  gridTemplateColumns: {
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  },
  gap: "4",
};

/* ─── Link "Ver todas" (elemento <a> nativo, usa CSSProperties) ───────────── */

export const linkVerTodas: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  color: cores.texto.titulo,
  fontFamily: tipografia.familia.mono,
  fontWeight: 500,
  fontSize: "13px",
  letterSpacing: "0.04em",
  padding: "12px 20px",
  borderRadius: raio.md,
  border: `1px solid ${cores.borda.hover}`,
  backgroundColor: cores.transparente,
  textDecoration: "none",
  transition: transicao.lenta,
};
