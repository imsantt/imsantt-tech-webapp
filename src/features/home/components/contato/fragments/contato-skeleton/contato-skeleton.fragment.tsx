import { Box, VStack } from "@chakra-ui/react";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Skeleton da seção Contato.
 */
export function ContatoSkeleton() {
  return (
    <Box
      as="section"
      py={{ base: "16", md: "24" }}
      px="6"
      bg={cores.background.base}
      role="status"
      aria-label="Carregando contato..."
    >
      <Box maxW={layout.maxWidthEstrito} mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Box
            h="0.75rem"
            w="70px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.4}
            mx="auto"
          />
          <Box
            h="2rem"
            w="180px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.md}
            opacity={0.3}
            mx="auto"
          />
        </VStack>

        <Box
          bg={cores.background.card}
          border={`1px solid ${cores.border.DEFAULT}`}
          borderRadius={raio["2xl"]}
          p={{ base: "6", md: "10" }}
        >
          <VStack gap="6" align="stretch">
            <Box
              h="2.5rem"
              w="100%"
              bg={cores.border.DEFAULT}
              borderRadius={raio.xl}
              opacity={0.25}
            />
            <Box
              h="2.5rem"
              w="100%"
              bg={cores.border.DEFAULT}
              borderRadius={raio.xl}
              opacity={0.2}
            />
            <Box
              h="7rem"
              w="100%"
              bg={cores.border.DEFAULT}
              borderRadius={raio.xl}
              opacity={0.2}
            />
            <Box
              h="2.75rem"
              w="160px"
              bg={cores.border.DEFAULT}
              borderRadius={raio.xl}
              opacity={0.3}
            />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
