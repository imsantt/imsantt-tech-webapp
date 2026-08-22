import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, chakra, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { cores, raio, sombras, transicao } from "@/lib/tema/tokens";
import { Logo } from "@/components/ui/logo/Logo";
import { useAuth } from "@/hooks/use-auth/useAuth.hook";

interface LocationState {
  from?: string;
}

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { entrar, enviando, erro, autenticado, limparErro } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destino =
    (location.state as LocationState | null)?.from ?? "/admin/dashboard";

  // Redireciona quando autenticado (login bem-sucedido ou sessão já ativa).
  useEffect(() => {
    if (autenticado) {
      navigate(destino, { replace: true });
    }
  }, [autenticado, destino, navigate]);

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    await entrar({ email, senha });
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
        maxW="400px"
        bg={cores.bg.card}
        border={`1px solid ${cores.borda.sutil}`}
        borderRadius={raio["2xl"]}
        boxShadow={sombras.card}
        px={{ base: "6", md: "8" }}
        py={{ base: "8", md: "10" }}
      >
        {/* Cabeçalho */}
        <VStack gap="3" textAlign="center">
          <Logo tamanhoIcone="30px" tamanhoFonte="xl" />

          <Heading
            as="h1"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="700"
            letterSpacing="-0.5px"
            color={cores.texto.titulo}
          >
            Acessar conta
          </Heading>

          <Text fontSize="sm" color={cores.texto.corpo} lineHeight="1.6">
            Entre com suas credenciais para continuar.
          </Text>
        </VStack>

        {/* Formulário */}
        <chakra.form w="100%" onSubmit={aoEnviar} noValidate>
          <VStack gap="4" align="stretch">
            {/* Mensagem de erro genérica (não revela detalhes) */}
            {erro && (
              <Box
                role="alert"
                bg={cores.erro.sutil}
                border={`1px solid ${cores.erro.DEFAULT}`}
                borderRadius={raio.lg}
                px="4"
                py="3"
                fontSize="sm"
                color={cores.erro.claro}
              >
                {erro}
              </Box>
            )}

            <Box>
              <chakra.label
                htmlFor="email"
                display="block"
                mb="2"
                fontSize="sm"
                fontWeight="600"
                color={cores.texto.titulo}
              >
                E-mail
              </chakra.label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (erro) limparErro();
                }}
                placeholder="voce@exemplo.com"
                autoComplete="email"
                required
                disabled={enviando}
                bg={cores.bg.elevado}
                border={`1px solid ${cores.borda.DEFAULT}`}
                borderRadius={raio.lg}
                color={cores.texto.titulo}
                px="4"
                py="6"
                fontSize="md"
                transition={transicao.rapida}
                _placeholder={{ color: cores.texto.sutil }}
                _hover={{ borderColor: cores.borda.hover }}
                _focus={{
                  borderColor: cores.primaria.DEFAULT,
                  boxShadow: sombras.input,
                  outline: "none",
                }}
              />
            </Box>

            <Box>
              <chakra.label
                htmlFor="senha"
                display="block"
                mb="2"
                fontSize="sm"
                fontWeight="600"
                color={cores.texto.titulo}
              >
                Senha
              </chakra.label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (erro) limparErro();
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={enviando}
                bg={cores.bg.elevado}
                border={`1px solid ${cores.borda.DEFAULT}`}
                borderRadius={raio.lg}
                color={cores.texto.titulo}
                px="4"
                py="6"
                fontSize="md"
                transition={transicao.rapida}
                _placeholder={{ color: cores.texto.sutil }}
                _hover={{ borderColor: cores.borda.hover }}
                _focus={{
                  borderColor: cores.primaria.DEFAULT,
                  boxShadow: sombras.input,
                  outline: "none",
                }}
              />
            </Box>

            <chakra.button
              type="submit"
              disabled={enviando}
              w="100%"
              mt="2"
              bg={cores.primaria.DEFAULT}
              color={cores.branco}
              fontWeight="600"
              fontSize="md"
              py="3"
              borderRadius={raio.lg}
              transition={transicao.elevacao}
              cursor={enviando ? "not-allowed" : "pointer"}
              opacity={enviando ? 0.7 : 1}
              _hover={{
                bg: enviando ? cores.primaria.DEFAULT : cores.primaria.hover,
                boxShadow: enviando ? "none" : sombras.botao,
              }}
            >
              {enviando ? "Entrando..." : "Entrar"}
            </chakra.button>
          </VStack>
        </chakra.form>
      </VStack>
    </Box>
  );
}
