import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { cores, raio, tipografia } from "@/lib/tema/tokens";
import { useFormacao } from "@/hooks/use-formacao/useFormacao.hook";
import { ItemFormacao } from "../item-formacao/item-formacao.fragment";

/** Acentos cromáticos cíclicos — mantêm o ritmo visual da timeline. */
const ACENTOS = [
  cores.category.amber,
  cores.category.rose,
  cores.category.violet,
  cores.category.cyan,
];

/**
 * Seção de formação acadêmica — segunda timeline da página /experiencias.
 */
export function FormacaoTimeline() {
  const { formacoes, isLoading, isError } = useFormacao();

  if (isError) {
    return (
      <Text color={cores.danger.light} fontSize="sm">
        Não foi possível carregar a formação acadêmica.
      </Text>
    );
  }

  return (
    <Box as="section" aria-labelledby="formacao-titulo">
      {/* Cabeçalho da seção */}
      <VStack
        gap="4"
        mb={{ base: "10", md: "12" }}
        textAlign="left"
        align="flex-start"
      >
        <HStack gap="3" align="center">
          <Box w="24px" h="1px" bg={cores.accent.DEFAULT} aria-hidden="true" />
          <Text
            fontFamily={tipografia.familia.mono}
            fontSize="xs"
            fontWeight={tipografia.peso.medium}
            letterSpacing={tipografia.tracking.label}
            textTransform="uppercase"
            color={cores.accent.light}
          >
            Formação Acadêmica
          </Text>
        </HStack>

        <Heading
          as="h2"
          id="formacao-titulo"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={tipografia.peso.light}
          letterSpacing={tipografia.tracking.tituloAmplo}
          lineHeight={String(tipografia.alturaLinha.titulo)}
          color={cores.text.heading}
        >
          Base Acadêmica
        </Heading>
      </VStack>

      {/* Timeline */}
      {isLoading ? (
        <VStack align="stretch" gap="8" pl={{ base: "8", md: "12" }}>
          {[0, 1, 2].map((i) => (
            <VStack key={i} align="flex-start" gap="2">
              <Box
                h="0.7rem"
                w="8rem"
                bg={cores.border.DEFAULT}
                borderRadius={raio.sm}
                opacity={0.3}
              />
              <Box
                h="1.3rem"
                w="min(60%, 20rem)"
                bg={cores.border.DEFAULT}
                borderRadius={raio.sm}
                opacity={0.3}
              />
              <Box
                h="0.8rem"
                w="10rem"
                bg={cores.border.DEFAULT}
                borderRadius={raio.sm}
                opacity={0.22}
              />
            </VStack>
          ))}
        </VStack>
      ) : (
        <Box
          position="relative"
          borderLeft={`1px solid ${cores.border.DEFAULT}`}
          ml={{ base: "0", md: "1" }}
        >
          {formacoes.map((formacao, i) => (
            <ItemFormacao
              key={formacao.id}
              formacao={formacao}
              acento={ACENTOS[i % ACENTOS.length]}
              ultima={i === formacoes.length - 1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
