import { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { cores, raio, tipografia } from "@/lib/tema/tokens";
import { useCertificacoes } from "@/hooks/use-certificacoes/useCertificacoes.hook";
import type { CategoriaCertificacao } from "@/types/certificacao";
import { CardCertificacao } from "../card-certificacao/card-certificacao.fragment";
import { CATEGORIAS } from "../card-certificacao/certificacao-categorias";
import { ChipFiltro } from "../chip-filtro/chip-filtro.fragment";

/** Ordem de exibição dos filtros. */
const ORDEM_CATEGORIAS: CategoriaCertificacao[] = [
  "cloud",
  "lideranca",
  "ia",
  "produto",
  "outros",
];

type FiltroAtivo = CategoriaCertificacao | "todas";

/**
 * Seção de cursos e certificações — grade compacta com filtro por categoria.
 */
export function CertificacoesGrid() {
  const { certificacoes, isLoading, isError } = useCertificacoes();
  const [filtro, setFiltro] = useState<FiltroAtivo>("todas");

  const contagemPorCategoria = useMemo(() => {
    const mapa = {} as Record<CategoriaCertificacao, number>;
    for (const cert of certificacoes) {
      mapa[cert.categoria] = (mapa[cert.categoria] ?? 0) + 1;
    }
    return mapa;
  }, [certificacoes]);

  const categoriasPresentes = ORDEM_CATEGORIAS.filter(
    (cat) => (contagemPorCategoria[cat] ?? 0) > 0,
  );

  const filtradas = useMemo(
    () =>
      filtro === "todas"
        ? certificacoes
        : certificacoes.filter((c) => c.categoria === filtro),
    [certificacoes, filtro],
  );

  if (isError) {
    return (
      <Text color={cores.danger.light} fontSize="sm">
        Não foi possível carregar os cursos e certificações.
      </Text>
    );
  }

  return (
    <Box as="section" aria-labelledby="certificacoes-titulo">
      {/* Cabeçalho da seção */}
      <VStack
        gap="4"
        mb={{ base: "8", md: "10" }}
        textAlign="left"
        align="flex-start"
      >
        <HStack gap="3" align="center">
          <Box w="24px" h="1px" bg={cores.accent.DEFAULT} aria-hidden="true" />
          <Text
            fontFamily={tipografia.familia.mono}
            fontSize="xs"
            fontWeight={tipografia.peso.medium}
            letterSpacing={tipografia.tracking.label}
            textTransform="uppercase"
            color={cores.accent.light}
          >
            Cursos & Certificações
          </Text>
        </HStack>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "flex-end" }}
          gap="4"
          w="full"
        >
          <Heading
            as="h2"
            id="certificacoes-titulo"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight={tipografia.peso.light}
            letterSpacing={tipografia.tracking.tituloAmplo}
            lineHeight={String(tipografia.alturaLinha.titulo)}
            color={cores.text.heading}
          >
            Aprendizado Contínuo
          </Heading>

          {!isLoading && certificacoes.length > 0 && (
            <Text
              fontFamily={tipografia.familia.mono}
              fontSize="xs"
              color={cores.text.subtle}
              whiteSpace="nowrap"
            >
              {certificacoes.length} certificações
            </Text>
          )}
        </Flex>
      </VStack>

      {/* Filtros */}
      {!isLoading && certificacoes.length > 0 && (
        <Flex flexWrap="wrap" gap="2" mb={{ base: "6", md: "8" }}>
          <ChipFiltro
            ativo={filtro === "todas"}
            rotulo="Todas"
            quantidade={certificacoes.length}
            cor={cores.accent.DEFAULT}
            onClick={() => setFiltro("todas")}
          />
          {categoriasPresentes.map((cat) => (
            <ChipFiltro
              key={cat}
              ativo={filtro === cat}
              rotulo={CATEGORIAS[cat].rotulo}
              quantidade={contagemPorCategoria[cat] ?? 0}
              cor={CATEGORIAS[cat].acento.base}
              onClick={() => setFiltro(cat)}
            />
          ))}
        </Flex>
      )}

      {/* Grade */}
      {isLoading ? (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="4"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              h="9rem"
              bg={cores.background.card}
              border={`1px solid ${cores.border.DEFAULT}`}
              borderRadius={raio.xl}
              opacity={0.5}
            />
          ))}
        </Grid>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="4"
          alignItems="stretch"
        >
          {filtradas.map((cert) => (
            <CardCertificacao key={cert.id} cert={cert} />
          ))}
        </Grid>
      )}
    </Box>
  );
}
