import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { DateTime } from "luxon";
import heroImg from "@/assets/profile.webp";
import { useExperiencias } from "@/hooks/use-experiencias/useExperiencias.hook";
import { cores, layout, tipografia } from "@/lib/tema/tokens";
import { heroContent, type Metrica } from "../../data/hero";
import * as s from "./Hero.styles";

export function Hero() {
  const [baixando, setBaixando] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { experiencias } = useExperiencias();

  // Anos de carreira = ano atual − ano da experiência mais antiga.
  const anoInicioMaisAntigo = experiencias.reduce<number | null>(
    (maisAntigo, exp) => {
      const ano = exp.dataInicio.year;
      return maisAntigo === null || ano < maisAntigo ? ano : maisAntigo;
    },
    null,
  );

  const anosExperiencia =
    anoInicioMaisAntigo !== null
      ? DateTime.now().year - anoInicioMaisAntigo
      : null;

  const metricas: Metrica[] = [
    ...(anosExperiencia !== null
      ? [
          {
            valor: `+${anosExperiencia}`,
            rotulo: heroContent.rotuloAnosExperiencia,
          },
        ]
      : []),
    ...heroContent.metricasFixas,
  ];

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const aoClicarVerExperiencias = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("habilidades")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const aoClicarBaixar = () => {
    setBaixando(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setBaixando(false), 2000);
  };

  return (
    <Box as="section" id="home" aria-labelledby="hero-titulo" css={s.secao}>
      {/* Grade estrutural sutil de fundo — sem glow */}
      <Box aria-hidden="true" css={s.gradeFundo} />

      <Grid maxW={layout.maxWidth} mx="auto" css={s.grid}>
        {/* Coluna de texto */}
        <Flex
          direction="column"
          gap="8"
          maxW={{ md: "560px" }}
          textAlign="left"
        >
          {/* Eyebrow técnico — índice + papel */}
          <Flex direction="column" gap="4">
            <HStack gap="3" align="center">
              <Box aria-hidden="true" css={s.eyebrowTraco} />
              <Text as="span" css={s.eyebrowTexto}>
                {heroContent.badge}
              </Text>
            </HStack>
          </Flex>

          {/* Título */}
          <Heading as="h1" id="hero-titulo" css={s.titulo}>
            {heroContent.nome}
            <br />
            <Box as="span" fontWeight={tipografia.peso.normal}>
              {heroContent.sobrenome}
            </Box>
            <Box as="span" aria-hidden="true" css={s.tituloTraco} />
          </Heading>

          {/* Papel */}
          <Text css={s.papel}>{heroContent.papel}</Text>

          {/* Descrição */}
          <Text css={s.descricao}>{heroContent.descricao}</Text>

          {/* CTAs */}
          <HStack gap="3" flexWrap="wrap" pt="1">
            <a
              href={`#${heroContent.ctaPrimario.ancora}`}
              onClick={aoClicarVerExperiencias}
              style={s.ctaPrimario}
            >
              {heroContent.ctaPrimario.texto}
              <FiArrowUpRight size={16} aria-hidden="true" />
            </a>

            <a
              href={heroContent.ctaSecundario.arquivo}
              download={heroContent.ctaSecundario.arquivo.split("/").pop()}
              aria-label={heroContent.ctaSecundario.ariaLabel}
              onClick={aoClicarBaixar}
              style={s.ctaSecundario(baixando)}
            >
              <FiDownload size={15} />
              {baixando
                ? heroContent.ctaSecundario.textoAtivo
                : heroContent.ctaSecundario.texto}
            </a>
          </HStack>

          {/* Métricas — régua horizontal */}
          <Flex css={s.metricasRegua}>
            {metricas.map((m) => (
              <Flex key={m.rotulo} direction="column" gap="1">
                <Text css={s.metricaValor}>{m.valor}</Text>
                <Text css={s.metricaRotulo}>{m.rotulo}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>

        {/* Retrato — moldura arquitetônica, sem glow circular */}
        <Box
          position="relative"
          w="full"
          maxW={{ base: "320px", md: "none" }}
          mx={{ base: "auto", md: "0" }}
          order={{ base: -1, md: 0 }}
        >
          {/* Marca de registro no canto superior esquerdo */}
          <Box
            position="absolute"
            top="-1px"
            left="-1px"
            w="20px"
            h="20px"
            borderTop={`1px solid ${cores.acento.borda}`}
            borderLeft={`1px solid ${cores.acento.borda}`}
            zIndex={2}
            aria-hidden="true"
          />
          <Box
            position="absolute"
            bottom="-1px"
            right="-1px"
            w="20px"
            h="20px"
            borderBottom={`1px solid ${cores.acento.borda}`}
            borderRight={`1px solid ${cores.acento.borda}`}
            zIndex={2}
            aria-hidden="true"
          />

          <Box css={s.molduraRetrato}>
            <Image
              src={heroImg}
              alt={heroContent.imagem.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              w="full"
              aspectRatio={{ base: "1", md: "4 / 5" }}
              objectFit="cover"
              objectPosition="top center"
              filter="grayscale(0.15) contrast(1.02)"
            />

            {/* Faixa de metadados sobre a base da imagem */}
            <Flex css={s.faixaMetadados}>
              <Text css={s.faixaMetadadosTexto}>{heroContent.indice}</Text>
              <Box
                w="6px"
                h="6px"
                bg={cores.acento.DEFAULT}
                aria-hidden="true"
              />
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
