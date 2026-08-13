import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useScrollSuave } from "../../hooks/useScrollSuave";

const itensNavegacao = [
  { rotulo: "Home", ancora: "home" },
  { rotulo: "Trajetória", ancora: "trajetoria" },
  { rotulo: "Expertise", ancora: "expertise" },
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
      borderColor={rolado ? "#2a2a3a" : "transparent"}
      bg={rolado ? "rgba(10, 10, 15, 0.88)" : "transparent"}
      backdropFilter={rolado ? "blur(16px)" : "none"}
      transition="background 0.3s, border-color 0.3s, padding 0.3s"
    >
      <HStack maxW="1200px" mx="auto" px="6" gap="10" align="center">
        {/* Logo */}
        <Link
          to="/"
          aria-label="IMSANTT.DEV - Ir para o início"
          onClick={() => setMenuAberto(false)}
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <Box
            fontSize="lg"
            fontWeight="700"
            color="#f3f4f6"
            letterSpacing="-0.5px"
            whiteSpace="nowrap"
          >
            IMSANTT
            <Box as="span" color="#a855f7">
              .TECH
            </Box>
          </Box>
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
              color="#9ca3af"
              fontWeight="500"
              fontSize="sm"
              px="3"
              onClick={() => aoClicarAncora(item.ancora)}
              _hover={{ color: "#f3f4f6", bg: "rgba(255,255,255,0.06)" }}
            >
              {item.rotulo}
            </Button>
          ))}
        </Box>

        {/* Botão Contato desktop */}
        <Button
          display={{ base: "none", md: "flex" }}
          size="sm"
          bg="#7c3aed"
          color="white"
          fontWeight="600"
          px="5"
          borderRadius="lg"
          ml="auto"
          flexShrink={0}
          onClick={() => aoClicarAncora("contato")}
          _hover={{ bg: "#9333ea", transform: "translateY(-1px)" }}
          transition="background 0.2s, transform 0.2s"
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
          bg="transparent"
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
            bg="#f3f4f6"
            borderRadius="2px"
            transition="transform 0.3s, opacity 0.3s"
            transform={menuAberto ? "translateY(7px) rotate(45deg)" : "none"}
          />
          <Box
            w="22px"
            h="2px"
            bg="#f3f4f6"
            borderRadius="2px"
            transition="transform 0.3s, opacity 0.3s"
            opacity={menuAberto ? 0 : 1}
          />
          <Box
            w="22px"
            h="2px"
            bg="#f3f4f6"
            borderRadius="2px"
            transition="transform 0.3s, opacity 0.3s"
            transform={menuAberto ? "translateY(-7px) rotate(-45deg)" : "none"}
          />
        </Flex>
      </HStack>

      {/* Menu mobile */}
      {menuAberto && (
        <Box
          as="nav"
          aria-label="Navegação mobile"
          bg="rgba(10, 10, 15, 0.97)"
          borderTop="1px solid #2a2a3a"
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
                color="#9ca3af"
                fontWeight="500"
                fontSize="md"
                onClick={() => aoClicarAncora(item.ancora)}
                _hover={{ color: "#f3f4f6", bg: "rgba(255,255,255,0.06)" }}
              >
                {item.rotulo}
              </Button>
            ))}
            <Button
              mt="3"
              w="full"
              bg="#7c3aed"
              color="white"
              fontWeight="600"
              borderRadius="lg"
              onClick={() => aoClicarAncora("contato")}
              _hover={{ bg: "#9333ea" }}
            >
              Contato
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
