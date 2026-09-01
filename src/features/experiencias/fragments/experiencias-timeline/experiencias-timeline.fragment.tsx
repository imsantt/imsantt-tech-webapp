import { Box, Text, VStack } from "@chakra-ui/react";
import { cores, raio } from "@/lib/tema/tokens";
import { useExperiencias } from "@/hooks/use-experiencias/useExperiencias.hook";
import { ItemTimeline } from "../item-timeline/item-timeline.fragment";

/**
 * Acentos cromáticos cíclicos por experiência — dão ritmo cronológico à
 * timeline sem depender de dados de cor no modelo de domínio.
 */
const ACENTOS = [
  cores.category.violet,
  cores.category.cyan,
  cores.category.emerald,
  cores.category.gold,
  cores.category.rose,
  cores.category.amber,
];

/**
 * Seção de experiência profissional — timeline vertical.
 * Self-contained: busca os próprios dados via useExperiencias.
 */
export function ExperienciasTimeline() {
  const { experiencias, isLoading, isError } = useExperiencias();

  if (isError) {
    return (
      <Text color={cores.danger.light} fontSize="sm">
        Não foi possível carregar as experiências.
      </Text>
    );
  }

  if (isLoading) {
    return (
      <VStack align="stretch" gap="10" pl={{ base: "8", md: "12" }}>
        {[0, 1, 2, 3].map((i) => (
          <VStack key={i} align="flex-start" gap="3">
            <Box
              h="0.7rem"
              w="10rem"
              bg={cores.border.DEFAULT}
              borderRadius={raio.sm}
              opacity={0.3}
            />
            <Box
              h="1.6rem"
              w="min(60%, 24rem)"
              bg={cores.border.DEFAULT}
              borderRadius={raio.sm}
              opacity={0.3}
            />
            <Box
              h="0.8rem"
              w="min(90%, 40rem)"
              bg={cores.border.DEFAULT}
              borderRadius={raio.sm}
              opacity={0.2}
            />
          </VStack>
        ))}
      </VStack>
    );
  }

  return (
    <Box
      position="relative"
      borderLeft={`1px solid ${cores.border.DEFAULT}`}
      ml={{ base: "0", md: "1" }}
    >
      {experiencias.map((exp, i) => (
        <ItemTimeline
          key={exp.id}
          exp={exp}
          indice={i}
          acento={ACENTOS[i % ACENTOS.length]}
        />
      ))}
    </Box>
  );
}
