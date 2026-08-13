import { Box, Image } from "@chakra-ui/react";
import { cores, tipografia } from "../../../lib/tema/tokens";

interface LogoProps {
  tamanhoIcone?: string;
  tamanhoFonte?: string;
}

export function Logo({
  tamanhoIcone = "28px",
  tamanhoFonte = "lg",
}: LogoProps) {
  return (
    <Box display="inline-flex" alignItems="center" gap="0" userSelect="none">
      <Box
        as="span"
        fontSize={tamanhoFonte}
        fontWeight={tipografia.peso.light}
        color={cores.texto.titulo}
        letterSpacing="-0.5px"
      >
        IMSANTT
      </Box>
      <Image
        src="/images/logo.png"
        alt=""
        w={tamanhoIcone}
        h={tamanhoIcone}
        objectFit="contain"
        display="inline-block"
        mx="1"
        aria-hidden="true"
      />
      <Box
        as="span"
        fontSize={tamanhoFonte}
        fontWeight={tipografia.peso.normal}
        color={cores.primaria.claro}
        letterSpacing="-0.5px"
      >
        TECH
      </Box>
    </Box>
  );
}
