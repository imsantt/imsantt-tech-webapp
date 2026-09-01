import { Box, Flex, Grid, HStack, VStack } from "@chakra-ui/react";
import { cores, raio, layout } from "@/lib/tema/tokens";

/** Bloco retangular reutilizável do skeleton. */
function Barra({
  w,
  h = "0.8rem",
  opacity = 0.35,
}: {
  w: string | number;
  h?: string;
  opacity?: number;
}) {
  return (
    <Box
      h={h}
      w={w}
      bg={cores.border.DEFAULT}
      borderRadius={raio.sm}
      opacity={opacity}
    />
  );
}

/** Linha de competência do skeleton — espelha ItemHabilidade. */
function LinhaHabilidadeSkeleton() {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "minmax(0, 15rem) 1fr" }}
      gap={{ base: "1.5", md: "6" }}
      alignItems="baseline"
      py="4"
      borderTop={`1px solid ${cores.border.subtle}`}
    >
      <VStack align="flex-start" gap="2">
        <Barra w="55%" h="0.9rem" opacity={0.4} />
        <HStack gap="2">
          <Barra w="34px" h="2px" opacity={0.35} />
          <Barra w="4rem" h="0.55rem" opacity={0.3} />
        </HStack>
      </VStack>
      <VStack align="stretch" gap="1.5">
        <Barra w="100%" h="0.7rem" opacity={0.25} />
        <Barra w="80%" h="0.7rem" opacity={0.2} />
      </VStack>
    </Grid>
  );
}

/** Seção de categoria do skeleton — espelha SecaoCategoria. */
function SecaoSkeleton() {
  return (
    <Box>
      <Box w="40px" h="2px" bg={cores.border.DEFAULT} opacity={0.4} mb="8" />
      <Grid
        templateColumns={{ base: "1fr", md: "minmax(0, 22rem) 1fr" }}
        gap={{ base: "5", md: "10" }}
        alignItems="start"
        mb={{ base: "6", md: "8" }}
      >
        <VStack align="flex-start" gap="4">
          <HStack gap="3">
            <Barra w="24px" h="0.75rem" opacity={0.35} />
            <Box
              w="40px"
              h="40px"
              bg={cores.border.DEFAULT}
              borderRadius={raio.md}
              opacity={0.4}
            />
          </HStack>
          <Barra w="70%" h="1.8rem" opacity={0.3} />
        </VStack>
        <VStack align="stretch" gap="2" pt={{ base: "0", md: "1" }}>
          <Barra w="100%" h="0.8rem" opacity={0.25} />
          <Barra w="85%" h="0.8rem" opacity={0.2} />
        </VStack>
      </Grid>

      <VStack align="stretch" gap="0">
        <LinhaHabilidadeSkeleton />
        <LinhaHabilidadeSkeleton />
        <LinhaHabilidadeSkeleton />
      </VStack>
    </Box>
  );
}

/**
 * Skeleton da página /habilidades.
 * Espelha o layout editorial em seções por categoria para evitar layout shift.
 */
export function HabilidadesPageSkeleton() {
  return (
    <Box
      as="main"
      minH="100svh"
      bg={cores.background.base}
      pt={{ base: "28", md: "32" }}
      pb={{ base: "16", md: "24" }}
      px={{ base: "5", md: "12", lg: "24" }}
      role="status"
      aria-label="Carregando habilidades..."
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Header */}
        <VStack gap="5" mb={{ base: "8", md: "10" }} align="flex-start">
          <Barra w="150px" h="0.75rem" opacity={0.4} />
          <Barra w="min(280px, 70vw)" h="3rem" opacity={0.3} />
          <Barra w="min(420px, 90vw)" h="1rem" opacity={0.25} />
        </VStack>

        {/* Busca */}
        <Box mb={{ base: "10", md: "12" }} maxW="30rem">
          <Box
            h="2.75rem"
            w="100%"
            bg={cores.background.card}
            border={`1px solid ${cores.border.DEFAULT}`}
            borderRadius={raio.lg}
            opacity={0.6}
          />
        </Box>

        {/* Índice de navegação */}
        <Flex flexWrap="wrap" gap="2" mb={{ base: "12", md: "16" }}>
          {["9rem", "7rem", "8rem", "10rem", "8.5rem", "9.5rem"].map((w, i) => (
            <Box
              key={i}
              h="2rem"
              w={w}
              bg={cores.background.card}
              border={`1px solid ${cores.border.DEFAULT}`}
              borderRadius={raio.md}
              opacity={0.5}
            />
          ))}
        </Flex>

        {/* Seções */}
        <VStack align="stretch" gap={{ base: "16", md: "24" }}>
          <SecaoSkeleton />
          <SecaoSkeleton />
        </VStack>
      </Box>
    </Box>
  );
}
