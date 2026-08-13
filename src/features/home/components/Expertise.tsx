import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { FaCode, FaMicrochip, FaPeopleGroup } from "react-icons/fa6";
import type { IconType } from "react-icons";

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
    iconeBg: "rgba(99, 102, 241, 0.2)",
    iconeColor: "#818cf8",
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
    iconeBg: "rgba(34, 197, 94, 0.15)",
    iconeColor: "#4ade80",
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
      bg="#13131a"
      border="1px solid #1e1e2e"
      borderRadius="2xl"
      p="8"
      transition="border-color 0.3s, transform 0.3s, box-shadow 0.3s"
      _hover={{
        borderColor: "rgba(124, 58, 237, 0.4)",
        transform: "translateY(-4px)",
        boxShadow: "0 0 40px rgba(124, 58, 237, 0.12)",
      }}
    >
      {/* Ícone com fundo colorido */}
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="48px"
        h="48px"
        bg={iconeBg}
        borderRadius="xl"
        flexShrink={0}
        aria-hidden="true"
      >
        <Box as={Icone} fontSize="22px" color={iconeColor} />
      </Box>

      <Heading as="h3" fontSize="lg" fontWeight="700" color="#f3f4f6">
        {titulo}
      </Heading>

      <Text fontSize="sm" color="#6b7280" lineHeight="1.7" flex={1}>
        {descricao}
      </Text>

      {/* Tags de tecnologia */}
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
            color="#a855f7"
            bg="rgba(124, 58, 237, 0.1)"
            border="1px solid rgba(124, 58, 237, 0.3)"
            px="2.5"
            py="1"
            borderRadius="full"
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
      bg="#0a0a0f"
    >
      <Box maxW="1200px" mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color="#a855f7"
          >
            Expertise
          </Text>

          <Heading
            as="h2"
            id="expertise-titulo"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="800"
            letterSpacing="-1px"
            color="#f3f4f6"
          >
            O que eu faço
          </Heading>

          <Text fontSize="md" color="#6b7280" maxW="480px" lineHeight="1.6">
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
