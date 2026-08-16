import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useScrollSuave } from "../../../hooks/use-scroll-suave/useScrollSuave.hook";
import { Logo } from "../../ui/logo/Logo";
import { cores, layout, transicao } from "../../../lib/tema/tokens";

const itensNavegacao = [
  { rotulo: "Home", ancora: "home" },
  { rotulo: "Expertise", ancora: "expertise" },
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
      borderColor={rolado ? cores.borda.DEFAULT : cores.transparente}
      bg={rolado ? cores.bg.overlay : cores.transparente}
      backdropFilter={rolado ? "blur(16px)" : "none"}
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
              color={cores.texto.corpo}
              fontWeight="500"
              fontSize="sm"
              px="3"
              onClick={() => aoClicarAncora(item.ancora)}
              _hover={{
                color: cores.texto.titulo,
                bg: "rgba(255,255,255,0.06)",
              }}
            >
              {item.rotulo}
            </Button>
          ))}
        </Box>

        {/* Botão Contato desktop */}
        <Button
          display={{ base: "none", md: "flex" }}
          size="sm"
          bg={cores.primaria.DEFAULT}
          color={cores.branco}
          fontWeight="600"
          px="5"
          borderRadius="lg"
          ml="auto"
          flexShrink={0}
          onClick={() => aoClicarAncora("contato")}
          _hover={{ bg: cores.primaria.hover, transform: "translateY(-1px)" }}
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
          bg={cores.transparente}
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
            w="22px"
            h="2px"
            bg={cores.texto.titulo}
            borderRadius="2px"
            transition={transicao.lenta}
            transform={menuAberto ? "translateY(7px) rotate(45deg)" : "none"}
          />
          <Box
            w="22px"
            h="2px"
            bg={cores.texto.titulo}
            borderRadius="2px"
            transition={transicao.lenta}
            opacity={menuAberto ? 0 : 1}
          />
          <Box
            w="22px"
            h="2px"
            bg={cores.texto.titulo}
            borderRadius="2px"
            transition={transicao.lenta}
            transform={menuAberto ? "translateY(-7px) rotate(-45deg)" : "none"}
          />
        </Flex>
      </HStack>

      {/* Menu mobile */}
      {menuAberto && (
        <Box
          as="nav"
          aria-label="Navegação mobile"
          bg={cores.bg.overlayForte}
          borderTop={`1px solid ${cores.borda.DEFAULT}`}
          px="6"
          pt="4"
          pb="6"
          display={{ md: "none" }}
        >
          <Flex direction="column" gap="1">
            {itensNavegacao.map((item) => (
              <Button
                key={item.ancora}
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                color={cores.texto.corpo}
                fontWeight="500"
                fontSize="md"
                onClick={() => aoClicarAncora(item.ancora)}
                _hover={{
                  color: cores.texto.titulo,
                  bg: "rgba(255,255,255,0.06)",
                }}
              >
                {item.rotulo}
              </Button>
            ))}
            <Button
              mt="3"
              w="full"
              bg={cores.primaria.DEFAULT}
              color={cores.branco}
              fontWeight="600"
              borderRadius="lg"
              onClick={() => aoClicarAncora("contato")}
              _hover={{ bg: cores.primaria.hover }}
            >
              Contato
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
