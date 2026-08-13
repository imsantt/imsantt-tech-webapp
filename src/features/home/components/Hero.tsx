import { Box, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import heroImg from "../../../assets/robert santos profile.png";

export function Hero() {
  const aoClicarVerExperiencias = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("expertise")
      ?.scrollIntoView({ behavior: "smooth" });
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
      bg="#0a0a0f"
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
        maxW="1200px"
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
            color="#a855f7"
            bg="rgba(124, 58, 237, 0.12)"
            border="1px solid rgba(124, 58, 237, 0.35)"
            px="3.5"
            py="1.5"
            borderRadius="full"
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
            fontWeight="800"
            letterSpacing="-2px"
            lineHeight="1.0"
            color="#f3f4f6"
          >
            Robert{" "}
            <Box
              as="span"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Santos
            </Box>
          </Heading>

          {/* Descrição */}
          <Text fontSize="md" lineHeight="1.7" color="#9ca3af">
            Engenheiro de Software Sênior &amp; Arquiteto. Elo entre tecnologia
            de alta performance, inteligência artificial, objetivos de negócio e
            desenvolvimento de pessoas.
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
                backgroundColor: "#7c3aed",
                color: "white",
                fontWeight: 600,
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
            >
              Ver Experiências <span aria-hidden="true">↗</span>
            </a>

            <a
              href="/curriculo.pdf"
              download
              aria-label="Baixar currículo em PDF"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "#f3f4f6",
                fontWeight: 600,
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Baixar Currículo
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
            borderRadius="full"
            filter="blur(24px)"
            pointerEvents="none"
          />
          <Image
            src={heroImg}
            alt="Foto de Robert Santos"
            w={{ base: "240px", md: "340px" }}
            h={{ base: "240px", md: "340px" }}
            borderRadius="full"
            objectFit="cover"
            objectPosition="top center"
            border="2px solid rgba(124, 58, 237, 0.5)"
            position="relative"
            zIndex={1}
          />
        </Box>
      </Flex>
    </Box>
  );
}
