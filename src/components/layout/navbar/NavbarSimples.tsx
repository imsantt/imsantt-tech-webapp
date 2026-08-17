import { Link } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Logo } from "@/components/ui/logo/Logo";
import { cores, layout, raio, transicao } from "@/lib/tema/tokens";

/**
 * Navbar simplificada para páginas internas.
 * Exibe logo + botão de voltar para a Home.
 */
export function NavbarSimples() {
  return (
    <Box
      as="header"
      role="banner"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      py="3"
      borderBottom={`1px solid ${cores.borda.DEFAULT}`}
      bg={cores.bg.overlay}
      backdropFilter="blur(16px)"
      transition={transicao.lenta}
    >
      <HStack
        maxW={layout.maxWidth}
        mx="auto"
        px="6"
        justify="space-between"
        align="center"
      >
        <Link
          to="/"
          aria-label="IMSANTT.TECH - Ir para o início"
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <Logo />
        </Link>

        <Link
          to="/"
          aria-label="Voltar para a página inicial"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: cores.texto.corpo,
            fontWeight: 500,
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: raio.lg,
            border: `1px solid ${cores.borda.DEFAULT}`,
            backgroundColor: cores.transparente,
            textDecoration: "none",
            transition: transicao.padrao,
          }}
        >
          <FiArrowLeft size={14} />
          Voltar
        </Link>
      </HStack>
    </Box>
  );
}
