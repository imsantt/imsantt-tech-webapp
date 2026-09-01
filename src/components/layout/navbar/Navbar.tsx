import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useScrollSuave } from "@/hooks/use-scroll-suave/useScrollSuave.hook";
import { Logo } from "@/components/ui/logo/Logo";
import { cores, layout, raio, tipografia, transicao } from "@/lib/tema/tokens";

const itensNavegacao = [
  { rotulo: "Home", ancora: "home" },
  { rotulo: "Habilidades", ancora: "habilidades" },
  { rotulo: "Trajetória", ancora: "trajetoria" },
  { rotulo: "Projetos", ancora: "projetos" },
  { rotulo: "Impacto Social", ancora: "impacto-social" },
];

export function Navbar() {
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const { rolarParaAncora } = useScrollSuave();

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 20);
    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const aoClicarAncora = (ancora: string) => {
    setMenuAberto(false);
    rolarParaAncora(ancora);
  };

  return (
    <Box
      as="header"
      role="banner"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      py={rolado ? "3" : "5"}
      borderBottom="1px solid"
      borderColor={rolado ? cores.border.DEFAULT : cores.transparent}
      bg={rolado ? cores.background.overlay : cores.transparent}
      backdropFilter={rolado ? "blur(20px) saturate(1.4)" : "none"}
      transition={transicao.lenta}
    >
      <HStack maxW={layout.maxWidth} mx="auto" px="6" gap="10" align="center">
        {/* Logo */}
        <Link
          to="/"
          aria-label="IMSANTT.TECH - Ir para o início"
          onClick={() => setMenuAberto(false)}
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <Logo />
        </Link>

        {/* Nav desktop */}
        <Box
          as="nav"
          aria-label="Navegação principal"
          flex={1}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          gap="1"
        >
          {itensNavegacao.map((item) => (
            <Button
              key={item.ancora}
              variant="ghost"
              size="sm"
              fontFamily={tipografia.familia.mono}
              color={cores.text.body}
              fontWeight="400"
              fontSize="xs"
              letterSpacing="0.04em"
              px="3"
              borderRadius={raio.md}
              onClick={() => aoClicarAncora(item.ancora)}
              _hover={{
                color: cores.text.heading,
                bg: cores.primary.subtle,
              }}
            >
              {item.rotulo}
            </Button>
          ))}
        </Box>

        {/* Botão Contato desktop */}
        <Button
          display={{ base: "none", md: "inline-flex" }}
          size="sm"
          bg={cores.text.heading}
          color={cores.background.base}
          fontWeight="500"
          fontSize="sm"
          px="5"
          borderRadius={raio.md}
          ml="auto"
          flexShrink={0}
          onClick={() => aoClicarAncora("contato")}
          _hover={{ bg: cores.primary.hover }}
          transition={transicao.padrao}
        >
          Contato
        </Button>

        {/* Hamburguer */}
        <Flex
          as="button"
          display={{ base: "flex", md: "none" }}
          direction="column"
          gap="1.5"
          justify="center"
          align="center"
          bg={cores.transparent}
          border="none"
          p="1"
          ml="auto"
          cursor="pointer"
          flexShrink={0}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((prev) => !prev)}
        >
          <Box
            w="20px"
            h="1.5px"
            bg={cores.text.heading}
            transition={transicao.lenta}
            transform={menuAberto ? "translateY(6px) rotate(45deg)" : "none"}
          />
          <Box
            w="20px"
            h="1.5px"
            bg={cores.text.heading}
            transition={transicao.lenta}
            opacity={menuAberto ? 0 : 1}
          />
          <Box
            w="20px"
            h="1.5px"
            bg={cores.text.heading}
            transition={transicao.lenta}
            transform={menuAberto ? "translateY(-6px) rotate(-45deg)" : "none"}
          />
        </Flex>
      </HStack>

      {/* Menu mobile */}
      {menuAberto && (
        <Box
          as="nav"
          aria-label="Navegação mobile"
          bg={cores.background.overlayStrong}
          borderTop={`1px solid ${cores.border.DEFAULT}`}
          px="6"
          pt="4"
          pb="6"
          mt={rolado ? "3" : "5"}
          display={{ md: "none" }}
        >
          <Flex direction="column" gap="1">
            {itensNavegacao.map((item) => (
              <Button
                key={item.ancora}
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                fontFamily={tipografia.familia.mono}
                color={cores.text.body}
                fontWeight="400"
                fontSize="sm"
                letterSpacing="0.02em"
                borderRadius={raio.md}
                onClick={() => aoClicarAncora(item.ancora)}
                _hover={{
                  color: cores.text.heading,
                  bg: cores.primary.subtle,
                }}
              >
                {item.rotulo}
              </Button>
            ))}
            <Button
              mt="3"
              w="full"
              bg={cores.text.heading}
              color={cores.background.base}
              fontWeight="500"
              borderRadius={raio.md}
              onClick={() => aoClicarAncora("contato")}
              _hover={{ bg: cores.primary.hover }}
            >
              Contato
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
