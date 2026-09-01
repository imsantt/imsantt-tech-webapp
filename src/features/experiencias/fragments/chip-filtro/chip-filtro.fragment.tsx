import { Box, chakra } from "@chakra-ui/react";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";

interface ChipFiltroProps {
  ativo: boolean;
  rotulo: string;
  quantidade: number;
  cor: string;
  onClick: () => void;
}

/** Chip de filtro por categoria da grade de certificações. */
export function ChipFiltro({
  ativo,
  rotulo,
  quantidade,
  cor,
  onClick,
}: ChipFiltroProps) {
  return (
    <chakra.button
      type="button"
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      gap="2"
      fontFamily={tipografia.familia.mono}
      fontSize="xs"
      fontWeight="400"
      color={ativo ? cores.background.base : cores.text.body}
      bg={ativo ? cor : cores.background.card}
      border={`1px solid ${ativo ? cor : cores.border.DEFAULT}`}
      px="3"
      py="2"
      borderRadius={raio.md}
      cursor="pointer"
      transition={transicao.rapida}
      _hover={ativo ? {} : { borderColor: cores.border.hover }}
    >
      {rotulo}
      <Box
        as="span"
        fontSize="10px"
        opacity={0.7}
        color={ativo ? cores.background.base : cores.text.subtle}
      >
        {quantidade}
      </Box>
    </chakra.button>
  );
}
