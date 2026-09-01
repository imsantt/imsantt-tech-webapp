import { Link } from "react-router-dom";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio, transicao } from "@/lib/tema/tokens";

export function NotFound() {
  return (
    <Box
      as="main"
      id="conteudo-principal"
      minH="100svh"
      bg={cores.background.base}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="6"
      py="20"
      textAlign="center"
    >
      <VStack gap="5" maxW="480px">
        <Box
          as="span"
          aria-hidden="true"
          fontSize={{ base: "7xl", md: "9xl" }}
          fontWeight="800"
          letterSpacing="-4px"
          lineHeight="1"
          style={{
            background: `linear-gradient(135deg, ${cores.text.heading} 0%, ${cores.primary.DEFAULT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </Box>

        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "3xl" }}
          color={cores.text.heading}
          fontWeight="600"
        >
          Página não encontrada
        </Heading>

        <Text color={cores.text.body} fontSize="md" lineHeight="1.6">
          Parece que essa rota não existe. Talvez tenha sido movida ou o
          endereço esteja errado.
        </Text>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: cores.primary.DEFAULT,
            color: cores.white,
            fontWeight: 600,
            fontSize: "16px",
            padding: "12px 28px",
            borderRadius: raio.xl,
            textDecoration: "none",
            marginTop: "8px",
            transition: transicao.elevacao,
          }}
        >
          Voltar para o início
        </Link>
      </VStack>
    </Box>
  );
}
