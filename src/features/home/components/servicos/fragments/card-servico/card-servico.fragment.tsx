import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { FiCheck } from "react-icons/fi";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";

/** Acento cromático de um serviço. */
export interface AcentoServico {
  base: string;
  bg: string;
  border: string;
  glow: string;
}

/** Modelo de um serviço/oferta exibido na seção de consultoria. */
export interface Servico {
  id: string;
  icone: IconType;
  titulo: string;
  descricao: string;
  itens: string[];
  acento: AcentoServico;
}

/** Card de uma oferta de serviço — ícone, título, descrição e itens. */
export function CardServico({ servico }: { servico: Servico }) {
  const { acento } = servico;

  return (
    <Flex
      as="article"
      direction="column"
      gap="5"
      h="full"
      bg={cores.background.card}
      border={`1px solid ${cores.border.DEFAULT}`}
      borderRadius={raio["2xl"]}
      p={{ base: "6", md: "7" }}
      position="relative"
      overflow="hidden"
      transition={transicao.elevacao}
      _hover={{
        borderColor: acento.border,
        transform: "translateY(-3px)",
        boxShadow: `0 12px 40px ${acento.glow}`,
      }}
    >
      {/* Fio de acento superior */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="1px"
        bg={acento.base}
        opacity={0.7}
        aria-hidden="true"
      />

      {/* Ícone */}
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="44px"
        h="44px"
        bg={acento.bg}
        border={`1px solid ${acento.border}`}
        borderRadius={raio.md}
        flexShrink={0}
        aria-hidden="true"
      >
        <Box as={servico.icone} fontSize="18px" color={acento.base} />
      </Box>

      {/* Título + descrição */}
      <VStack align="flex-start" gap="2.5">
        <Heading
          as="h3"
          fontSize="lg"
          fontWeight={tipografia.peso.semibold}
          letterSpacing={tipografia.tracking.titulo}
          color={cores.text.heading}
          lineHeight="1.3"
        >
          {servico.titulo}
        </Heading>
        <Text
          fontSize="sm"
          color={cores.text.body}
          lineHeight={String(tipografia.alturaLinha.relaxada)}
        >
          {servico.descricao}
        </Text>
      </VStack>

      {/* Itens */}
      <VStack
        as="ul"
        align="stretch"
        gap="2.5"
        listStyleType="none"
        mt="auto"
        pt="1"
      >
        {servico.itens.map((item) => (
          <Flex as="li" key={item} align="flex-start" gap="2.5">
            <Box
              mt="0.5"
              flexShrink={0}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="16px"
              h="16px"
              borderRadius={raio.sm}
              bg={acento.bg}
              border={`1px solid ${acento.border}`}
              aria-hidden="true"
            >
              <Box as={FiCheck} fontSize="10px" color={acento.base} />
            </Box>
            <Text
              fontSize="sm"
              color={cores.text.body}
              lineHeight={String(tipografia.alturaLinha.corpo)}
            >
              {item}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
