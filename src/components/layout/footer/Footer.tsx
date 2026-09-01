import { Box, Flex, Grid, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { FiMail, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { Logo } from "@/components/ui/logo/Logo";
import { cores, raio, layout } from "@/lib/tema/tokens";
import { useConfiguracao } from "@/hooks/use-configuracao/useConfiguracao.hook";
import { useAcessarLinkExterno } from "@/hooks/use-acessar-link-externo/useAcessarLinkExterno.hook";
import type { RedeSocial } from "@/types/configuracao";
import * as s from "./Footer.styles";

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
      bg={cores.bg.base}
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
              <Flex css={s.seloDisponivel}>
                <Box
                  w="6px"
                  h="6px"
                  bg={cores.sucesso.DEFAULT}
                  borderRadius={raio.full}
                />
                <Text css={s.seloDisponivelTexto}>
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
                    aria-label={rede.label}
                    onClick={() => acessar({ url: rede.href })}
                    css={s.botaoRede}
                  >
                    <Box as={Icone} fontSize="16px" />
                  </Box>
                );
              })}
            </Flex>
          </VStack>

          {/* Coluna — Navegação */}
          <VStack align="flex-start" gap="3">
            <Heading as="h3" css={s.tituloColuna}>
              Navegação
            </Heading>
            {navegacao.map((link) => (
              <Link key={link.label} href={link.href} css={s.linkColuna}>
                {link.label}
              </Link>
            ))}
          </VStack>

          {/* Coluna — Recursos */}
          <VStack align="flex-start" gap="3">
            <Heading as="h3" css={s.tituloColuna}>
              Recursos
            </Heading>
            {linksAjuda.map((link) => (
              <Link key={link.label} href={link.href} css={s.linkColuna}>
                {link.label}
              </Link>
            ))}
          </VStack>

          {/* Coluna — Contato */}
          <VStack align="flex-start" gap="3">
            <Heading as="h3" css={s.tituloColuna}>
              Contato
            </Heading>

            {contato.email && (
              <Flex align="center" gap="2">
                <Box as={FiMail} color={cores.acento.claro} boxSize="3.5" />
                <Link href={`mailto:${contato.email}`} css={s.linkColuna}>
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
          <Text css={s.textoRodapeInferior}>
            © {anoAtual}{" "}
            <Box as="span" color={cores.texto.corpo} fontWeight="500">
              {nomeAutor}
            </Box>
          </Text>

          <Text css={s.textoRodapeInferior}>{cargo}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
