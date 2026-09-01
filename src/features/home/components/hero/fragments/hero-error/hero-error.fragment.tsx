import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Fallback de erro do Hero.
 */
export function HeroError() {
  return (
    <Box
      as="section"
      minH="100svh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="6"
      bg={cores.background.base}
    >
      <Box
        maxW={layout.maxWidthEstrito}
        p="10"
        bg={cores.background.card}
        border={`1px solid ${cores.border.DEFAULT}`}
        borderRadius={raio["2xl"]}
        textAlign="center"
      >
        <VStack gap="3">
          <Heading as="h2" fontSize="lg" color={cores.text.heading}>
            Não foi possível carregar
          </Heading>
          <Text fontSize="sm" color={cores.text.body}>
            Ocorreu um erro ao carregar a seção principal. Tente recarregar a
            página.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
