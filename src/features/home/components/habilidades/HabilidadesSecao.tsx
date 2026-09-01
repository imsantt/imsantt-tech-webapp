import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { CardSkeleton } from "@/components/ui/card-experiencia/fragments/card-experiencia-skeleton/card-experiencia-skeleton.fragment";
import { useHabilidades } from "@/hooks/use-habilidades/useHabilidades.hook";
import { cores, layout } from "@/lib/tema/tokens";
import type { CategoriaHabilidade } from "@/types/habilidade";
import * as s from "./HabilidadesSecao.styles";

const CardHabilidade = memo(function CardHabilidade({
  item,
  indice,
}: {
  item: CategoriaHabilidade;
  indice: number;
}) {
  const Icone = item.icone;

  return (
    <Flex
      as="article"
      aria-label={item.titulo}
      direction="column"
      gap="5"
      css={s.cardHabilidade(item)}
    >
      {/* Cabeçalho do card — ícone + índice */}
      <Flex justify="space-between" align="flex-start">
        <Box css={s.cardIcone(item)} aria-hidden="true">
          <Box as={Icone} fontSize="20px" color={item.iconeColor} />
        </Box>
        <Text css={s.cardIndice(item)} aria-hidden="true">
          {String(indice + 1).padStart(2, "0")}
        </Text>
      </Flex>

      <Heading as="h3" css={s.cardTitulo}>
        {item.titulo}
      </Heading>

      <Text css={s.cardDescricao}>{item.descricao}</Text>

      <Flex
        flexWrap="wrap"
        gap="2"
        mt="1"
        aria-label="Tecnologias relacionadas"
      >
        {item.habilidades.slice(0, s.MAX_TAGS_HOME).map((hab) => (
          <Box key={hab.nome} as="span" css={s.cardTag(item)}>
            {hab.icone && <Box as={hab.icone} fontSize="11px" />}
            {hab.nome}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
});

export function HabilidadesSecao() {
  const { categorias, isLoading, isError } = useHabilidades();

  return (
    <Box
      as="section"
      id="habilidades"
      aria-labelledby="habilidades-titulo"
      css={s.secao}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <Grid css={s.cabecalhoGrid}>
          <VStack align="flex-start" gap="5">
            <HStack gap="3" align="center">
              <Box css={s.eyebrowTraco} aria-hidden="true" />
              <Text css={s.eyebrowTexto}>02 — Competências</Text>
            </HStack>

            <Heading as="h2" id="habilidades-titulo" css={s.titulo}>
              O que eu faço
            </Heading>
          </VStack>

          <VStack align="flex-end">
            <Text css={s.subtitulo} textAlign="right">
              Combinando engenharia de alta performance com estratégia de
              negócio e impacto humano.
            </Text>
          </VStack>
        </Grid>

        <Grid css={s.cardsGrid}>
          {isLoading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {isError && (
            <Text color={cores.danger.light} fontSize="sm">
              Não foi possível carregar as habilidades.
            </Text>
          )}

          {!isLoading &&
            !isError &&
            categorias.map((item, indice) => (
              <CardHabilidade key={item.id} item={item} indice={indice} />
            ))}
        </Grid>

        {/* Link para página detalhada */}
        <Flex justify="flex-start" mt={{ base: "10", md: "14" }}>
          <Link
            to="/habilidades"
            aria-label="Ver todas as habilidades detalhadas"
            style={s.linkVerTodas}
          >
            Ver todas as habilidades
            <FiArrowRight size={15} aria-hidden="true" />
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
