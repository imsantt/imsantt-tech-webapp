import { useNavigate } from "react-router-dom";
import { Box, chakra, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio, sombras, transicao } from "@/lib/tema/tokens";
import { useAuth } from "@/hooks/use-auth/useAuth.hook";

export function Dashboard() {
  const { sessao, sair } = useAuth();
  const navigate = useNavigate();

  async function aoSair() {
    await sair();
    navigate("/login", { replace: true });
  }

  return (
    <Box
      as="main"
      id="conteudo-principal"
      minH="100svh"
      bg={cores.bg.base}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="5"
      py="16"
    >
      <VStack
        as="section"
        gap="6"
        w="100%"
        maxW="440px"
        bg={cores.bg.card}
        border={`1px solid ${cores.borda.sutil}`}
        borderRadius={raio["2xl"]}
        boxShadow={sombras.card}
        px={{ base: "6", md: "8" }}
        py={{ base: "8", md: "10" }}
        textAlign="center"
      >
        <Heading
          as="h1"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="700"
          letterSpacing="-0.5px"
          color={cores.texto.titulo}
        >
          Você está logado
        </Heading>

        <Text fontSize="sm" color={cores.texto.corpo} lineHeight="1.6">
          {sessao?.usuario.email
            ? `Sessão ativa como ${sessao.usuario.email}.`
            : "Sessão ativa."}
        </Text>

        <chakra.button
          type="button"
          onClick={aoSair}
          w="100%"
          mt="2"
          bg={cores.primaria.DEFAULT}
          color={cores.branco}
          fontWeight="600"
          fontSize="md"
          py="3"
          borderRadius={raio.lg}
          transition={transicao.elevacao}
          cursor="pointer"
          _hover={{
            bg: cores.primaria.hover,
            boxShadow: sombras.botao,
          }}
        >
          Sair
        </chakra.button>
      </VStack>
    </Box>
  );
}
