import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import {
  cores,
  raio,
  sombras,
  transicao,
  layout,
} from "../../../../lib/tema/tokens";

export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  periodo: string;
  atual?: boolean;
  descricao: string;
  tecnologias: string[];
}

// Dados estáticos — futuramente virão do Supabase
const experiencias: Experiencia[] = [
  {
    id: "yduqs",
    empresa: "YDUQS",
    cargo: "Engenheiro de Software Fullstack Sr. / Apoio à Liderança Técnica",
    periodo: "Nov 2023 – Presente",
    atual: true,
    descricao:
      "Apoio direto à Liderança Técnica no alinhamento estratégico entre produto/negócio e arquitetura de software para os portais do maior grupo educacional do país.",
    tecnologias: ["NestJS", "React", "AWS", "Terraform", "Docker"],
  },
  {
    id: "senai",
    empresa: "SENAI/SC",
    cargo: "Instrutor em Desenvolvimento Web / Mentor Técnico",
    periodo: "Mai 2023 – Dez 2023",
    descricao:
      "Liderança técnica de turmas do projeto DEVInHouse, instruindo sobre arquitetura moderna, código limpo e ecossistema React, Angular e TypeScript.",
    tecnologias: ["React", "Angular", "TypeScript", "Scrum"],
  },
  {
    id: "act-digital",
    empresa: "act digital",
    cargo: "Engenheiro de Software Front-End Sr.",
    periodo: "Jul 2022 – Abr 2023",
    descricao:
      "Arquitetura front-end do Internet Banking PJ (Banco ABC), módulo de pagamentos de alta complexidade transacional.",
    tecnologias: ["Angular", "TypeScript", "Azure DevOps"],
  },
  {
    id: "gama-academy",
    empresa: "Gama Academy",
    cargo: "Mentor em Desenvolvimento de Soluções Web",
    periodo: "Ago 2022 – Set 2022",
    descricao:
      "Mentoria técnica End-to-End para squads em programas de aceleração, cobrindo arquitetura de software e desenvolvimento fullstack.",
    tecnologias: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "jdc",
    empresa: "JDC",
    cargo: "Analista Desenvolvedor Fullstack",
    periodo: "Ago 2021 – Jul 2022",
    descricao:
      "Desenvolvimento fullstack com Angular, React, Node.js e PHP, além de modelagem e otimização de bancos de dados relacionais.",
    tecnologias: ["Angular", "React", "Node.js", "PHP", "MySQL"],
  },
];

function CardExperiencia({ exp }: { exp: Experiencia }) {
  const isAtivo = exp.atual;

  return (
    <Flex
      as="article"
      aria-label={`${exp.cargo} na ${exp.empresa}`}
      direction="column"
      gap="4"
      bg={isAtivo ? cores.bg.elevado : cores.bg.card}
      border={`1px solid ${isAtivo ? cores.primaria.borda : cores.borda.sutil}`}
      borderRadius={raio["2xl"]}
      p="7"
      position="relative"
      transition={transicao.lenta}
      boxShadow={isAtivo ? sombras.destaque : "none"}
      _hover={{
        borderColor: cores.primaria.borda,
        transform: "translateY(-4px)",
        boxShadow: sombras.destaque,
      }}
    >
      {/* Header: ícone + empresa + período + badge */}
      <Flex justify="space-between" align="flex-start">
        <HStack gap="3">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="42px"
            h="42px"
            bg={isAtivo ? cores.primaria.sutil : "rgba(99, 102, 241, 0.12)"}
            borderRadius={raio.lg}
            flexShrink={0}
            aria-hidden="true"
          >
            <Box
              as={FaBuilding}
              fontSize="16px"
              color={isAtivo ? cores.primaria.claro : cores.secundaria.DEFAULT}
            />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="700" color={cores.texto.titulo}>
              {exp.empresa}
            </Text>
            <Text fontSize="xs" color={cores.texto.corpo}>
              {exp.periodo}
            </Text>
          </Box>
        </HStack>
        {isAtivo && (
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

      {/* Cargo */}
      <Heading
        as="h3"
        fontSize="md"
        fontWeight="700"
        color={cores.texto.titulo}
        lineHeight="1.4"
      >
        {exp.cargo}
      </Heading>

      {/* Descrição */}
      <Text fontSize="sm" color={cores.texto.corpo} lineHeight="1.65" flex={1}>
        {exp.descricao}
      </Text>

      {/* Tecnologias */}
      <Flex flexWrap="wrap" gap="1.5" aria-label="Tecnologias utilizadas">
        {exp.tecnologias.map((tec) => (
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

      {/* Link ver detalhes */}
      <HStack
        gap="1.5"
        color={cores.primaria.claro}
        fontSize="sm"
        fontWeight="500"
        cursor="pointer"
        opacity={0.7}
        mt="1"
        _hover={{ opacity: 1 }}
        transition={transicao.rapida}
      >
        <Text>Ver detalhes</Text>
        <Box as={FiExternalLink} fontSize="14px" />
      </HStack>
    </Flex>
  );
}

export function Trajetoria() {
  return (
    <Box
      as="section"
      id="trajetoria"
      aria-labelledby="trajetoria-titulo"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.bg.sutil}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Cabeçalho — estilo Hero, alinhado à esquerda */}
        <VStack
          align="flex-start"
          gap="3"
          mb={{ base: "10", md: "14" }}
          textAlign="left"
        >
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color={cores.texto.titulo}
            display="none"
          >
            Trajetória
          </Text>

          <Heading
            as="h2"
            id="trajetoria-titulo"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="300"
            letterSpacing="-2px"
            lineHeight="1.05"
          >
            <Box
              as="span"
              style={{
                background: `linear-gradient(135deg, ${cores.primaria.claro} 0%, ${cores.primaria.DEFAULT} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Experiência Profissional
            </Box>
          </Heading>

          <Text
            fontSize="md"
            color={cores.texto.corpo}
            maxW="520px"
            lineHeight="1.6"
          >
            +4 anos construindo software escalável e liderando equipes em
            empresas de impacto.
          </Text>
        </VStack>

        {/* Grid de cards — mesmo padrão da Expertise */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="5"
        >
          {experiencias.map((exp) => (
            <CardExperiencia key={exp.id} exp={exp} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
