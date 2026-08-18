import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio } from "@/lib/tema/tokens";

/**
 * Fallback de erro da seção Contato.
 */
export function ContatoError() {
  return (
    <Box
      p="8"
      bg={cores.bg.card}
      border={`1px solid ${cores.borda.DEFAULT}`}
      borderRadius={raio["2xl"]}
      textAlign="center"
    >
      <VStack gap="3">
        <Heading as="h3" fontSize="lg" color={cores.texto.titulo}>
          Erro ao carregar contato
        </Heading>
        <Text fontSize="sm" color={cores.texto.corpo}>
          Não foi possível carregar o formulário de contato. Tente recarregar a
          página.
        </Text>
      </VStack>
    </Box>
  );
}
