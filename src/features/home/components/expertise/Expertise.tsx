import { memo } from "react";
import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { CardSkeleton } from "@/components/ui/card-skeleton/CardSkeleton";
import { ErrorBoundary } from "@/components/ui/error-boundary/ErrorBoundary";
import { useExpertises } from "@/hooks/use-expertises/useExpertises.hook";
import { cores, raio, sombras, transicao, layout } from "@/lib/tema/tokens";
import type { Expertise as ExpertiseType } from "@/types/expertise";

const CardExpertise = memo(function CardExpertise({
  item,
}: {
  item: ExpertiseType;
}) {
  const Icone = item.icone;

  return (
    <Flex
      as="article"
      aria-label={item.titulo}
      direction="column"
      gap="5"
      bg={cores.bg.card}
      border={`1px solid ${cores.borda.sutil}`}
      borderRadius={raio["2xl"]}
      p="8"
      transition={transicao.lenta}
      _hover={{
        borderColor: cores.primaria.borda,
        transform: "translateY(-4px)",
        boxShadow: sombras.destaque,
      }}
    >
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="48px"
        h="48px"
        bg={item.iconeBg}
        borderRadius={raio.xl}
        flexShrink={0}
        aria-hidden="true"
      >
        <Box as={Icone} fontSize="22px" color={item.iconeColor} />
      </Box>

      <Heading
        as="h3"
        fontSize="lg"
        fontWeight="700"
        color={cores.texto.titulo}
      >
        {item.titulo}
      </Heading>

      <Text fontSize="sm" color={cores.texto.corpo} lineHeight="1.7" flex={1}>
        {item.descricao}
      </Text>

      <Flex
        flexWrap="wrap"
        gap="2"
        mt="1"
        aria-label="Tecnologias relacionadas"
      >
        {item.tecnologias.map((tec) => (
          <Box
            key={tec}
            as="span"
            fontSize="xs"
            fontWeight="500"
            color={cores.primaria.claro}
            bg={cores.primaria.sutil}
            border={`1px solid ${cores.primaria.borda}`}
            px="2.5"
            py="1"
            borderRadius={raio.full}
            whiteSpace="nowrap"
          >
            {tec}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
});

function ExpertiseConteudo() {
  const { expertises, isLoading, isError } = useExpertises();

  return (
    <Box
      as="section"
      id="expertise"
      aria-labelledby="expertise-titulo"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.bg.sutil}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color={cores.primaria.claro}
          >
            Expertise
          </Text>

          <Heading
            as="h2"
            id="expertise-titulo"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="800"
            letterSpacing="-1px"
            color={cores.texto.titulo}
          >
            O que eu faço
          </Heading>

          <Text
            fontSize="md"
            color={cores.texto.corpo}
            maxW="480px"
            lineHeight="1.6"
          >
            Combinando engenharia de alta performance com estratégia de negócio
            e impacto humano.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="5">
          {isLoading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {isError && (
            <Text color={cores.erro.claro} fontSize="sm">
              Não foi possível carregar as competências.
            </Text>
          )}

          {!isLoading &&
            !isError &&
            expertises.map((item) => (
              <CardExpertise key={item.id} item={item} />
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export function Expertise() {
  return (
    <ErrorBoundary>
      <ExpertiseConteudo />
    </ErrorBoundary>
  );
}
