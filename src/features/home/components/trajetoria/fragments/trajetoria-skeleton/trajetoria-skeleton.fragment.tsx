import { Box, Grid, VStack } from "@chakra-ui/react";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Skeleton da seção Trajetória.
 */
export function TrajetoriaSkeleton() {
  return (
    <Box
      as="section"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.background.base}
      role="status"
      aria-label="Carregando trajetória..."
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <VStack align="flex-start" gap="3" mb={{ base: "10", md: "14" }}>
          <Box
            h="0.75rem"
            w="80px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.4}
          />
          <Box
            h="2.5rem"
            w="60%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.md}
            opacity={0.3}
          />
          <Box
            h="1rem"
            w="40%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.25}
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
