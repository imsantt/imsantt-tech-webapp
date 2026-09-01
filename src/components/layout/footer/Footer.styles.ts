import type { SystemStyleObject } from "@chakra-ui/react";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";

/** Título de coluna do rodapé (Navegação, Recursos, Contato). */
export const tituloColuna: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "500",
  color: cores.text.subtle,
  textTransform: "uppercase",
  letterSpacing: tipografia.tracking.label,
};

/** Link de coluna do rodapé. */
export const linkColuna: SystemStyleObject = {
  fontSize: "sm",
  color: cores.text.body,
  transition: transicao.rapida,
  _hover: { color: cores.accent.light },
};

/** Selo "Disponível para projetos". */
export const seloDisponivel: SystemStyleObject = {
  alignItems: "center",
  gap: "2.5",
  px: "3",
  py: "1.5",
  bg: cores.primary.subtle,
  border: `1px solid ${cores.border.DEFAULT}`,
  borderRadius: raio.sm,
};

export const seloDisponivelTexto: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "400",
  letterSpacing: "0.03em",
  color: cores.text.body,
};

/** Botão de rede social. */
export const botaoRede: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  w: "38px",
  h: "38px",
  borderRadius: raio.md,
  border: `1px solid ${cores.border.DEFAULT}`,
  bg: cores.transparent,
  color: cores.text.body,
  cursor: "pointer",
  transition: transicao.padrao,
  _hover: {
    color: cores.text.heading,
    borderColor: cores.border.hoverStrong,
    bg: cores.primary.subtle,
  },
};

/** Texto do rodapé inferior (copyright / cargo). */
export const textoRodapeInferior: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  letterSpacing: "0.02em",
  color: cores.text.subtle,
};
