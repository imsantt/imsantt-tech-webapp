import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
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

/** Item da timeline no skeleton — espelha ItemTimeline. */
function ItemTimelineSkeleton() {
  return (
    <Box
      position="relative"
      pl={{ base: "8", md: "12" }}
      pb={{ base: "12", md: "16" }}
    >
      {/* Nó */}
      <Box
        position="absolute"
        left={{ base: "-5px", md: "-6px" }}
        top="1"
        w={{ base: "11px", md: "13px" }}
        h={{ base: "11px", md: "13px" }}
        borderRadius={raio.full}
        bg={cores.border.DEFAULT}
        opacity={0.5}
      />
      <VStack align="flex-start" gap="4">
        <Barra w="7rem" h="0.7rem" opacity={0.35} />
        <Barra w="min(60%, 22rem)" h="1.4rem" opacity={0.35} />
        <HStack gap="3">
          <Barra w="6rem" h="0.7rem" opacity={0.3} />
          <Barra w="5rem" h="0.7rem" opacity={0.25} />
        </HStack>
        <VStack align="stretch" gap="2" w="full" maxW="46rem">
          <Barra w="100%" h="0.7rem" opacity={0.22} />
          <Barra w="92%" h="0.7rem" opacity={0.2} />
          <Barra w="70%" h="0.7rem" opacity={0.18} />
        </VStack>
        <Flex flexWrap="wrap" gap="1.5">
          {["4rem", "5rem", "3.5rem", "4.5rem"].map((w, i) => (
            <Barra key={i} w={w} h="1.4rem" opacity={0.25} />
          ))}
        </Flex>
      </VStack>
    </Box>
  );
}

/**
 * Skeleton da página /experiencias.
 * Espelha o layout em timeline vertical para evitar layout shift.
 */
export function ExperienciasPageSkeleton() {
  return (
    <Box
      as="main"
      minH="100svh"
      bg={cores.background.base}
      pt={{ base: "28", md: "32" }}
      pb={{ base: "16", md: "24" }}
      px={{ base: "5", md: "12", lg: "24" }}
      role="status"
      aria-label="Carregando experiências..."
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Header */}
        <VStack gap="5" mb={{ base: "12", md: "16" }} align="flex-start">
          <Barra w="180px" h="0.75rem" opacity={0.4} />
          <Barra w="min(340px, 80vw)" h="3rem" opacity={0.3} />
          <Barra w="min(460px, 90vw)" h="1rem" opacity={0.25} />
        </VStack>

        {/* Timeline */}
        <Box
          position="relative"
          borderLeft={`1px solid ${cores.border.DEFAULT}`}
          ml={{ base: "0", md: "1" }}
        >
          <ItemTimelineSkeleton />
          <ItemTimelineSkeleton />
          <ItemTimelineSkeleton />
          <ItemTimelineSkeleton />
        </Box>
      </Box>
    </Box>
  );
}
