import { Box, Grid, VStack } from "@chakra-ui/react";
import { cores, raio, layout } from "@/lib/tema/tokens";

/** Card de serviço no skeleton. */
function CardServicoSkeleton() {
  return (
    <VStack
      align="flex-start"
      gap="4"
      bg={cores.background.card}
      border={`1px solid ${cores.border.DEFAULT}`}
      borderRadius={raio["2xl"]}
      p={{ base: "6", md: "7" }}
    >
      <Box
        w="44px"
        h="44px"
        bg={cores.border.DEFAULT}
        borderRadius={raio.md}
        opacity={0.4}
      />
      <Box
        h="1.3rem"
        w="70%"
        bg={cores.border.DEFAULT}
        borderRadius={raio.sm}
        opacity={0.35}
      />
      <VStack align="stretch" gap="2" w="full">
        <Box h="0.7rem" w="100%" bg={cores.border.DEFAULT} borderRadius={raio.sm} opacity={0.22} />
        <Box h="0.7rem" w="88%" bg={cores.border.DEFAULT} borderRadius={raio.sm} opacity={0.2} />
      </VStack>
    </VStack>
  );
}

/**
 * Skeleton da seção Serviços.
 */
export function ServicosSkeleton() {
  return (
    <Box
      as="section"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.background.subtle}
      role="status"
      aria-label="Carregando serviços..."
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <VStack align="flex-start" gap="3" mb={{ base: "10", md: "14" }}>
          <Box h="0.75rem" w="80px" bg={cores.border.DEFAULT} borderRadius={raio.sm} opacity={0.4} />
          <Box h="2.5rem" w="55%" bg={cores.border.DEFAULT} borderRadius={raio.md} opacity={0.3} />
          <Box h="1rem" w="40%" bg={cores.border.DEFAULT} borderRadius={raio.sm} opacity={0.25} />
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: "4", md: "5" }}>
          <CardServicoSkeleton />
          <CardServicoSkeleton />
          <CardServicoSkeleton />
          <CardServicoSkeleton />
        </Grid>
      </Box>
    </Box>
  );
}
