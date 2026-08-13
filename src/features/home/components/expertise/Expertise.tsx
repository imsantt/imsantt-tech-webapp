import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { FaCode, FaMicrochip, FaPeopleGroup } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  cores,
  raio,
  sombras,
  transicao,
  layout,
} from "../../../../lib/tema/tokens";

interface CardExpertiseProps {
  Icone: IconType;
  iconeBg: string;
  iconeColor: string;
  titulo: string;
  descricao: string;
  tecnologias: string[];
}

const itensExpertise: CardExpertiseProps[] = [
  {
    Icone: FaCode,
    iconeBg: cores.secundaria.sutil,
    iconeColor: cores.secundaria.DEFAULT,
    titulo: "Arquitetura & Clean Code",
    descricao:
      "Microsserviços escaláveis, Hexagonal Architecture, NestJS, Node.js, Fastify e React.",
    tecnologias: ["NestJS", "Node.js", "Fastify", "React", "Hexagonal Arch"],
  },
  {
    Icone: FaMicrochip,
    iconeBg: "rgba(168, 85, 247, 0.2)",
    iconeColor: "#c084fc",
    titulo: "Estratégia de IA & Cloud",
    descricao:
      "Ecossistemas nativos em nuvem (AWS Serverless, Terraform) integrados a inteligência artificial.",
    tecnologias: ["AWS Lambda", "Terraform", "Serverless", "LLMs", "RAG"],
  },
  {
    Icone: FaPeopleGroup,
    iconeBg: cores.sucesso.sutil,
    iconeColor: cores.sucesso.claro,
    titulo: "Liderança Inclusiva",
    descricao:
      "Co-idealizador das iniciativas Potenc[IA] e Guardiões Digitais para democratização da tecnologia.",
    tecnologias: ["Mentoria", "Potenc[IA]", "Guardiões Digitais", "EDI"],
  },
];

function CardExpertise({
  Icone,
  iconeBg,
  iconeColor,
  titulo,
  descricao,
  tecnologias,
}: CardExpertiseProps) {
  return (
    <Flex
      as="article"
      aria-label={titulo}
      direction="column"
      gap="5"
      bg={cores.bg.card}
      border={`1px solid ${cores.borda.sutil}`}
      borderRadius={raio["2xl"]}
      p="8"
      transition={transicao.lenta}
      _hover={{
        borderColor: cores.primaria.borda,
        transform: "translateY(-4px)",
        boxShadow: sombras.destaque,
      }}
    >
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="48px"
        h="48px"
        bg={iconeBg}
        borderRadius={raio.xl}
        flexShrink={0}
        aria-hidden="true"
      >
        <Box as={Icone} fontSize="22px" color={iconeColor} />
      </Box>

      <Heading
        as="h3"
        fontSize="lg"
        fontWeight="700"
        color={cores.texto.titulo}
      >
        {titulo}
      </Heading>

      <Text fontSize="sm" color={cores.texto.corpo} lineHeight="1.7" flex={1}>
        {descricao}
      </Text>

      <Flex
        flexWrap="wrap"
        gap="2"
        mt="1"
        aria-label="Tecnologias relacionadas"
      >
        {tecnologias.map((tec) => (
          <Box
            key={tec}
            as="span"
            fontSize="xs"
            fontWeight="500"
            color={cores.primaria.claro}
            bg={cores.primaria.sutil}
            border={`1px solid ${cores.primaria.borda}`}
            px="2.5"
            py="1"
            borderRadius={raio.full}
            whiteSpace="nowrap"
          >
            {tec}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}

export function Expertise() {
  return (
    <Box
      as="section"
      id="expertise"
      aria-labelledby="expertise-titulo"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.bg.sutil}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color={cores.primaria.claro}
          >
            Expertise
          </Text>

          <Heading
            as="h2"
            id="expertise-titulo"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="800"
            letterSpacing="-1px"
            color={cores.texto.titulo}
          >
            O que eu faço
          </Heading>

          <Text
            fontSize="md"
            color={cores.texto.corpo}
            maxW="480px"
            lineHeight="1.6"
          >
            Combinando engenharia de alta performance com estratégia de negócio
            e impacto humano.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="5">
          {itensExpertise.map((item) => (
            <CardExpertise key={item.titulo} {...item} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
