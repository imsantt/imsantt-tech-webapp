import { Text, VStack } from "@chakra-ui/react";
import { cores, tipografia } from "@/lib/tema/tokens";

interface EstatisticaResumoProps {
  valor: string;
  rotulo: string;
  /** Valores textuais (não numéricos) usam tamanho menor para caber. */
  compacto?: boolean;
}

/** Métrica destacada da faixa de resumo da Trajetória. */
export function EstatisticaResumo({
  valor,
  rotulo,
  compacto = false,
}: EstatisticaResumoProps) {
  return (
    <VStack align="flex-start" gap="1" minW="0">
      <Text
        fontSize={compacto ? { base: "md", md: "lg" } : { base: "2xl", md: "3xl" }}
        fontWeight={compacto ? tipografia.peso.semibold : tipografia.peso.light}
        letterSpacing={
          compacto ? tipografia.tracking.titulo : tipografia.tracking.tituloAmplo
        }
        color={cores.text.heading}
        lineHeight={compacto ? "1.3" : "1"}
        maxW="20ch"
      >
        {valor}
      </Text>
      <Text
        fontFamily={tipografia.familia.mono}
        fontSize="xs"
        letterSpacing="0.04em"
        color={cores.text.body}
      >
        {rotulo}
      </Text>
    </VStack>
  );
}
