import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export function NotFound() {
  return (
    <Box
      as="main"
      id="conteudo-principal"
      minH="100svh"
      bg="#0a0a0f"
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
            background: "linear-gradient(135deg, #f3f4f6 0%, #7c3aed 100%)",
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
          color="#f3f4f6"
          fontWeight="600"
        >
          Página não encontrada
        </Heading>

        <Text color="#9ca3af" fontSize="md" lineHeight="1.6">
          Parece que essa rota não existe. Talvez tenha sido movida ou o
          endereço esteja errado.
        </Text>

        <Button
          as={Link}
          to="/"
          mt="2"
          bg="#7c3aed"
          color="white"
          fontWeight="600"
          size="lg"
          px="7"
          borderRadius="xl"
          _hover={{
            bg: "#9333ea",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 30px rgba(124,58,237,0.4)",
          }}
          transition="background 0.2s, transform 0.2s, box-shadow 0.2s"
        >
          Voltar para o início
        </Button>
      </VStack>
    </Box>
  );
}
