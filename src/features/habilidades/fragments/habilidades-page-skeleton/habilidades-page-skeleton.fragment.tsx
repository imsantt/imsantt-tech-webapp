import { Box, Grid, VStack } from "@chakra-ui/react";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Skeleton da página /habilidades.
 */
export function HabilidadesPageSkeleton() {
  return (
    <Box
      as="main"
      minH="100svh"
      bg={cores.bg.base}
      pt={{ base: "28", md: "32" }}
      pb={{ base: "16", md: "24" }}
      px={{ base: "5", md: "12", lg: "24" }}
      role="status"
      aria-label="Carregando habilidades..."
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <VStack gap="4" mb={{ base: "12", md: "16" }} textAlign="center">
          <Box
            h="0.75rem"
            w="90px"
            bg={cores.borda.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.4}
            mx="auto"
          />
          <Box
            h="2.5rem"
            w="240px"
            bg={cores.borda.DEFAULT}
            borderRadius={raio.md}
            opacity={0.3}
            mx="auto"
          />
          <Box
            h="1rem"
            w="360px"
            bg={cores.borda.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.25}
            mx="auto"
          />
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Grid>
      </Box>
    </Box>
  );
}
