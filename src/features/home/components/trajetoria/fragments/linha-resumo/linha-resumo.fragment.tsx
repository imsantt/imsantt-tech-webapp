import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import type { Experiencia } from "@/types/experiencia";
import { cores, raio, tipografia } from "@/lib/tema/tokens";

/** Acento cromático de uma linha da mini-timeline. */
export interface AcentoResumo {
  base: string;
  border: string;
  glow: string;
}

interface LinhaResumoProps {
  exp: Experiencia;
  acento: AcentoResumo;
  ultima: boolean;
}

/** Período compacto (ex.: "nov 2023 – Presente"). */
function formatarPeriodo(inicio: DateTime, termino?: DateTime): string {
  const fmt = { month: "short", year: "numeric" } as const;
  const inicioStr = inicio.setLocale("pt-BR").toLocaleString(fmt);
  const terminoStr = termino
    ? termino.setLocale("pt-BR").toLocaleString(fmt)
    : "Presente";
  return `${inicioStr} – ${terminoStr}`;
}

/** Linha compacta da mini-timeline da Trajetória. */
export function LinhaResumo({ exp, acento, ultima }: LinhaResumoProps) {
  const isAtual = !exp.dataTermino;

  return (
    <Grid
      as="li"
      templateColumns={{ base: "1fr", md: "minmax(0, 14rem) 1fr auto" }}
      gap={{ base: "1.5", md: "6" }}
      alignItems={{ base: "flex-start", md: "center" }}
      position="relative"
      pl={{ base: "7", md: "8" }}
      py="4"
      borderBottom={ultima ? "none" : `1px solid ${cores.border.subtle}`}
    >
      {/* Nó cronológico */}
      <Box
        position="absolute"
        left="0"
        top={{ base: "5", md: "50%" }}
        transform={{ base: "none", md: "translateY(-50%)" }}
        w="11px"
        h="11px"
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

      {/* Empresa + badge atual */}
      <Flex align="center" gap="2.5" minW="0">
        <Text fontSize="sm" fontWeight="600" color={cores.text.heading} truncate>
          {exp.empresa}
        </Text>
        {isAtual && (
          <Box
            as="span"
            fontFamily={tipografia.familia.mono}
            fontSize="10px"
            fontWeight="500"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color={acento.base}
            border={`1px solid ${acento.border}`}
            px="1.5"
            py="0.5"
            borderRadius={raio.sm}
            flexShrink={0}
          >
            Atual
          </Box>
        )}
      </Flex>

      {/* Cargo */}
      <Text fontSize="sm" color={cores.text.body} lineHeight="1.5" truncate>
        {exp.cargo}
      </Text>

      {/* Período */}
      <Text
        fontFamily={tipografia.familia.mono}
        fontSize="xs"
        color={cores.text.subtle}
        whiteSpace="nowrap"
        letterSpacing="0.02em"
      >
        {formatarPeriodo(exp.dataInicio, exp.dataTermino)}
      </Text>
    </Grid>
  );
}
