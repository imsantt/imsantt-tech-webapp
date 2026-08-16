import { useState } from "react";
import { Box, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import heroImg from "../../../../assets/profile.jpg";
import {
  cores,
  sombras,
  raio,
  transicao,
  layout,
  tipografia,
} from "../../../../lib/tema/tokens";

export function Hero() {
  const [baixando, setBaixando] = useState(false);

  const aoClicarVerExperiencias = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("expertise")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const aoClicarBaixar = () => {
    setBaixando(true);
    setTimeout(() => setBaixando(false), 2000);
  };

  return (
    <Box
      as="section"
      id="home"
      aria-labelledby="hero-titulo"
      minH="100svh"
      display="flex"
      alignItems="center"
      px={{ base: "6", md: "12", lg: "24" }}
      bg={cores.bg.base}
      position="relative"
      overflow="hidden"
    >
      {/* Glow de fundo */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w="55%"
        h="100%"
        background="radial-gradient(ellipse at 70% 40%, rgba(88,28,235,0.35) 0%, transparent 65%)"
        pointerEvents="none"
        aria-hidden="true"
      />

      <Flex
        maxW={layout.maxWidth}
        mx="auto"
        w="full"
        align="center"
        justify="space-between"
        gap={{ base: "12", md: "16" }}
        direction={{ base: "column-reverse", md: "row" }}
        pt={{ base: "28", md: "0" }}
        pb={{ base: "16", md: "0" }}
      >
        {/* Coluna de texto */}
        <Flex
          direction="column"
          gap="6"
          maxW={{ md: "520px" }}
          textAlign={{ base: "center", md: "left" }}
          zIndex={1}
        >
          {/* Badge */}
          <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            gap="2"
            fontSize="xs"
            fontWeight="600"
            color={cores.primaria.claro}
            bg={cores.primaria.sutil}
            border={`1px solid ${cores.primaria.borda}`}
            px="3.5"
            py="1.5"
            borderRadius={raio.full}
            w="fit-content"
            mx={{ base: "auto", md: "0" }}
          >
            🚀 Estrategista em Tecnologia &amp; IA
          </Box>

          {/* Título */}
          <Heading
            as="h1"
            id="hero-titulo"
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
            fontWeight={tipografia.peso.light}
            letterSpacing="-2px"
            lineHeight="1.0"
            color={cores.texto.titulo}
          >
            Robert{" "}
            <Box
              as="span"
              style={{
                background: `linear-gradient(135deg, ${cores.primaria.claro} 0%, ${cores.primaria.DEFAULT} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: `${tipografia.peso.normal}`,
              }}
            >
              Santos
            </Box>
          </Heading>

          {/* Descrição */}
          <Text
            fontSize="md"
            lineHeight="1.7"
            textAlign="justify"
            color={cores.texto.corpo}
          >
            Engenheiro de Software Sênior &amp; Arquiteto de Sistemas com foco
            em microsserviços escaláveis, inteligência artificial e computação
            em nuvem. Conecto engenharia de alta performance, estratégia de
            negócio e desenvolvimento de pessoas para entregar soluções que
            geram impacto real e transformam equipes.
          </Text>

          {/* CTAs */}
          <HStack
            gap="3"
            flexWrap="wrap"
            justify={{ base: "center", md: "flex-start" }}
          >
            <a
              href="#expertise"
              onClick={aoClicarVerExperiencias}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: cores.primaria.DEFAULT,
                color: cores.branco,
                fontWeight: 600,
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: raio.lg,
                textDecoration: "none",
                transition: transicao.elevacao,
              }}
            >
              Ver Experiências <span aria-hidden="true">↗</span>
            </a>

            <a
              href="/curriculo-robert-santos.pdf"
              download="curriculo-robert-santos.pdf"
              aria-label="Baixar currículo em PDF"
              onClick={aoClicarBaixar}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: baixando ? cores.primaria.claro : cores.texto.titulo,
                fontWeight: 600,
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: raio.lg,
                border: baixando
                  ? `1px solid ${cores.primaria.bordaForte}`
                  : `1px solid ${cores.borda.hover}`,
                backgroundColor: baixando
                  ? cores.primaria.sutil
                  : cores.transparente,
                textDecoration: "none",
                transition: transicao.lenta,
              }}
            >
              <FiDownload size={16} />
              {baixando ? "Download iniciado!" : "Baixar Currículo"}
            </a>
          </HStack>
        </Flex>

        {/* Imagem */}
        <Box
          position="relative"
          flexShrink={0}
          zIndex={1}
          mx={{ base: "auto", md: "0" }}
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w={{ base: "280px", md: "380px" }}
            h={{ base: "280px", md: "380px" }}
            background="radial-gradient(circle, rgba(124,58,237,0.55) 0%, transparent 68%)"
            borderRadius={raio.full}
            filter="blur(24px)"
            pointerEvents="none"
          />
          <Image
            src={heroImg}
            alt="Foto de Robert Santos"
            w={{ base: "240px", md: "340px" }}
            h={{ base: "240px", md: "340px" }}
            borderRadius={raio.full}
            objectFit="cover"
            objectPosition="top center"
            border={`2px solid ${cores.primaria.bordaForte}`}
            position="relative"
            zIndex={1}
            boxShadow={sombras.destaque}
          />
        </Box>
      </Flex>
    </Box>
  );
}
