import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { cores, raio, transicao } from "../../../../lib/tema/tokens";

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
            fontSize="xs"
            fontWeight="500"
            color={cores.primaria.claro}
            bg={cores.primaria.sutil}
            border={`1px solid ${cores.primaria.borda}`}
            px="2"
            py="0.5"
            borderRadius={raio.full}
            whiteSpace="nowrap"
          >
            {tec}
          </Box>
        ))}
      </Flex>

      {/* Link ver detalhes */}
      {onVerDetalhes && (
        <HStack
          as="button"
          type="button"
          gap="1.5"
          color={cores.primaria.claro}
          fontSize="sm"
          fontWeight="500"
          cursor="pointer"
          opacity={0.7}
          mt="auto"
          _hover={{ opacity: 1 }}
          _focusVisible={{
            outline: `2px solid ${cores.primaria.borda}`,
            outlineOffset: "2px",
          }}
          transition={transicao.rapida}
          onClick={onVerDetalhes}
          background="transparent"
          border="none"
          p="0"
        >
          <Text>Ver detalhes</Text>
          <Box as={FiExternalLink} fontSize="14px" />
        </HStack>
      )}
    </>
  );
}
