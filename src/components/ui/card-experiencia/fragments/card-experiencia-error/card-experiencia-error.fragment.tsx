import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";
import { cores, raio, componentes } from "@/lib/tema/tokens";

/**
 * Fallback de erro para card de experiência.
 * Mantém a mesma altura do card real para preservar o layout do grid.
 */
export function CardExperienciaError() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      h={componentes.card.altura}
      bg={cores.bg.card}
      border={`1px solid ${cores.erro.sutil}`}
      borderRadius={raio["2xl"]}
      p="6"
      textAlign="center"
    >
      <Box
        as={FiAlertCircle}
        fontSize="24px"
        color={cores.erro.claro}
        aria-hidden="true"
      />
      <Heading
        as="h3"
        fontSize="sm"
        fontWeight="600"
        color={cores.texto.titulo}
      >
        Erro ao carregar
      </Heading>
      <Text fontSize="xs" color={cores.texto.corpo} maxW="200px">
        Não foi possível exibir esta experiência.
      </Text>
    </Flex>
  );
}
