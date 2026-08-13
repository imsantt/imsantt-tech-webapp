import { Box, Text } from "@chakra-ui/react";
import { cores, layout } from "../../../lib/tema/tokens";

const anoAtual = new Date().getFullYear();

export function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      borderTop={`1px solid ${cores.borda.DEFAULT}`}
      py="8"
      px="6"
      bg={cores.bg.sutil}
      textAlign="center"
    >
      <Box
        maxW={layout.maxWidth}
        mx="auto"
        display="flex"
        flexDirection="column"
        gap="1.5"
      >
        <Text fontSize="sm" color={cores.texto.corpo}>
          © {anoAtual}{" "}
          <Box as="span" color={cores.primaria.claro} fontWeight="600">
            Robert Santos
          </Box>
          . Feito com dedicação e ☕
        </Text>
        <Text fontSize="xs" color={cores.texto.sutil}>
          Engenheiro de Software Sênior &amp; Arquiteto
        </Text>
      </Box>
    </Box>
  );
}
