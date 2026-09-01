import { Box, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { FiArrowUpRight, FiAward } from "react-icons/fi";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";
import type { Certificacao } from "@/types/certificacao";
import { CATEGORIAS } from "./certificacao-categorias";

/** Emissão formatada (ex.: "ago 2026"). */
function formatarEmissao(data: DateTime): string {
  return data
    .setLocale("pt-BR")
    .toLocaleString({ month: "short", year: "numeric" });
}

/** Card compacto de uma certificação. */
export function CardCertificacao({ cert }: { cert: Certificacao }) {
  const { rotulo, acento } = CATEGORIAS[cert.categoria];

  return (
    <Flex
      as="article"
      direction="column"
      gap="3"
      h="full"
      bg={cores.background.card}
      border={`1px solid ${cores.border.DEFAULT}`}
      borderRadius={raio.xl}
      p="5"
      position="relative"
      overflow="hidden"
      transition={transicao.rapida}
      _hover={{ borderColor: acento.border }}
    >
      {/* Topo: categoria + emissão */}
      <Flex justify="space-between" align="center" gap="3">
        <HStack gap="1.5">
          <Box
            w="6px"
            h="6px"
            borderRadius={raio.full}
            bg={acento.base}
            flexShrink={0}
            aria-hidden="true"
          />
          <Text
            fontFamily={tipografia.familia.mono}
            fontSize="10px"
            fontWeight="500"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color={acento.base}
          >
            {rotulo}
          </Text>
        </HStack>
        <Text
          fontFamily={tipografia.familia.mono}
          fontSize="10px"
          color={cores.text.subtle}
          whiteSpace="nowrap"
        >
          {formatarEmissao(cert.emitidaEm)}
        </Text>
      </Flex>

      {/* Título */}
      <Heading
        as="h3"
        fontSize="sm"
        fontWeight={tipografia.peso.semibold}
        color={cores.text.heading}
        lineHeight="1.4"
      >
        {cert.titulo}
      </Heading>

      {/* Instituição */}
      <HStack gap="1.5" color={cores.text.body}>
        <Box as={FiAward} fontSize="12px" flexShrink={0} aria-hidden="true" />
        <Text fontSize="xs">{cert.instituicao}</Text>
      </HStack>

      {/* Competências */}
      {cert.competencias && cert.competencias.length > 0 && (
        <Flex flexWrap="wrap" gap="1.5" mt="auto" pt="1">
          {cert.competencias.map((c) => (
            <Box
              key={c}
              as="span"
              fontFamily={tipografia.familia.mono}
              fontSize="10px"
              color={cores.text.body}
              bg={cores.primary.subtle}
              border={`1px solid ${cores.border.subtle}`}
              px="2"
              py="0.5"
              borderRadius={raio.sm}
              whiteSpace="nowrap"
            >
              {c}
            </Box>
          ))}
        </Flex>
      )}

      {/* Credencial */}
      {cert.credencialUrl && (
        <Link
          href={cert.credencialUrl}
          target="_blank"
          rel="noopener noreferrer"
          display="inline-flex"
          alignItems="center"
          gap="1.5"
          fontSize="xs"
          fontWeight="500"
          color={cores.text.body}
          mt="1"
          w="fit-content"
          transition={transicao.rapida}
          _hover={{ color: acento.base, gap: "2.5", textDecoration: "none" }}
        >
          Exibir credencial
          <Box as={FiArrowUpRight} fontSize="13px" />
        </Link>
      )}
    </Flex>
  );
}
