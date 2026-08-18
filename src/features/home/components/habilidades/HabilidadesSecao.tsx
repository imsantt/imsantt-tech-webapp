import { memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { CardSkeleton } from "@/components/ui/card-skeleton/CardSkeleton";
import { ErrorBoundary } from "@/components/ui/error-boundary/ErrorBoundary";
import { useHabilidades } from "@/hooks/use-habilidades/useHabilidades.hook";
import { cores, raio, sombras, transicao, layout } from "@/lib/tema/tokens";
import type { CategoriaHabilidade } from "@/types/habilidade";

/** Máximo de tags exibidas por card na Home */
const MAX_TAGS_HOME = 6;

const CardHabilidade = memo(function CardHabilidade({
  item,
}: {
  item: CategoriaHabilidade;
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
        borderColor: item.corBorda,
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
        {item.habilidades.slice(0, MAX_TAGS_HOME).map((hab) => (
          <Box
            key={hab.nome}
            as="span"
            display="inline-flex"
            alignItems="center"
            gap="1"
            fontSize="xs"
            fontWeight="500"
            color={item.cor}
            bg={item.corFundo}
            border={`1px solid ${item.corBorda}`}
            px="2.5"
            py="1"
            borderRadius={raio.full}
            whiteSpace="nowrap"
          >
            {hab.icone && <Box as={hab.icone} fontSize="10px" />}
            {hab.nome}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
});

function HabilidadesConteudo() {
  const { categorias, isLoading, isError } = useHabilidades();

  return (
    <Box
      as="section"
      id="habilidades"
      aria-labelledby="habilidades-titulo"
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
            Habilidades
          </Text>

          <Heading
            as="h2"
            id="habilidades-titulo"
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

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="5"
        >
          {isLoading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {isError && (
            <Text color={cores.erro.claro} fontSize="sm">
              Não foi possível carregar as habilidades.
            </Text>
          )}

          {!isLoading &&
            !isError &&
            categorias.map((item) => (
              <CardHabilidade key={item.id} item={item} />
            ))}
        </Grid>

        {/* Link para página detalhada */}
        <Flex justify="center" mt={{ base: "8", md: "12" }}>
          <Link
            to="/habilidades"
            aria-label="Ver todas as habilidades detalhadas"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: cores.primaria.claro,
              fontWeight: 600,
              fontSize: "14px",
              padding: "10px 20px",
              borderRadius: raio.lg,
              border: `1px solid ${cores.primaria.borda}`,
              backgroundColor: cores.primaria.sutil,
              textDecoration: "none",
              transition: transicao.lenta,
            }}
          >
            Ver todas as habilidades <span aria-hidden="true">→</span>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

export function HabilidadesSecao() {
  return (
    <ErrorBoundary>
      <HabilidadesConteudo />
    </ErrorBoundary>
  );
}
