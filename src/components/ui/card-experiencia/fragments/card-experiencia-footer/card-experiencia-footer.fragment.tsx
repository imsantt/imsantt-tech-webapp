import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { cores, raio, tipografia, transicao } from "@/lib/tema/tokens";

interface CardExperienciaFooterProps {
  tecnologias: string[];
  onVerDetalhes?: () => void;
}

export function CardExperienciaFooter({
  tecnologias,
  onVerDetalhes,
}: CardExperienciaFooterProps) {
  return (
    <>
      {/* Tecnologias */}
      <Flex flexWrap="wrap" gap="1.5" aria-label="Tecnologias utilizadas">
        {tecnologias.map((tec) => (
          <Box
            key={tec}
            as="span"
            fontFamily={tipografia.familia.mono}
            fontSize="xs"
            fontWeight="400"
            color={cores.text.body}
            bg={cores.primary.subtle}
            border={`1px solid ${cores.border.DEFAULT}`}
            px="2"
            py="0.5"
            borderRadius={raio.sm}
            whiteSpace="nowrap"
          >
            {tec}
          </Box>
        ))}
      </Flex>

      {/* Link ver detalhes */}
      {onVerDetalhes && (
        <chakra.button
          type="button"
          gap="1.5"
          color={cores.text.body}
          fontSize="sm"
          fontWeight="500"
          cursor="pointer"
          mt="auto"
          display="inline-flex"
          alignItems="center"
          _hover={{ color: cores.text.heading, gap: "2.5" }}
          _focusVisible={{
            outline: `1px solid ${cores.accent.DEFAULT}`,
            outlineOffset: "2px",
          }}
          transition={transicao.rapida}
          onClick={onVerDetalhes}
          background="transparent"
          border="none"
          p="0"
          w="fit-content"
        >
          <Text>Ver detalhes</Text>
          <Box as={FiArrowUpRight} fontSize="15px" />
        </chakra.button>
      )}
    </>
  );
}
