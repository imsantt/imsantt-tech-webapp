import { Box, Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { FiArrowUpRight, FiCheck, FiMapPin } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa6";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";
import type {
  Experiencia,
  ModeloTrabalho,
  TipoVinculo,
} from "@/types/experiencia";
import { MetaChip } from "../meta-chip/meta-chip.fragment";

/** Acento cromático aplicado a um nó da timeline. */
export interface AcentoTimeline {
  base: string;
  bg: string;
  border: string;
  glow: string;
}

const ROTULO_MODELO: Record<ModeloTrabalho, string> = {
  remoto: "Remoto",
  presencial: "Presencial",
  hibrido: "Híbrido",
};

const ROTULO_TIPO: Record<TipoVinculo, string> = {
  clt: "CLT",
  pj: "PJ",
  estagio: "Estágio",
  freelance: "Freelance",
  temporario: "Temporário",
};

/** Formata o intervalo do período (mês/ano – mês/ano | Presente). */
function formatarPeriodo(inicio: DateTime, termino?: DateTime): string {
  const fmt = { month: "short", year: "numeric" } as const;
  const inicioStr = inicio.setLocale("pt-BR").toLocaleString(fmt);
  const terminoStr = termino
    ? termino.setLocale("pt-BR").toLocaleString(fmt)
    : "Presente";
  return `${inicioStr} – ${terminoStr}`;
}

/** Duração legível (ex.: "1a 3m", "8 meses"). */
function calcularDuracao(inicio: DateTime, termino?: DateTime): string {
  const fim = termino ?? DateTime.now();
  const diff = fim.diff(inicio, ["years", "months"]).toObject();
  const anos = Math.floor(diff.years ?? 0);
  const meses = Math.floor(diff.months ?? 0);

  if (anos > 0 && meses > 0) return `${anos}a ${meses}m`;
  if (anos > 0) return `${anos} ano${anos > 1 ? "s" : ""}`;
  return `${Math.max(meses, 1)} ${meses > 1 ? "meses" : "mês"}`;
}

interface ItemTimelineProps {
  exp: Experiencia;
  indice: number;
  acento: AcentoTimeline;
}

/** Um nó da timeline profissional — experiência completa. */
export function ItemTimeline({ exp, indice, acento }: ItemTimelineProps) {
  const isAtual = !exp.dataTermino;
  const periodo = formatarPeriodo(exp.dataInicio, exp.dataTermino);
  const duracao = calcularDuracao(exp.dataInicio, exp.dataTermino);
  const descricao = exp.descricaoLonga ?? exp.descricao;

  return (
    <Box
      as="article"
      aria-label={`${exp.cargo} na ${exp.empresa}`}
      position="relative"
      pl={{ base: "8", md: "12" }}
      pb={{ base: "12", md: "16" }}
      _last={{ pb: "0" }}
    >
      {/* Nó cronológico sobre a linha */}
      <Box
        position="absolute"
        left={{ base: "-6px", md: "-7px" }}
        top="1.5"
        w={{ base: "12px", md: "14px" }}
        h={{ base: "12px", md: "14px" }}
        borderRadius={raio.full}
        bg={cores.background.base}
        border={`2px solid ${acento.base}`}
        boxShadow={isAtual ? `0 0 0 4px ${acento.glow}` : "none"}
        aria-hidden="true"
      >
        {isAtual && (
          <Box
            position="absolute"
            inset="2px"
            borderRadius={raio.full}
            bg={acento.base}
          />
        )}
      </Box>

      <VStack align="flex-start" gap="4">
        {/* Índice + período + duração + badge atual */}
        <Flex
          align="center"
          gap="3"
          flexWrap="wrap"
          fontFamily={tipografia.familia.mono}
        >
          <Text
            fontSize="xs"
            fontWeight={tipografia.peso.medium}
            letterSpacing="0.06em"
            color={acento.base}
            opacity={0.75}
          >
            {String(indice + 1).padStart(2, "0")}
          </Text>
          <Box w="12px" h="1px" bg={cores.border.hover} aria-hidden="true" />
          <Text fontSize="xs" color={cores.text.body} letterSpacing="0.02em">
            {periodo}
          </Text>
          <Text fontSize="xs" color={cores.text.subtle}>
            · {duracao}
          </Text>
          {isAtual && (
            <Flex
              align="center"
              gap="1.5"
              fontSize="xs"
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
              Atual
            </Flex>
          )}
        </Flex>

        {/* Cargo */}
        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight={tipografia.peso.medium}
          letterSpacing={tipografia.tracking.titulo}
          lineHeight={String(tipografia.alturaLinha.titulo)}
          color={cores.text.heading}
        >
          {exp.cargo}
        </Heading>

        {/* Empresa + local */}
        <Flex align="center" gap="4" flexWrap="wrap">
          <HStack gap="2">
            <Box
              as={FaBuilding}
              fontSize="13px"
              color={acento.base}
              aria-hidden="true"
            />
            {exp.site ? (
              <Link
                href={exp.site}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap="1"
                fontSize="sm"
                fontWeight="600"
                color={cores.text.heading}
                _hover={{ color: acento.base, textDecoration: "none" }}
              >
                {exp.empresa}
                <Box as={FiArrowUpRight} fontSize="13px" />
              </Link>
            ) : (
              <Text fontSize="sm" fontWeight="600" color={cores.text.heading}>
                {exp.empresa}
              </Text>
            )}
          </HStack>

          {exp.local && (
            <HStack gap="1.5" color={cores.text.subtle}>
              <Box as={FiMapPin} fontSize="12px" aria-hidden="true" />
              <Text fontFamily={tipografia.familia.mono} fontSize="xs">
                {exp.local}
              </Text>
            </HStack>
          )}
        </Flex>

        {/* Meta chips */}
        {(exp.modelo || exp.tipo || exp.setor) && (
          <Flex flexWrap="wrap" gap="1.5">
            {exp.setor && <MetaChip>{exp.setor}</MetaChip>}
            {exp.modelo && <MetaChip>{ROTULO_MODELO[exp.modelo]}</MetaChip>}
            {exp.tipo && <MetaChip>{ROTULO_TIPO[exp.tipo]}</MetaChip>}
          </Flex>
        )}

        {/* Descrição */}
        <Text
          fontSize="md"
          color={cores.text.body}
          lineHeight={String(tipografia.alturaLinha.relaxada)}
          maxW="60ch"
        >
          {descricao}
        </Text>

        {/* Destaques */}
        {exp.destaques && exp.destaques.length > 0 && (
          <VStack
            as="ul"
            align="stretch"
            gap="2.5"
            listStyleType="none"
            w="full"
            maxW="60ch"
            mt="1"
          >
            {exp.destaques.map((d, i) => (
              <Flex as="li" key={i} align="flex-start" gap="3">
                <Box
                  mt="0.5"
                  flexShrink={0}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  w="18px"
                  h="18px"
                  borderRadius={raio.sm}
                  bg={acento.bg}
                  border={`1px solid ${acento.border}`}
                  aria-hidden="true"
                >
                  <Box as={FiCheck} fontSize="11px" color={acento.base} />
                </Box>
                <Text
                  fontSize="sm"
                  color={cores.text.body}
                  lineHeight={String(tipografia.alturaLinha.corpo)}
                >
                  {d.texto}
                  {d.metrica && (
                    <Box
                      as="span"
                      ml="2"
                      fontFamily={tipografia.familia.mono}
                      fontSize="xs"
                      color={acento.base}
                    >
                      {d.metrica}
                    </Box>
                  )}
                </Text>
              </Flex>
            ))}
          </VStack>
        )}

        {/* Tecnologias */}
        <Flex
          flexWrap="wrap"
          gap="1.5"
          mt="1"
          aria-label="Tecnologias utilizadas"
        >
          {exp.tecnologias.map((tec) => (
            <Box
              key={tec}
              as="span"
              fontFamily={tipografia.familia.mono}
              fontSize="xs"
              fontWeight="400"
              color={cores.text.body}
              bg={cores.background.card}
              border={`1px solid ${cores.border.DEFAULT}`}
              px="2.5"
              py="1"
              borderRadius={raio.sm}
              whiteSpace="nowrap"
              transition={transicao.rapida}
              _hover={{ borderColor: acento.border, color: acento.base }}
            >
              {tec}
            </Box>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
}
