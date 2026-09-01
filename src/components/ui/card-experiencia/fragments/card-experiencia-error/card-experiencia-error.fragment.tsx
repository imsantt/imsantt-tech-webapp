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
      bg={cores.background.card}
      border={`1px solid ${cores.danger.subtle}`}
      borderRadius={raio["2xl"]}
      p="6"
      textAlign="center"
    >
      <Box
        as={FiAlertCircle}
        fontSize="24px"
        color={cores.danger.light}
        aria-hidden="true"
      />
      <Heading
        as="h3"
        fontSize="sm"
        fontWeight="600"
        color={cores.text.heading}
      >
        Erro ao carregar
      </Heading>
      <Text fontSize="xs" color={cores.text.body} maxW="200px">
        Não foi possível exibir esta experiência.
      </Text>
    </Flex>
  );
}
