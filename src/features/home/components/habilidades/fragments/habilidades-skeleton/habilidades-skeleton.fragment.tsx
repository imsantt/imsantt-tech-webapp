import { Box, Grid, VStack } from "@chakra-ui/react";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Skeleton da seção Habilidades na Home.
 */
export function HabilidadesSkeleton() {
  return (
    <Box
      as="section"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.background.subtle}
      role="status"
      aria-label="Carregando habilidades..."
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Box
            h="0.75rem"
            w="90px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.4}
            mx="auto"
          />
          <Box
            h="2rem"
            w="200px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.md}
            opacity={0.3}
            mx="auto"
          />
          <Box
            h="1rem"
            w="320px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.25}
            mx="auto"
          />
        </VStack>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="5"
        >
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Grid>
      </Box>
    </Box>
  );
}
