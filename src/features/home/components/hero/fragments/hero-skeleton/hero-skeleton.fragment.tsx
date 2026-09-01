import { Box, Flex, HStack } from "@chakra-ui/react";
import { cores, raio, layout } from "@/lib/tema/tokens";

/**
 * Skeleton do Hero — mantém o layout para evitar CLS.
 */
export function HeroSkeleton() {
  return (
    <Box
      as="section"
      minH="100svh"
      display="flex"
      alignItems="center"
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.background.base}
      role="status"
      aria-label="Carregando hero..."
    >
      <Flex
        maxW={layout.maxWidth}
        mx="auto"
        w="full"
        align="center"
        justify="space-between"
        gap={{ base: "12", md: "16" }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Flex direction="column" gap="6" maxW={{ md: "520px" }} flex={1}>
          <Box
            h="1.5rem"
            w="140px"
            bg={cores.border.DEFAULT}
            borderRadius={raio.full}
            opacity={0.4}
          />
          <Box
            h="3.5rem"
            w="80%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.md}
            opacity={0.3}
          />
          <Box
            h="1rem"
            w="100%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.25}
          />
          <Box
            h="1rem"
            w="90%"
            bg={cores.border.DEFAULT}
            borderRadius={raio.sm}
            opacity={0.2}
          />
          <HStack gap="3" mt="2">
            <Box
              h="2.75rem"
              w="140px"
              bg={cores.border.DEFAULT}
              borderRadius={raio.lg}
              opacity={0.3}
            />
            <Box
              h="2.75rem"
              w="160px"
              bg={cores.border.DEFAULT}
              borderRadius={raio.lg}
              opacity={0.25}
            />
          </HStack>
        </Flex>

        <Box
          w={{ base: "240px", md: "340px" }}
          h={{ base: "240px", md: "340px" }}
          borderRadius={raio.full}
          bg={cores.border.DEFAULT}
          opacity={0.3}
          flexShrink={0}
        />
      </Flex>
    </Box>
  );
}
