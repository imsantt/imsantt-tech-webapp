import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { CardExperiencia } from "@/components/ui/card-experiencia";
import type { AcentoCard } from "@/components/ui/card-experiencia/CardExperiencia.component";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { CardExperienciaError } from "@/components/ui/card-experiencia/fragments/card-experiencia-error/card-experiencia-error.fragment";
import { ErrorBoundary } from "@/components/ui/error-boundary/ErrorBoundary";
import { useExperiencias } from "@/hooks/use-experiencias/useExperiencias.hook";
import { cores, layout, tipografia } from "@/lib/tema/tokens";

/**
 * Acentos cromáticos cíclicos por experiência — dão ritmo cronológico à
 * seção sem depender de dados de cor no modelo de domínio.
 */
const ACENTOS_TRAJETORIA: AcentoCard[] = [
  cores.category.violet,
  cores.category.cyan,
  cores.category.emerald,
  cores.category.gold,
  cores.category.rose,
  cores.category.amber,
];

function TrajetoriaConteudo() {
  const { experiencias, isLoading, isError } = useExperiencias();
  const anosExperiencia = DateTime.now().get("year") - 2019;

  return (
    <Box
      as="section"
      id="trajetoria"
      aria-labelledby="trajetoria-titulo"
      py={{ base: "20", md: "28" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.background.base}
      borderTop={`1px solid ${cores.border.DEFAULT}`}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Cabeçalho */}
        <VStack
          align="flex-start"
          gap="5"
          mb={{ base: "12", md: "16" }}
          textAlign="left"
        >
          <HStack gap="3" align="center">
            <Box
              w="24px"
              h="1px"
              bg={cores.accent.DEFAULT}
              aria-hidden="true"
            />
            <Text
              fontFamily={tipografia.familia.mono}
              fontSize="xs"
              fontWeight={tipografia.peso.medium}
              letterSpacing={tipografia.tracking.label}
              textTransform="uppercase"
              color={cores.accent.light}
            >
              03 — Trajetória
            </Text>
          </HStack>

          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            gap="6"
            w="full"
          >
            <Heading
              as="h2"
              id="trajetoria-titulo"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight={tipografia.peso.light}
              letterSpacing={tipografia.tracking.tituloAmplo}
              lineHeight={String(tipografia.alturaLinha.titulo)}
              color={cores.text.heading}
            >
              Experiência Profissional
            </Heading>

            <Text
              fontSize="md"
              color={cores.text.body}
              maxW="42ch"
              lineHeight={String(tipografia.alturaLinha.relaxada)}
            >
              +{anosExperiencia} anos construindo software escalável e liderando
              equipes em empresas de impacto.
            </Text>
          </Flex>
        </VStack>

        {/* Grid de cards */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="4"
        >
          {isLoading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {isError && (
            <Text color={cores.danger.light} fontSize="sm">
              Não foi possível carregar as experiências.
            </Text>
          )}

          {!isLoading &&
            !isError &&
            experiencias.map((exp, i) => (
              <ErrorBoundary key={exp.id} fallback={<CardExperienciaError />}>
                <CardExperiencia
                  exp={exp}
                  indice={i}
                  acento={ACENTOS_TRAJETORIA[i % ACENTOS_TRAJETORIA.length]}
                />
              </ErrorBoundary>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export function Trajetoria() {
  return <TrajetoriaConteudo />;
}
