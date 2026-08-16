import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa6";
import { DateTime } from "luxon";
import { cores, raio } from "../../../../lib/tema/tokens";

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
          w="38px"
          h="38px"
          bg={isAtual ? cores.primaria.sutil : "rgba(99, 102, 241, 0.12)"}
          borderRadius={raio.lg}
          flexShrink={0}
          aria-hidden="true"
        >
          <Box
            as={FaBuilding}
            fontSize="14px"
            color={isAtual ? cores.primaria.claro : cores.secundaria.DEFAULT}
          />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="700" color={cores.texto.titulo}>
            {empresa}
          </Text>
          <Text fontSize="xs" color={cores.texto.corpo}>
            {periodo} · {duracao}
          </Text>
        </Box>
      </HStack>
      {isAtual && (
        <Box
          fontSize="xs"
          fontWeight="600"
          color={cores.sucesso.claro}
          bg={cores.sucesso.sutil}
          px="2.5"
          py="0.5"
          borderRadius={raio.full}
        >
          Atual
        </Box>
      )}
    </Flex>
  );
}
