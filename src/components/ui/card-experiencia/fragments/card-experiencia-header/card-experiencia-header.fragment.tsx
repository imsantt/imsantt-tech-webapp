import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa6";
import { DateTime } from "luxon";
import { cores, raio, tipografia } from "@/lib/tema/tokens";

interface CardExperienciaHeaderProps {
  empresa: string;
  dataInicio: DateTime;
  dataTermino?: DateTime;
  isAtual: boolean;
}

function formatarPeriodo(inicio: DateTime, termino?: DateTime): string {
  const fmt = { month: "short", year: "numeric" } as const;
  const inicioStr = inicio.setLocale("pt-BR").toLocaleString(fmt);
  const terminoStr = termino
    ? termino.setLocale("pt-BR").toLocaleString(fmt)
    : "Presente";
  return `${inicioStr} – ${terminoStr}`;
}

function calcularDuracao(inicio: DateTime, termino?: DateTime): string {
  const fim = termino ?? DateTime.now();
  const diff = fim.diff(inicio, ["years", "months"]).toObject();
  const anos = Math.floor(diff.years ?? 0);
  const meses = Math.floor(diff.months ?? 0);

  if (anos > 0 && meses > 0) return `${anos}a ${meses}m`;
  if (anos > 0) return `${anos} ano${anos > 1 ? "s" : ""}`;
  return `${meses} ${meses > 1 ? "meses" : "mês"}`;
}

export function CardExperienciaHeader({
  empresa,
  dataInicio,
  dataTermino,
  isAtual,
}: CardExperienciaHeaderProps) {
  const periodo = formatarPeriodo(dataInicio, dataTermino);
  const duracao = calcularDuracao(dataInicio, dataTermino);

  return (
    <Flex justify="space-between" align="flex-start">
      <HStack gap="3">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="36px"
          h="36px"
          bg={cores.primaria.sutil}
          border={`1px solid ${cores.borda.DEFAULT}`}
          borderRadius={raio.md}
          flexShrink={0}
          aria-hidden="true"
        >
          <Box
            as={FaBuilding}
            fontSize="13px"
            color={isAtual ? cores.acento.claro : cores.texto.corpo}
          />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="600" color={cores.texto.titulo}>
            {empresa}
          </Text>
          <Text
            fontFamily={tipografia.familia.mono}
            fontSize="xs"
            color={cores.texto.sutil}
            letterSpacing="0.02em"
          >
            {periodo} · {duracao}
          </Text>
        </Box>
      </HStack>
      {isAtual && (
        <Flex
          align="center"
          gap="1.5"
          fontFamily={tipografia.familia.mono}
          fontSize="xs"
          fontWeight="500"
          color={cores.acento.claro}
          px="2"
          py="1"
          border={`1px solid ${cores.acento.borda}`}
          borderRadius={raio.sm}
          textTransform="uppercase"
          letterSpacing="0.08em"
        >
          <Box
            w="5px"
            h="5px"
            borderRadius={raio.full}
            bg={cores.acento.DEFAULT}
            aria-hidden="true"
          />
          Atual
        </Flex>
      )}
    </Flex>
  );
}
