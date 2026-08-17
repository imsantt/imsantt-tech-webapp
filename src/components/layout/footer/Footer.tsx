import { Box, Flex, Grid, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { FiMail, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { Logo } from "@/components/ui/logo/Logo";
import { cores, raio, transicao, layout } from "@/lib/tema/tokens";
import { useConfiguracao } from "@/hooks/use-configuracao/useConfiguracao.hook";
import { useAcessarLinkExterno } from "@/hooks/use-acessar-link-externo/useAcessarLinkExterno.hook";
import type { RedeSocial } from "@/types/configuracao";

const anoAtual = new Date().getFullYear();

const ICONES_REDES: Record<RedeSocial["icone"], React.ElementType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
};

export function Footer() {
  const { configuracao } = useConfiguracao();
  const { acessar } = useAcessarLinkExterno();
  const {
    contato,
    navegacao,
    linksAjuda,
    redesSociais,
    nomeAutor,
    cargo,
    disponivel,
  } = configuracao;

  return (
    <Box
      as="footer"
      role="contentinfo"
      borderTop={`1px solid ${cores.borda.DEFAULT}`}
      bg={cores.bg.sutil}
    >
      {/* Conteúdo principal */}
      <Box
        maxW={layout.maxWidth}
        mx="auto"
        px={{ base: "6", md: "12" }}
        py={{ base: "12", md: "16" }}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1.4fr 1fr 1fr 1fr" }}
          gap={{ base: "10", md: "8" }}
        >
          {/* Coluna — Identidade */}
          <VStack align="flex-start" gap="4">
            <Logo />
            <Text fontSize="sm" color={cores.texto.corpo} lineHeight="1.7">
              Engenharia de software orientada a resultados, com foco em
              arquitetura escalável e experiências de alto impacto.
            </Text>

            {/* Status de disponibilidade */}
            {disponivel && (
              <Flex
                align="center"
                gap="2"
                px="3"
                py="1.5"
                bg="rgba(34, 197, 94, 0.08)"
                border="1px solid rgba(34, 197, 94, 0.25)"
                borderRadius={raio.full}
              >
                <Box
                  w="6px"
                  h="6px"
                  bg={cores.sucesso.DEFAULT}
                  borderRadius={raio.full}
                  boxShadow={`0 0 6px ${cores.sucesso.DEFAULT}`}
                />
                <Text
                  fontSize="xs"
                  fontWeight="500"
                  color={cores.sucesso.claro}
                >
                  Disponível para projetos
                </Text>
              </Flex>
            )}

            {/* Redes sociais */}
            <Flex gap="2" mt="1">
              {redesSociais.map((rede) => {
                const Icone = ICONES_REDES[rede.icone];
                return (
                  <Box
                    key={rede.label}
                    as="button"
                    type="button"
                    aria-label={rede.label}
                    onClick={() => acessar({ url: rede.href })}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w="36px"
                    h="36px"
                    borderRadius={raio.lg}
                    border={`1px solid ${cores.borda.DEFAULT}`}
                    bg={cores.transparente}
                    color={cores.texto.corpo}
                    cursor="pointer"
                    transition={transicao.padrao}
                    _hover={{
                      color: cores.primaria.claro,
                      borderColor: cores.primaria.borda,
                      bg: cores.primaria.sutil,
                    }}
                  >
                    <Box as={Icone} fontSize="16px" />
                  </Box>
                );
              })}
            </Flex>
          </VStack>

          {/* Coluna — Navegação */}
          <VStack align="flex-start" gap="3">
            <Heading
              as="h3"
              fontSize="xs"
              fontWeight="700"
              color={cores.texto.titulo}
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Navegação
            </Heading>
            {navegacao.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                fontSize="sm"
                color={cores.texto.corpo}
                _hover={{ color: cores.primaria.claro }}
                transition={transicao.rapida}
              >
                {link.label}
              </Link>
            ))}
          </VStack>

          {/* Coluna — Recursos */}
          <VStack align="flex-start" gap="3">
            <Heading
              as="h3"
              fontSize="xs"
              fontWeight="700"
              color={cores.texto.titulo}
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Recursos
            </Heading>
            {linksAjuda.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                fontSize="sm"
                color={cores.texto.corpo}
                _hover={{ color: cores.primaria.claro }}
                transition={transicao.rapida}
              >
                {link.label}
              </Link>
            ))}
          </VStack>

          {/* Coluna — Contato */}
          <VStack align="flex-start" gap="3">
            <Heading
              as="h3"
              fontSize="xs"
              fontWeight="700"
              color={cores.texto.titulo}
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Contato
            </Heading>

            {contato.email && (
              <Flex align="center" gap="2">
                <Box as={FiMail} color={cores.primaria.claro} boxSize="3.5" />
                <Link
                  href={`mailto:${contato.email}`}
                  fontSize="sm"
                  color={cores.texto.corpo}
                  _hover={{ color: cores.primaria.claro }}
                  transition={transicao.rapida}
                >
                  {contato.email}
                </Link>
              </Flex>
            )}
          </VStack>
        </Grid>
      </Box>

      {/* Rodapé inferior — full width divider */}
      <Box borderTop={`1px solid ${cores.borda.DEFAULT}`}>
        <Flex
          maxW={layout.maxWidth}
          mx="auto"
          px={{ base: "6", md: "12" }}
          py="5"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="3"
        >
          <Text fontSize="xs" color={cores.texto.sutil}>
            © {anoAtual}{" "}
            <Box as="span" color={cores.texto.corpo} fontWeight="500">
              {nomeAutor}
            </Box>
            . Feito com dedicação e ☕
          </Text>

          <Text fontSize="xs" color={cores.texto.sutil}>
            {cargo}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
