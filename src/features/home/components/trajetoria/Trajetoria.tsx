import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { Link as RouterLink } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { useExperiencias } from "@/hooks/use-experiencias/useExperiencias.hook";
import { useFormacao } from "@/hooks/use-formacao/useFormacao.hook";
import { useCertificacoes } from "@/hooks/use-certificacoes/useCertificacoes.hook";
import type { GrauFormacao } from "@/types/formacao";
import { cores, layout, raio, tipografia, transicao } from "@/lib/tema/tokens";
import { LinhaResumo } from "./fragments/linha-resumo/linha-resumo.fragment";
import { EstatisticaResumo } from "./fragments/estatistica-resumo/estatistica-resumo.fragment";

/** Rótulo curto por grau — usado no resumo da home. */
const ROTULO_GRAU_CURTO: Record<GrauFormacao, string> = {
  especializacao: "Especialização",
  mestrado: "Mestrado",
  graduacao: "Graduação",
  tecnologo: "Tecnólogo",
  tecnico: "Técnico",
};

/** Prioridade de grau — o maior é destacado como formação principal. */
const PESO_GRAU: Record<GrauFormacao, number> = {
  mestrado: 5,
  especializacao: 4,
  graduacao: 3,
  tecnologo: 2,
  tecnico: 1,
};

/**
 * Acentos cromáticos cíclicos — dão ritmo cronológico à mini-timeline sem
 * depender de dados de cor no modelo de domínio.
 */
const ACENTOS = [
  cores.category.violet,
  cores.category.cyan,
  cores.category.emerald,
  cores.category.gold,
];

/** Quantidade de passagens exibidas no resumo da home. */
const MAX_RESUMO = 4;

function TrajetoriaConteudo() {
  const { experiencias, isLoading, isError } = useExperiencias();
  const { formacoes, isLoading: carregandoFormacao } = useFormacao();
  const { certificacoes, isLoading: carregandoCertificacoes } =
    useCertificacoes();
  const anosExperiencia = DateTime.now().get("year") - 2019;

  const resumo = experiencias.slice(0, MAX_RESUMO);
  const atual = experiencias.find((e) => !e.dataTermino);
  const restantes = Math.max(experiencias.length - MAX_RESUMO, 0);

  // Formação de maior grau — destaque acadêmico do resumo.
  const formacaoPrincipal = [...formacoes].sort(
    (a, b) => PESO_GRAU[b.grau] - PESO_GRAU[a.grau],
  )[0];

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
          mb={{ base: "10", md: "12" }}
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
              03 — Trajetória & Formação
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
              Trajetória & Formação
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

        {isError && (
          <Text color={cores.danger.light} fontSize="sm">
            Não foi possível carregar as experiências.
          </Text>
        )}

        {!isError && (
          <Box
            border={`1px solid ${cores.border.DEFAULT}`}
            borderRadius={raio["2xl"]}
            bg={cores.background.card}
            overflow="hidden"
          >
            {/* Faixa de estatísticas */}
            <Flex
              flexWrap="wrap"
              gap={{ base: "8", md: "16" }}
              px={{ base: "6", md: "8" }}
              py={{ base: "6", md: "7" }}
              borderBottom={`1px solid ${cores.border.subtle}`}
            >
              <EstatisticaResumo
                valor={`+${anosExperiencia}`}
                rotulo="anos de carreira"
              />
              <EstatisticaResumo
                valor={
                  isLoading ? "—" : String(experiencias.length).padStart(2, "0")
                }
                rotulo="passagens"
              />
              <EstatisticaResumo
                valor={isLoading ? "—" : (atual?.empresa ?? "—")}
                rotulo="posição atual"
                compacto
              />
              <EstatisticaResumo
                valor={
                  carregandoFormacao
                    ? "—"
                    : formacaoPrincipal
                      ? ROTULO_GRAU_CURTO[formacaoPrincipal.grau]
                      : "—"
                }
                rotulo="formação"
                compacto
              />
              <EstatisticaResumo
                valor={
                  carregandoCertificacoes
                    ? "—"
                    : `${String(certificacoes.length).padStart(2, "0")}+`
                }
                rotulo="certificações"
              />
            </Flex>

            {/* Mini-timeline */}
            <Box px={{ base: "6", md: "8" }} py={{ base: "2", md: "3" }}>
              {isLoading ? (
                <VStack align="stretch" gap="0" py="2">
                  {[0, 1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      h="1.1rem"
                      my="4"
                      w={`${70 - i * 8}%`}
                      bg={cores.border.DEFAULT}
                      borderRadius={raio.sm}
                      opacity={0.3}
                    />
                  ))}
                </VStack>
              ) : (
                <VStack
                  as="ul"
                  align="stretch"
                  gap="0"
                  listStyleType="none"
                  position="relative"
                >
                  {/* Fio vertical da timeline */}
                  <Box
                    position="absolute"
                    left={{ base: "5px", md: "5px" }}
                    top="6"
                    bottom="6"
                    w="1px"
                    bg={cores.border.DEFAULT}
                    aria-hidden="true"
                  />
                  {resumo.map((exp, i) => (
                    <LinhaResumo
                      key={exp.id}
                      exp={exp}
                      acento={ACENTOS[i % ACENTOS.length]}
                      ultima={i === resumo.length - 1}
                    />
                  ))}
                </VStack>
              )}
            </Box>

            {/* Rodapé: link para a timeline completa */}
            {!isLoading && experiencias.length > 0 && (
              <Flex
                justify="space-between"
                align="center"
                gap="4"
                flexWrap="wrap"
                px={{ base: "6", md: "8" }}
                py={{ base: "5", md: "5" }}
                borderTop={`1px solid ${cores.border.subtle}`}
              >
                <Text fontSize="sm" color={cores.text.subtle} maxW="52ch">
                  {restantes > 0
                    ? `Mais ${restantes} passagens, formação acadêmica e cursos na trajetória completa.`
                    : "Trajetória, formação acadêmica e cursos no detalhamento completo."}
                </Text>
                <RouterLink
                  to="/experiencias"
                  style={{ textDecoration: "none" }}
                >
                  <Flex
                    as="span"
                    align="center"
                    gap="2"
                    fontFamily={tipografia.familia.mono}
                    fontSize="sm"
                    fontWeight="500"
                    color={cores.text.body}
                    transition={transicao.rapida}
                    _hover={{ color: cores.accent.light, gap: "3" }}
                  >
                    Ver trajetória completa
                    <Box as={FiArrowUpRight} fontSize="16px" />
                  </Flex>
                </RouterLink>
              </Flex>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export function Trajetoria() {
  return <TrajetoriaConteudo />;
}
