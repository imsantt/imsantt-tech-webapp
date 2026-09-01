import type { SystemStyleObject } from "@chakra-ui/react";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";

/** Título de coluna do rodapé (Navegação, Recursos, Contato). */
export const tituloColuna: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "500",
  color: cores.texto.sutil,
  textTransform: "uppercase",
  letterSpacing: tipografia.tracking.label,
};

/** Link de coluna do rodapé. */
export const linkColuna: SystemStyleObject = {
  fontSize: "sm",
  color: cores.texto.corpo,
  transition: transicao.rapida,
  _hover: { color: cores.acento.claro },
};

/** Selo "Disponível para projetos". */
export const seloDisponivel: SystemStyleObject = {
  alignItems: "center",
  gap: "2.5",
  px: "3",
  py: "1.5",
  bg: cores.primaria.sutil,
  border: `1px solid ${cores.borda.DEFAULT}`,
  borderRadius: raio.sm,
};

export const seloDisponivelTexto: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  fontWeight: "400",
  letterSpacing: "0.03em",
  color: cores.texto.corpo,
};

/** Botão de rede social. */
export const botaoRede: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  w: "38px",
  h: "38px",
  borderRadius: raio.md,
  border: `1px solid ${cores.borda.DEFAULT}`,
  bg: cores.transparente,
  color: cores.texto.corpo,
  cursor: "pointer",
  transition: transicao.padrao,
  _hover: {
    color: cores.texto.titulo,
    borderColor: cores.borda.hoverForte,
    bg: cores.primaria.sutil,
  },
};

/** Texto do rodapé inferior (copyright / cargo). */
export const textoRodapeInferior: SystemStyleObject = {
  fontFamily: tipografia.familia.mono,
  fontSize: "xs",
  letterSpacing: "0.02em",
  color: cores.texto.sutil,
};
