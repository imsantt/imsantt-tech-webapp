import { Box, Flex } from "@chakra-ui/react";
import { cores, raio, componentes } from "@/lib/tema/tokens";

/**
 * Skeleton placeholder para cards em estado de loading.
 * Mantém o mesmo layout do card real para evitar layout shift.
 */
export function CardSkeleton() {
  return (
    <Flex
      direction="column"
      gap="4"
      h={componentes.card.altura}
      bg={cores.background.card}
      border={`1px solid ${cores.border.subtle}`}
      borderRadius={raio["2xl"]}
      p="6"
      overflow="hidden"
    >
      {/* Título skeleton */}
      <Box
        h="1.3rem"
        w="80%"
        bg={cores.border.DEFAULT}
        borderRadius={raio.md}
        opacity={0.5}
      />
      <Box
        h="1.3rem"
        w="50%"
        bg={cores.border.DEFAULT}
        borderRadius={raio.md}
        opacity={0.3}
      />

      {/* Header skeleton */}
      <Flex gap="3" align="center" mt="2">
        <Box
          w="38px"
          h="38px"
          bg={cores.border.DEFAULT}
          borderRadius={raio.lg}
          opacity={0.4}
        />
        <Flex direction="column" gap="2" flex={1}>
          <Box
            h="0.75rem"
            w="40%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.4}
          />
          <Box
            h="0.6rem"
            w="60%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.3}
          />
        </Flex>
      </Flex>

      {/* Descrição skeleton */}
      <Flex direction="column" gap="2" mt="2" flex={1}>
        <Box
          h="0.7rem"
          w="100%"
          bg={cores.border.DEFAULT}
          borderRadius={raio.sm}
          opacity={0.3}
        />
        <Box
          h="0.7rem"
          w="95%"
          bg={cores.border.DEFAULT}
          borderRadius={raio.sm}
          opacity={0.25}
        />
        <Box
          h="0.7rem"
          w="70%"
          bg={cores.border.DEFAULT}
          borderRadius={raio.sm}
          opacity={0.2}
        />
      </Flex>

      {/* Tags skeleton */}
      <Flex gap="2" mt="auto">
        <Box
          h="1.5rem"
          w="4rem"
          bg={cores.border.DEFAULT}
          borderRadius={raio.full}
          opacity={0.3}
        />
        <Box
          h="1.5rem"
          w="3.5rem"
          bg={cores.border.DEFAULT}
          borderRadius={raio.full}
          opacity={0.25}
        />
        <Box
          h="1.5rem"
          w="4.5rem"
          bg={cores.border.DEFAULT}
          borderRadius={raio.full}
          opacity={0.2}
        />
      </Flex>
    </Flex>
  );
}
