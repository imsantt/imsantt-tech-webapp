import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Fallback de erro da página /habilidades.
 */
export function HabilidadesPageError() {
  return (
    <Box
      as="main"
      minH="100svh"
      bg={cores.background.base}
      pt={{ base: "28", md: "32" }}
      pb={{ base: "16", md: "24" }}
      px="6"
      display="flex"
      alignItems="center"
      justifyContent="center"
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
            Erro ao carregar habilidades
          </Heading>
          <Text fontSize="sm" color={cores.text.body}>
            Não foi possível carregar a página de habilidades. Tente recarregar.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
