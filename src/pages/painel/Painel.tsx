import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  chakra,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { Logo } from "@/components/ui/logo/Logo";
import { cores, raio, tipografia } from "@/lib/tema/tokens";
import { useSessao } from "@/hooks/use-sessao/useSessao.hook";
import { sair } from "@/services/autenticacao/autenticacao.service";

export function Painel() {
  const navegar = useNavigate();
  const { autenticado, usuario, isLoading, revalidar } = useSessao();

  // Guard: sem sessão válida, volta ao login.
  useEffect(() => {
    if (!isLoading && !autenticado) navegar("/login", { replace: true });
  }, [autenticado, isLoading, navegar]);

  const aoSair = async () => {
    await sair();
    await revalidar();
    navegar("/login", { replace: true });
  };

  if (isLoading || !autenticado) {
    return (
      <Box
        as="main"
        id="conteudo-principal"
        minH="100svh"
        bg={cores.background.base}
        display="flex"
        alignItems="center"
        justifyContent="center"
        role="status"
        aria-label="Verificando sessão..."
      >
        <Box
          w="40px"
          h="40px"
          border={`3px solid ${cores.border.DEFAULT}`}
          borderTop={`3px solid ${cores.primary.light}`}
          borderRadius={raio.full}
          style={{ animation: "spin 0.7s linear infinite" }}
        />
      </Box>
    );
  }

  return (
    <Box
      as="main"
      id="conteudo-principal"
      minH="100svh"
      bg={cores.background.base}
      px={{ base: "6", md: "10" }}
      py={{ base: "10", md: "16" }}
    >
      <Box maxW="60rem" mx="auto">
        <HStack justify="space-between" align="center" mb="12">
          <Logo tamanhoFonte="md" />
          <chakra.button
            type="button"
            onClick={aoSair}
            display="inline-flex"
            alignItems="center"
            gap="2"
            fontSize="sm"
            color={cores.text.body}
            bg="transparent"
            border={`1px solid ${cores.border.DEFAULT}`}
            borderRadius={raio.md}
            px="4"
            py="2"
            cursor="pointer"
            _hover={{
              borderColor: cores.border.hover,
              color: cores.text.heading,
            }}
          >
            <FiLogOut size={15} aria-hidden="true" />
            Sair
          </chakra.button>
        </HStack>

        <VStack gap="6" align="flex-start">
          <HStack gap="4" align="center">
            {usuario?.avatar && (
              <Image
                src={usuario.avatar}
                alt=""
                w="56px"
                h="56px"
                borderRadius={raio.full}
                border={`1px solid ${cores.border.DEFAULT}`}
                aria-hidden="true"
              />
            )}
            <Box>
              <Text
                fontFamily={tipografia.familia.mono}
                fontSize="xs"
                letterSpacing={tipografia.tracking.label}
                textTransform="uppercase"
                color={cores.accent.light}
              >
                Painel privado
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight={tipografia.peso.light}
                letterSpacing={tipografia.tracking.tituloAmplo}
                color={cores.text.heading}
              >
                {usuario?.nome ?? usuario?.login}
              </Heading>
            </Box>
          </HStack>

          <Text color={cores.text.body} fontSize="md" lineHeight="1.6">
            Sessão autenticada via GitHub. Este é o esqueleto do painel — os
            módulos de gestão de conteúdo entram aqui nos próximos passos.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
