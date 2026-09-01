import { memo } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import {
  cores,
  raio,
  sombras,
  transicao,
  componentes,
} from "@/lib/tema/tokens";
import type { Experiencia } from "@/types/experiencia";
import { CardExperienciaHeader } from "./fragments/card-experiencia-header/card-experiencia-header.fragment";
import { CardExperienciaFooter } from "./fragments/card-experiencia-footer/card-experiencia-footer.fragment";

/** Acento cromático opcional aplicado ao card (fio superior, índice e hover). */
export interface AcentoCard {
  base: string;
  border: string;
  glow: string;
}

export interface ExperienciaProps extends Experiencia {
  onVerDetalhes?: (id: string) => void;
}

const { card } = componentes;

function CardExperienciaInterna({
  exp,
  acento,
  indice,
}: {
  exp: ExperienciaProps;
  acento?: AcentoCard;
  indice?: number;
}) {
  const isAtual = !exp.dataTermino;
  const tagsVisiveis = exp.tecnologias.slice(0, card.maxTags);

  const corFio = acento?.base ?? cores.accent.DEFAULT;
  const corBorda = acento?.border ?? cores.accent.border;
  const corGlow = acento?.glow;

  return (
    <Flex
      as="article"
      aria-label={`${exp.cargo} na ${exp.empresa}`}
      direction="column"
      gap="4"
      h={card.altura}
      bg={isAtual ? cores.background.elevated : cores.background.card}
      border={`1px solid ${isAtual ? corBorda : cores.border.DEFAULT}`}
      borderRadius={raio["2xl"]}
      p="6"
      position="relative"
      overflow="hidden"
      transition={transicao.elevacao}
      boxShadow={isAtual ? sombras.destaque : "none"}
      _hover={{
        borderColor: corBorda,
        transform: "translateY(-3px)",
        boxShadow: corGlow ? `0 12px 40px ${corGlow}` : sombras.card,
      }}
    >
      {/* Fio de acento superior — sempre presente quando há acento cromático */}
      {(acento || isAtual) && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h={isAtual ? "2px" : "1px"}
          bg={corFio}
          opacity={isAtual ? 1 : 0.7}
          aria-hidden="true"
        />
      )}

      {/* Índice cronológico */}
      {typeof indice === "number" && (
        <Text
          position="absolute"
          top="5"
          right="6"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.06em"
          color={corFio}
          opacity={0.65}
          aria-hidden="true"
        >
          {String(indice + 1).padStart(2, "0")}
        </Text>
      )}

      {/* Cargo (altura fixa — garante alinhamento entre cards) */}
      <Heading
        as="h3"
        fontSize="md"
        fontWeight="700"
        color={cores.text.heading}
        lineHeight="1.3"
        minH={card.tituloMinAltura}
        pr="8"
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

      {/* Descrição curta — no máximo 4 linhas, sem crescer além do necessário */}
      <Text
        fontSize="sm"
        color={cores.text.body}
        lineHeight="1.6"
        textAlign="justify"
        flex="0 1 auto"
        css={{
          display: "-webkit-box",
          WebkitLineClamp: card.descricaoMaxLinhas,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        title={exp.descricao.length > 80 ? exp.descricao : undefined}
      >
        {exp.descricao.slice(0, card.descricaoMaxChars)}
      </Text>

      {/* Tags + link ver detalhes — ancorados na base do card */}
      <Flex direction="column" gap="4" mt="auto">
        <CardExperienciaFooter
          tecnologias={tagsVisiveis}
          onVerDetalhes={() => exp.onVerDetalhes?.(exp.id)}
        />
      </Flex>
    </Flex>
  );
}

/**
 * Card de experiência profissional.
 * Memoizado para evitar re-renders desnecessários quando dados vierem de API.
 */
export const CardExperiencia = memo(CardExperienciaInterna);
