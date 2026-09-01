import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  cores,
  raio,
  sombras,
  tipografia,
  transicao,
  layout,
} from "@/lib/tema/tokens";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { useHabilidades } from "@/hooks/use-habilidades/useHabilidades.hook";
import type { CategoriaHabilidade } from "@/types/habilidade";

function CardCategoria({ categoria }: { categoria: CategoriaHabilidade }) {
  return (
    <Box
      as="article"
      aria-labelledby={`cat-${categoria.id}`}
      bg={cores.bg.card}
      border={`1px solid ${cores.borda.DEFAULT}`}
      borderRadius={raio["2xl"]}
      p={{ base: "6", md: "8" }}
      position="relative"
      overflow="hidden"
      transition={transicao.elevacao}
      _hover={{
        borderColor: categoria.corBorda,
        transform: "translateY(-3px)",
        boxShadow: categoria.corGlow
          ? `0 12px 40px ${categoria.corGlow}`
          : sombras.card,
      }}
      css={{
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: categoria.cor,
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover::before": { opacity: 0.8 },
      }}
    >
      {/* Cabeçalho da categoria */}
      <Flex align="center" gap="3" mb="6">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="40px"
          h="40px"
          bg={categoria.iconeBg}
          border={`1px solid ${categoria.corBorda}`}
          borderRadius={raio.md}
          flexShrink={0}
          aria-hidden="true"
        >
          <Box
            as={categoria.icone}
            fontSize="18px"
            color={categoria.iconeColor}
          />
        </Box>
        <Heading
          as="h3"
          id={`cat-${categoria.id}`}
          fontSize={{ base: "md", md: "lg" }}
          fontWeight={tipografia.peso.semibold}
          letterSpacing={tipografia.tracking.titulo}
          color={cores.texto.titulo}
        >
          {categoria.titulo}
        </Heading>
        <Box
          as="span"
          fontFamily={tipografia.familia.mono}
          fontSize="xs"
          fontWeight="500"
          color={categoria.cor}
          opacity={0.7}
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
            fontFamily={tipografia.familia.mono}
            fontSize="xs"
            fontWeight="400"
            color={categoria.cor}
            bg={categoria.corFundo}
            border={`1px solid ${categoria.corBorda}`}
            px="2.5"
            py="1.5"
            borderRadius={raio.sm}
            whiteSpace="nowrap"
            transition={transicao.rapida}
            _hover={{
              borderColor: categoria.cor,
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
        <VStack
          gap="5"
          mb={{ base: "12", md: "16" }}
          textAlign="left"
          align="flex-start"
        >
          <HStack gap="3" align="center">
            <Box
              w="24px"
              h="1px"
              bg={cores.acento.DEFAULT}
              aria-hidden="true"
            />
            <Text
              fontFamily={tipografia.familia.mono}
              fontSize="xs"
              fontWeight={tipografia.peso.medium}
              letterSpacing={tipografia.tracking.label}
              textTransform="uppercase"
              color={cores.acento.claro}
            >
              Índice · Competências
            </Text>
          </HStack>

          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight={tipografia.peso.light}
            letterSpacing={tipografia.tracking.tituloAmplo}
            lineHeight={String(tipografia.alturaLinha.titulo)}
            color={cores.texto.titulo}
          >
            Stack Completa
          </Heading>

          <Text
            fontSize="md"
            color={cores.texto.corpo}
            maxW="52ch"
            lineHeight={String(tipografia.alturaLinha.relaxada)}
          >
            {totalHabilidades > 0
              ? `${totalHabilidades} tecnologias e competências organizadas por área de atuação.`
              : "Tecnologias e competências organizadas por área de atuação."}
          </Text>
        </VStack>

        {/* Grid de categorias */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="4">
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
