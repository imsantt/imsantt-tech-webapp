import { useState } from "react";
import type { IconType } from "react-icons";
import {
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa6";
import { cores, layout, raio, tipografia, transicao } from "@/lib/tema/tokens";
import { ExperienciasTimeline } from "./fragments/experiencias-timeline/experiencias-timeline.fragment";
import { FormacaoTimeline } from "./fragments/formacao-timeline/formacao-timeline.fragment";
import { CertificacoesGrid } from "./fragments/certificacoes-grid/certificacoes-grid.fragment";

type AbaId = "profissional" | "academica" | "certificacoes";

interface Aba {
  id: AbaId;
  rotulo: string;
  icone: IconType;
}

const ABAS: Aba[] = [
  {
    id: "profissional",
    rotulo: "Experiência Profissional",
    icone: FaBriefcase,
  },
  { id: "academica", rotulo: "Formação Acadêmica", icone: FaGraduationCap },
  { id: "certificacoes", rotulo: "Cursos & Certificações", icone: FaAward },
];

/** Botão de aba — controla o estado ativo e a acessibilidade do tablist. */
function BotaoAba({
  aba,
  ativa,
  onClick,
}: {
  aba: Aba;
  ativa: boolean;
  onClick: () => void;
}) {
  return (
    <chakra.button
      type="button"
      role="tab"
      id={`aba-${aba.id}`}
      aria-selected={ativa}
      aria-controls={`painel-${aba.id}`}
      tabIndex={ativa ? 0 : -1}
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      gap="2.5"
      whiteSpace="nowrap"
      fontFamily={tipografia.familia.mono}
      fontSize={{ base: "xs", md: "sm" }}
      fontWeight="500"
      letterSpacing="0.02em"
      color={ativa ? cores.text.heading : cores.text.body}
      bg={ativa ? cores.background.card : "transparent"}
      border={`1px solid ${ativa ? cores.accent.border : "transparent"}`}
      px={{ base: "3.5", md: "5" }}
      py="2.5"
      borderRadius={raio.lg}
      cursor="pointer"
      transition={transicao.rapida}
      _hover={
        ativa ? {} : { color: cores.text.heading, bg: cores.primary.subtle }
      }
      _focusVisible={{
        outline: `2px solid ${cores.accent.DEFAULT}`,
        outlineOffset: "2px",
      }}
    >
      <Box
        as={aba.icone}
        fontSize={{ base: "13px", md: "14px" }}
        color={ativa ? cores.accent.light : "currentColor"}
        flexShrink={0}
        aria-hidden="true"
      />
      {aba.rotulo}
    </chakra.button>
  );
}
export function Experiencias() {
  const [abaAtiva, setAbaAtiva] = useState<AbaId>("profissional");

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
              Linha do Tempo · Trajetória
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
            Trajetória & Formação
          </Heading>

          <Text
            fontSize="md"
            color={cores.text.body}
            maxW="54ch"
            lineHeight={String(tipografia.alturaLinha.relaxada)}
          >
            Experiência profissional, base acadêmica e aprendizado contínuo —
            organizados por área para navegação rápida.
          </Text>
        </VStack>

        {/* Navegação por abas */}
        <Flex
          role="tablist"
          aria-label="Seções da trajetória"
          gap="1.5"
          mb={{ base: "10", md: "14" }}
          p="1.5"
          bg={cores.background.subtle}
          border={`1px solid ${cores.border.subtle}`}
          borderRadius={raio.xl}
          overflowX="auto"
          css={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {ABAS.map((aba) => (
            <BotaoAba
              key={aba.id}
              aba={aba}
              ativa={abaAtiva === aba.id}
              onClick={() => setAbaAtiva(aba.id)}
            />
          ))}
        </Flex>

        {/* Painéis */}
        <Box
          role="tabpanel"
          id="painel-profissional"
          aria-labelledby="aba-profissional"
          hidden={abaAtiva !== "profissional"}
        >
          {abaAtiva === "profissional" && <ExperienciasTimeline />}
        </Box>

        <Box
          role="tabpanel"
          id="painel-academica"
          aria-labelledby="aba-academica"
          hidden={abaAtiva !== "academica"}
        >
          {abaAtiva === "academica" && <FormacaoTimeline />}
        </Box>

        <Box
          role="tabpanel"
          id="painel-certificacoes"
          aria-labelledby="aba-certificacoes"
          hidden={abaAtiva !== "certificacoes"}
        >
          {abaAtiva === "certificacoes" && <CertificacoesGrid />}
        </Box>
      </Box>
    </Box>
  );
}
