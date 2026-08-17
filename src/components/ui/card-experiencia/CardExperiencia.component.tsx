import { memo } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import {
  cores,
  raio,
  sombras,
  transicao,
  componentes,
} from "@/lib/tema/tokens";
import { CardExperienciaHeader } from "./fragments/CardExperienciaHeader.fragment";
import { CardExperienciaFooter } from "./fragments/CardExperienciaFooter.fragment";

export interface ExperienciaProps {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: DateTime;
  dataTermino?: DateTime;
  descricao: string;
  tecnologias: string[];
  onVerDetalhes?: (id: string) => void;
}

const { card } = componentes;

function CardExperienciaInterna({ exp }: { exp: ExperienciaProps }) {
  const isAtual = !exp.dataTermino;
  const tagsVisiveis = exp.tecnologias.slice(0, card.maxTags);

  return (
    <Flex
      as="article"
      aria-label={`${exp.cargo} na ${exp.empresa}`}
      direction="column"
      gap="4"
      h={card.altura}
      bg={isAtual ? cores.bg.elevado : cores.bg.card}
      border={`1px solid ${isAtual ? cores.primaria.borda : cores.borda.sutil}`}
      borderRadius={raio["2xl"]}
      p="6"
      position="relative"
      overflow="hidden"
      transition={transicao.lenta}
      boxShadow={isAtual ? sombras.destaque : "none"}
      _hover={{
        borderColor: cores.primaria.borda,
        transform: "translateY(-4px)",
        boxShadow: sombras.destaque,
      }}
    >
      {/* Cargo (altura fixa — garante alinhamento entre cards) */}
      <Heading
        as="h3"
        fontSize="md"
        fontWeight="700"
        color={cores.texto.titulo}
        lineHeight="1.3"
        minH={card.tituloMinAltura}
        css={{
          display: "-webkit-box",
          WebkitLineClamp: card.tituloMaxLinhas,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {exp.cargo}
      </Heading>

      {/* Empresa + período + duração */}
      <Box mt="1">
        <CardExperienciaHeader
          empresa={exp.empresa}
          dataInicio={exp.dataInicio}
          dataTermino={exp.dataTermino}
          isAtual={isAtual}
        />
      </Box>

      {/* Descrição curta */}
      <Text
        fontSize="sm"
        color={cores.texto.corpo}
        lineHeight="1.6"
        flex={1}
        css={{
          display: "-webkit-box",
          WebkitLineClamp: card.descricaoMaxLinhas,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        title={exp.descricao.length > 100 ? exp.descricao : undefined}
      >
        {exp.descricao.slice(0, card.descricaoMaxChars)}
      </Text>

      {/* Tags + link ver detalhes */}
      <CardExperienciaFooter
        tecnologias={tagsVisiveis}
        onVerDetalhes={() => exp.onVerDetalhes?.(exp.id)}
      />
    </Flex>
  );
}

/**
 * Card de experiência profissional.
 * Memoizado para evitar re-renders desnecessários quando dados vierem de API.
 */
export const CardExperiencia = memo(CardExperienciaInterna);
