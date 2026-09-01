import { Box, Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa6";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";
import type { FormacaoAcademica, GrauFormacao } from "@/types/formacao";

/** Acento cromático aplicado a um nó da timeline de formação. */
export interface AcentoFormacao {
  base: string;
  bg: string;
  border: string;
  glow: string;
}

const ROTULO_GRAU: Record<GrauFormacao, string> = {
  especializacao: "Especialização",
  mestrado: "Mestrado",
  graduacao: "Graduação",
  tecnologo: "Tecnólogo",
  tecnico: "Técnico",
};

/** Período em anos (ou mês/ano quando o intervalo é curto). */
function formatarPeriodo(inicio: DateTime, termino?: DateTime): string {
  const anoInicio = inicio.year;
  const anoTermino = termino?.year;

  if (!anoTermino) return `${anoInicio} – Em andamento`;
  if (anoInicio === anoTermino) return String(anoInicio);
  return `${anoInicio} – ${anoTermino}`;
}

/** Considera "em andamento" quando não há término ou ele ainda é futuro. */
function estaEmAndamento(termino?: DateTime): boolean {
  if (!termino) return true;
  return termino > DateTime.now();
}

interface ItemFormacaoProps {
  formacao: FormacaoAcademica;
  acento: AcentoFormacao;
  ultima: boolean;
}

/** Um nó da timeline de formação acadêmica. */
export function ItemFormacao({ formacao, acento, ultima }: ItemFormacaoProps) {
  const emAndamento = estaEmAndamento(formacao.dataTermino);
  const periodo = formatarPeriodo(formacao.dataInicio, formacao.dataTermino);

  return (
    <Box
      as="article"
      aria-label={`${formacao.curso} — ${formacao.instituicao}`}
      position="relative"
      pl={{ base: "8", md: "12" }}
      pb={ultima ? "0" : { base: "10", md: "12" }}
    >
      {/* Nó cronológico */}
      <Box
        position="absolute"
        left={{ base: "-6px", md: "-7px" }}
        top="1.5"
        w={{ base: "12px", md: "14px" }}
        h={{ base: "12px", md: "14px" }}
        borderRadius={raio.full}
        bg={cores.background.base}
        border={`2px solid ${acento.base}`}
        boxShadow={emAndamento ? `0 0 0 4px ${acento.glow}` : "none"}
        aria-hidden="true"
      >
        {emAndamento && (
          <Box
            position="absolute"
            inset="2px"
            borderRadius={raio.full}
            bg={acento.base}
          />
        )}
      </Box>

      <VStack align="flex-start" gap="3">
        {/* Período + grau + badge */}
        <Flex align="center" gap="3" flexWrap="wrap">
          <Text
            fontFamily={tipografia.familia.mono}
            fontSize="xs"
            color={cores.text.body}
            letterSpacing="0.02em"
          >
            {periodo}
          </Text>
          <Box
            as="span"
            fontFamily={tipografia.familia.mono}
            fontSize="10px"
            fontWeight="500"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color={acento.base}
            bg={acento.bg}
            border={`1px solid ${acento.border}`}
            px="2"
            py="0.5"
            borderRadius={raio.sm}
          >
            {ROTULO_GRAU[formacao.grau]}
          </Box>
          {emAndamento && (
            <Flex
              align="center"
              gap="1.5"
              fontFamily={tipografia.familia.mono}
              fontSize="10px"
              fontWeight="500"
              color={acento.base}
              px="2"
              py="0.5"
              border={`1px solid ${acento.border}`}
              borderRadius={raio.sm}
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              <Box
                w="5px"
                h="5px"
                borderRadius={raio.full}
                bg={acento.base}
                aria-hidden="true"
              />
              Em andamento
            </Flex>
          )}
        </Flex>

        {/* Curso + área */}
        <Box>
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight={tipografia.peso.medium}
            letterSpacing={tipografia.tracking.titulo}
            lineHeight={String(tipografia.alturaLinha.titulo)}
            color={cores.text.heading}
          >
            {formacao.curso}
          </Heading>
          {formacao.area && (
            <Text fontSize="sm" color={cores.text.body} mt="1">
              {formacao.area}
            </Text>
          )}
        </Box>

        {/* Instituição */}
        <HStack gap="2">
          <Box
            as={FaGraduationCap}
            fontSize="14px"
            color={acento.base}
            aria-hidden="true"
          />
          <Text fontSize="sm" fontWeight="600" color={cores.text.heading}>
            {formacao.instituicao}
          </Text>
        </HStack>

        {/* Certificado */}
        {formacao.certificado &&
          (formacao.certificado.url ? (
            <Link
              href={formacao.certificado.url}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-flex"
              alignItems="center"
              gap="2"
              fontSize="sm"
              color={cores.text.body}
              bg={cores.background.card}
              border={`1px solid ${cores.border.DEFAULT}`}
              px="3"
              py="2"
              borderRadius={raio.md}
              transition={transicao.rapida}
              _hover={{
                color: acento.base,
                borderColor: acento.border,
                textDecoration: "none",
              }}
            >
              <Box as={FiFileText} fontSize="14px" aria-hidden="true" />
              {formacao.certificado.titulo}
              <Box as={FiArrowUpRight} fontSize="14px" aria-hidden="true" />
            </Link>
          ) : (
            <Flex
              align="center"
              gap="2"
              fontSize="sm"
              color={cores.text.subtle}
              bg={cores.background.card}
              border={`1px solid ${cores.border.subtle}`}
              px="3"
              py="2"
              borderRadius={raio.md}
            >
              <Box as={FiFileText} fontSize="14px" aria-hidden="true" />
              {formacao.certificado.titulo}
            </Flex>
          ))}
      </VStack>
    </Box>
  );
}
