import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio, sombras, transicao, layout } from "@/lib/tema/tokens";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { useHabilidades } from "@/hooks/use-habilidades/useHabilidades.hook";
import type { CategoriaHabilidade } from "@/types/habilidade";

function CardCategoria({ categoria }: { categoria: CategoriaHabilidade }) {
  return (
    <Box
      as="article"
      aria-labelledby={`cat-${categoria.id}`}
      bg={cores.bg.card}
      border={`1px solid ${cores.borda.sutil}`}
      borderRadius={raio["2xl"]}
      p={{ base: "6", md: "8" }}
      transition={transicao.lenta}
      _hover={{
        borderColor: categoria.corBorda,
        boxShadow: sombras.destaque,
      }}
    >
      {/* Cabeçalho da categoria */}
      <Flex align="center" gap="3" mb="5">
        <Box
          w="4px"
          h="24px"
          bg={categoria.cor}
          borderRadius={raio.full}
          flexShrink={0}
        />
        <Heading
          as="h3"
          id={`cat-${categoria.id}`}
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="700"
          color={cores.texto.titulo}
        >
          {categoria.titulo}
        </Heading>
        <Box
          as="span"
          fontSize="xs"
          fontWeight="600"
          color={categoria.cor}
          bg={categoria.corFundo}
          border={`1px solid ${categoria.corBorda}`}
          px="2"
          py="0.5"
          borderRadius={raio.full}
          ml="auto"
          whiteSpace="nowrap"
        >
          {categoria.habilidades.length}
        </Box>
      </Flex>

      {/* Tags */}
      <Flex flexWrap="wrap" gap="2">
        {categoria.habilidades.map((hab) => (
          <Box
            key={hab.nome}
            as="span"
            display="inline-flex"
            alignItems="center"
            gap="1.5"
            fontSize="xs"
            fontWeight="500"
            color={categoria.cor}
            bg={categoria.corFundo}
            border={`1px solid ${categoria.corBorda}`}
            px="3"
            py="1.5"
            borderRadius={raio.full}
            whiteSpace="nowrap"
            transition={transicao.rapida}
            _hover={{
              bg: categoria.corBorda,
              transform: "translateY(-1px)",
            }}
          >
            {hab.icone && <Box as={hab.icone} fontSize="11px" />}
            {hab.nome}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export function Habilidades() {
  const { categorias, isLoading, isError } = useHabilidades();

  const totalHabilidades = categorias.reduce(
    (acc, cat) => acc + cat.habilidades.length,
    0,
  );

  return (
    <Box
      as="main"
      id="conteudo-principal"
      minH="100svh"
      bg={cores.bg.base}
      pt={{ base: "28", md: "32" }}
      pb={{ base: "16", md: "24" }}
      px={{ base: "5", md: "12", lg: "24" }}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Header da página */}
        <VStack gap="4" mb={{ base: "12", md: "16" }} textAlign="center">
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
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            letterSpacing="-1px"
            color={cores.texto.titulo}
          >
            Stack Completa
          </Heading>

          <Text
            fontSize="md"
            color={cores.texto.corpo}
            maxW="560px"
            lineHeight="1.6"
          >
            {totalHabilidades > 0
              ? `${totalHabilidades} tecnologias e competências organizadas por área de atuação.`
              : "Tecnologias e competências organizadas por área de atuação."}
          </Text>
        </VStack>

        {/* Grid de categorias */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="5">
          {isLoading && (
            <>
              <CardSkeleton />
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
            categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
