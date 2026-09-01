import {
  Box,
  chakra,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import {
  FaCubes,
  FaUsersGear,
  FaChalkboardUser,
  FaRocket,
} from "react-icons/fa6";
import { useScrollSuave } from "@/hooks/use-scroll-suave/useScrollSuave.hook";
import { cores, layout, raio, tipografia, transicao } from "@/lib/tema/tokens";
import {
  CardServico,
  type Servico,
} from "./fragments/card-servico/card-servico.fragment";

const SERVICOS: Servico[] = [
  {
    id: "engenharia-arquitetura",
    icone: FaCubes,
    titulo: "Engenharia & Arquitetura de Software",
    descricao:
      "Decisões técnicas que sustentam produtos por anos. Definição de arquitetura, escolha de stack e padrões que reduzem custo de manutenção e aceleram entregas.",
    itens: [
      "Arquitetura de aplicações web e APIs",
      "Revisão técnica e refatoração estratégica",
      "Padrões de código e governança técnica",
    ],
    acento: cores.category.violet,
  },
  {
    id: "sistemas-escalaveis",
    icone: FaRocket,
    titulo: "Sistemas e Sites Escaláveis",
    descricao:
      "Do MVP à alta escala. Desenvolvimento de sistemas, plataformas e sites de alta performance, preparados para crescer sem reescrever tudo no caminho.",
    itens: [
      "Plataformas web full-stack de ponta a ponta",
      "Performance, SEO e experiências de alta fidelidade",
      "Infraestrutura em nuvem e CI/CD",
    ],
    acento: cores.category.cyan,
  },
  {
    id: "mentoria-lideranca",
    icone: FaChalkboardUser,
    titulo: "Mentoria & Liderança Técnica",
    descricao:
      "Acompanhamento de pessoas e squads na evolução técnica e de carreira, com foco especial em ampliar a representatividade e a liderança negra na tecnologia.",
    itens: [
      "Mentoria individual de carreira em tech",
      "Desenvolvimento de lideranças técnicas",
      "Representatividade e liderança negra na tecnologia",
    ],
    acento: cores.category.emerald,
  },
  {
    id: "consultoria-times",
    icone: FaUsersGear,
    titulo: "Consultoria para Times de Produto",
    descricao:
      "Alinhamento entre produto, negócio e engenharia. Diagnóstico técnico, organização de squads e processos que destravam entregas sem sacrificar qualidade.",
    itens: [
      "Diagnóstico técnico e de processos",
      "Estruturação de squads e fluxos de entrega",
      "Ponte entre estratégia de produto e arquitetura",
    ],
    acento: cores.category.gold,
  },
];

export function Servicos() {
  const { rolarParaAncora } = useScrollSuave();

  return (
    <Box
      as="section"
      id="servicos"
      aria-labelledby="servicos-titulo"
      py={{ base: "20", md: "28" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.background.subtle}
      borderTop={`1px solid ${cores.border.DEFAULT}`}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Cabeçalho */}
        <VStack
          align="flex-start"
          gap="5"
          mb={{ base: "12", md: "16" }}
          textAlign="left"
        >
          <HStack gap="3" align="center">
            <Box
              w="24px"
              h="1px"
              bg={cores.accent.DEFAULT}
              aria-hidden="true"
            />
            <Text
              fontFamily={tipografia.familia.mono}
              fontSize="xs"
              fontWeight={tipografia.peso.medium}
              letterSpacing={tipografia.tracking.label}
              textTransform="uppercase"
              color={cores.accent.light}
            >
              04 — Serviços
            </Text>
          </HStack>

          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            gap="6"
            w="full"
          >
            <Heading
              as="h2"
              id="servicos-titulo"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight={tipografia.peso.light}
              letterSpacing={tipografia.tracking.tituloAmplo}
              lineHeight={String(tipografia.alturaLinha.titulo)}
              color={cores.text.heading}
            >
              Consultoria & Mentoria
            </Heading>

            <Text
              fontSize="md"
              color={cores.text.body}
              maxW="46ch"
              lineHeight={String(tipografia.alturaLinha.relaxada)}
            >
              Além de construir software, apoio pessoas e times a evoluir —
              unindo arquitetura, escala e desenvolvimento de lideranças.
            </Text>
          </Flex>
        </VStack>

        {/* Grid de serviços */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: "4", md: "5" }}
          alignItems="stretch"
        >
          {SERVICOS.map((servico) => (
            <CardServico key={servico.id} servico={servico} />
          ))}
        </Grid>

        {/* CTA para contato */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap="5"
          mt={{ base: "10", md: "14" }}
          p={{ base: "6", md: "7" }}
          bg={cores.background.card}
          border={`1px solid ${cores.border.DEFAULT}`}
          borderRadius={raio["2xl"]}
        >
          <Text
            fontSize="md"
            color={cores.text.body}
            maxW="52ch"
            lineHeight={String(tipografia.alturaLinha.relaxada)}
          >
            Tem um desafio de arquitetura, escala ou liderança técnica? Vamos
            conversar sobre como posso ajudar.
          </Text>
          <chakra.button
            type="button"
            onClick={() => rolarParaAncora("contato")}
            display="inline-flex"
            alignItems="center"
            gap="2"
            flexShrink={0}
            bg={cores.text.heading}
            color={cores.background.base}
            fontWeight="500"
            fontSize="sm"
            px="6"
            py="3"
            borderRadius={raio.md}
            cursor="pointer"
            transition={transicao.padrao}
            _hover={{ bg: cores.primary.hover }}
          >
            Iniciar conversa
            <Box as={FiArrowUpRight} fontSize="16px" />
          </chakra.button>
        </Flex>
      </Box>
    </Box>
  );
}
