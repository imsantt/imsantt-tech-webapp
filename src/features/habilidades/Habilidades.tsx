import { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { cores, raio, tipografia, transicao, layout } from "@/lib/tema/tokens";
import { HabilidadesPageSkeleton } from "./fragments/habilidades-page-skeleton/habilidades-page-skeleton.fragment";
import { useHabilidades } from "@/hooks/use-habilidades/useHabilidades.hook";
import type {
  CategoriaHabilidade,
  Habilidade,
  NivelHabilidade,
} from "@/types/habilidade";

/** Rótulos legíveis para cada nível de proficiência. */
const ROTULO_NIVEL: Record<NivelHabilidade, string> = {
  especialista: "Especialista",
  avancado: "Avançado",
  proficiente: "Proficiente",
};

/** Peso visual (opacidade do indicador) por nível. */
const OPACIDADE_NIVEL: Record<NivelHabilidade, number> = {
  especialista: 1,
  avancado: 0.65,
  proficiente: 0.4,
};

/** Normaliza texto para busca acento-insensível. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Índice numérico formatado (01, 02, ...). */
function indice(n: number): string {
  return String(n + 1).padStart(2, "0");
}

/** Indicador discreto de nível — três traços que se preenchem conforme a proficiência. */
function IndicadorNivel({
  nivel,
  cor,
}: {
  nivel: NivelHabilidade;
  cor: string;
}) {
  const ativos = nivel === "especialista" ? 3 : nivel === "avancado" ? 2 : 1;

  return (
    <HStack gap="0.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          w="10px"
          h="2px"
          borderRadius="full"
          bg={cor}
          opacity={i < ativos ? OPACIDADE_NIVEL[nivel] : 0.15}
          transition={transicao.rapida}
        />
      ))}
    </HStack>
  );
}

/**
 * Linha de competência — nome, nível e descrição visíveis.
 * Layout editorial: rótulo à esquerda, descrição à direita.
 */
function ItemHabilidade({
  habilidade,
  categoria,
  destaque,
}: {
  habilidade: Habilidade;
  categoria: CategoriaHabilidade;
  destaque: boolean;
}) {
  return (
    <Grid
      as="li"
      templateColumns={{ base: "1fr", md: "minmax(0, 15rem) 1fr" }}
      gap={{ base: "1.5", md: "6" }}
      alignItems="baseline"
      py="4"
      px={{ base: "0", md: "2" }}
      borderRadius={raio.md}
      bg={destaque ? categoria.corFundo : "transparent"}
      transition={transicao.rapida}
      _hover={{ bg: categoria.corFundo }}
    >
      {/* Nome + nível */}
      <Box>
        <Flex align="center" gap="2">
          {habilidade.icone && (
            <Box
              as={habilidade.icone}
              fontSize="14px"
              color={categoria.cor}
              flexShrink={0}
              aria-hidden="true"
            />
          )}
          <Text
            fontFamily={tipografia.familia.mono}
            fontSize="sm"
            fontWeight={tipografia.peso.medium}
            color={cores.text.heading}
          >
            {habilidade.nome}
          </Text>
        </Flex>

        {habilidade.nivel && (
          <Flex align="center" gap="2.5" mt="2">
            <IndicadorNivel nivel={habilidade.nivel} cor={categoria.cor} />
            <Text
              fontFamily={tipografia.familia.mono}
              fontSize="10px"
              letterSpacing={tipografia.tracking.label}
              textTransform="uppercase"
              color={categoria.cor}
              opacity={0.85}
            >
              {ROTULO_NIVEL[habilidade.nivel]}
            </Text>
          </Flex>
        )}
      </Box>

      {/* Descrição */}
      {habilidade.descricao ? (
        <Text
          fontSize="sm"
          color={cores.text.body}
          lineHeight={String(tipografia.alturaLinha.relaxada)}
        >
          {habilidade.descricao}
        </Text>
      ) : (
        <Box aria-hidden="true" />
      )}
    </Grid>
  );
}

/** Seção completa de uma categoria. */
function SecaoCategoria({
  categoria,
  ordem,
  termo,
}: {
  categoria: CategoriaHabilidade;
  ordem: number;
  termo: string;
}) {
  const termoNorm = normalizar(termo.trim());

  const habilidadesComDestaque = useMemo(
    () =>
      categoria.habilidades.map((hab) => ({
        hab,
        destaque:
          termoNorm.length > 0 &&
          (normalizar(hab.nome).includes(termoNorm) ||
            (hab.descricao
              ? normalizar(hab.descricao).includes(termoNorm)
              : false)),
      })),
    [categoria.habilidades, termoNorm],
  );

  return (
    <Box
      as="section"
      id={`cat-${categoria.id}`}
      aria-labelledby={`cat-titulo-${categoria.id}`}
      scrollMarginTop="7rem"
      css={{
        "&::before": {
          content: '""',
          display: "block",
          width: "40px",
          height: "2px",
          background: categoria.cor,
          opacity: 0.8,
          marginBottom: "2rem",
        },
      }}
    >
      {/* Cabeçalho da seção */}
      <Grid
        templateColumns={{ base: "1fr", md: "minmax(0, 22rem) 1fr" }}
        gap={{ base: "5", md: "10" }}
        alignItems="start"
        mb={{ base: "6", md: "8" }}
      >
        <Box>
          <Flex align="center" gap="3" mb="4">
            <Text
              fontFamily={tipografia.familia.mono}
              fontSize="xs"
              fontWeight={tipografia.peso.medium}
              letterSpacing={tipografia.tracking.label}
              color={categoria.cor}
              opacity={0.7}
            >
              {indice(ordem)}
            </Text>
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
              {categoria.habilidades.length} itens
            </Box>
          </Flex>

          <Heading
            as="h2"
            id={`cat-titulo-${categoria.id}`}
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight={tipografia.peso.light}
            letterSpacing={tipografia.tracking.tituloAmplo}
            lineHeight={String(tipografia.alturaLinha.titulo)}
            color={cores.text.heading}
          >
            {categoria.titulo}
          </Heading>
        </Box>

        {categoria.descricao && (
          <Text
            fontSize="md"
            color={cores.text.body}
            lineHeight={String(tipografia.alturaLinha.relaxada)}
            maxW="54ch"
            pt={{ base: "0", md: "1" }}
          >
            {categoria.descricao}
          </Text>
        )}
      </Grid>

      {/* Lista de competências */}
      <VStack
        as="ul"
        align="stretch"
        gap="0"
        listStyleType="none"
        borderTop={`1px solid ${cores.border.subtle}`}
        css={{
          "& > li:not(:last-of-type)": {
            borderBottom: `1px solid ${cores.border.subtle}`,
          },
        }}
      >
        {habilidadesComDestaque.map(({ hab, destaque }) => (
          <ItemHabilidade
            key={hab.nome}
            habilidade={hab}
            categoria={categoria}
            destaque={destaque}
          />
        ))}
      </VStack>
    </Box>
  );
}

/** Índice de navegação — chips que rolam suavemente até cada seção. */
function IndiceNavegacao({
  categorias,
}: {
  categorias: CategoriaHabilidade[];
}) {
  return (
    <Flex
      as="nav"
      aria-label="Índice de categorias"
      flexWrap="wrap"
      gap="2"
      mb={{ base: "12", md: "16" }}
    >
      {categorias.map((cat) => (
        <Link
          key={cat.id}
          href={`#cat-${cat.id}`}
          display="inline-flex"
          alignItems="center"
          gap="2"
          fontFamily={tipografia.familia.mono}
          fontSize="xs"
          fontWeight="400"
          color={cores.text.body}
          bg={cores.background.card}
          border={`1px solid ${cores.border.DEFAULT}`}
          px="3"
          py="2"
          borderRadius={raio.md}
          transition={transicao.rapida}
          _hover={{
            borderColor: cat.corBorda,
            color: cat.cor,
            textDecoration: "none",
          }}
          _focusVisible={{
            outline: `2px solid ${cat.cor}`,
            outlineOffset: "2px",
          }}
        >
          <Box
            w="6px"
            h="6px"
            borderRadius="full"
            bg={cat.cor}
            flexShrink={0}
            aria-hidden="true"
          />
          {cat.titulo}
        </Link>
      ))}
    </Flex>
  );
}

export function Habilidades() {
  const { categorias, isLoading, isError } = useHabilidades();
  const [busca, setBusca] = useState("");

  const totalHabilidades = categorias.reduce(
    (acc, cat) => acc + cat.habilidades.length,
    0,
  );

  const buscaNorm = normalizar(busca.trim());

  const categoriasFiltradas = useMemo(() => {
    if (buscaNorm.length === 0) return categorias;

    return categorias.filter((cat) => {
      const casaCategoria =
        normalizar(cat.titulo).includes(buscaNorm) ||
        normalizar(cat.descricao).includes(buscaNorm);

      const casaHabilidade = cat.habilidades.some(
        (hab) =>
          normalizar(hab.nome).includes(buscaNorm) ||
          (hab.descricao
            ? normalizar(hab.descricao).includes(buscaNorm)
            : false),
      );

      return casaCategoria || casaHabilidade;
    });
  }, [categorias, buscaNorm]);

  const semResultados =
    !isLoading &&
    !isError &&
    buscaNorm.length > 0 &&
    categoriasFiltradas.length === 0;

  const mostrarIndice =
    !isLoading && !isError && buscaNorm.length === 0 && categorias.length > 0;

  if (isLoading) {
    return <HabilidadesPageSkeleton />;
  }

  return (
    <Box
      as="main"
      id="conteudo-principal"
      minH="100svh"
      bg={cores.background.base}
      pt={{ base: "28", md: "32" }}
      pb={{ base: "16", md: "24" }}
      px={{ base: "5", md: "12", lg: "24" }}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Header da página */}
        <VStack
          gap="5"
          mb={{ base: "8", md: "10" }}
          textAlign="left"
          align="flex-start"
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
              Índice · Competências
            </Text>
          </HStack>

          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight={tipografia.peso.light}
            letterSpacing={tipografia.tracking.tituloAmplo}
            lineHeight={String(tipografia.alturaLinha.titulo)}
            color={cores.text.heading}
          >
            Stack Completa
          </Heading>

          <Text
            fontSize="md"
            color={cores.text.body}
            maxW="52ch"
            lineHeight={String(tipografia.alturaLinha.relaxada)}
          >
            {totalHabilidades > 0
              ? `${totalHabilidades} tecnologias e competências organizadas por área de atuação, com nível de proficiência e contexto de aplicação.`
              : "Tecnologias e competências organizadas por área de atuação."}
          </Text>
        </VStack>

        {/* Busca dinâmica */}
        <Box mb={{ base: "10", md: "12" }} maxW="30rem">
          <Flex
            align="center"
            gap="2.5"
            bg={cores.background.card}
            border={`1px solid ${cores.border.DEFAULT}`}
            borderRadius={raio.lg}
            px="4"
            py="2.5"
            transition={transicao.rapida}
            _focusWithin={{ borderColor: cores.accent.border }}
          >
            <Box
              as={FiSearch}
              fontSize="15px"
              color={cores.text.subtle}
              flexShrink={0}
              aria-hidden="true"
            />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar competência ou tecnologia..."
              aria-label="Buscar competência ou tecnologia"
              border="none"
              bg="transparent"
              px="0"
              h="auto"
              fontSize="sm"
              color={cores.text.heading}
              _placeholder={{ color: cores.text.subtle }}
              _focusVisible={{ outline: "none", boxShadow: "none" }}
            />
            {buscaNorm.length > 0 && (
              <Text
                fontFamily={tipografia.familia.mono}
                fontSize="xs"
                color={cores.text.subtle}
                whiteSpace="nowrap"
              >
                {categoriasFiltradas.length}/{categorias.length}
              </Text>
            )}
          </Flex>
        </Box>

        {/* Índice de navegação */}
        {mostrarIndice && <IndiceNavegacao categorias={categorias} />}

        {isError && (
          <Text color={cores.danger.light} fontSize="sm">
            Não foi possível carregar as habilidades.
          </Text>
        )}

        {/* Seções por categoria */}
        {!isError && (
          <VStack as="div" align="stretch" gap={{ base: "16", md: "24" }}>
            {categoriasFiltradas.map((categoria, i) => (
              <SecaoCategoria
                key={categoria.id}
                categoria={categoria}
                ordem={i}
                termo={busca}
              />
            ))}
          </VStack>
        )}

        {semResultados && (
          <Text color={cores.text.body} fontSize="sm" mt="2">
            Nenhuma competência encontrada para{" "}
            <Box as="span" color={cores.text.heading} fontWeight="500">
              &ldquo;{busca.trim()}&rdquo;
            </Box>
            .
          </Text>
        )}
      </Box>
    </Box>
  );
}
