import { Box, Image } from "@chakra-ui/react";
import { cores, tipografia } from "@/lib/tema/tokens";

interface LogoProps {
  tamanhoIcone?: string;
  tamanhoFonte?: string;
}

export function Logo({
  tamanhoIcone = "22px",
  tamanhoFonte = "sm",
}: LogoProps) {
  return (
    <Box display="inline-flex" alignItems="center" gap="2" userSelect="none">
      <Image
        src="/images/logo.webp"
        alt=""
        w={tamanhoIcone}
        h={tamanhoIcone}
        objectFit="contain"
        display="inline-block"
        aria-hidden="true"
      />
      <Box
        as="span"
        fontFamily={tipografia.familia.mono}
        fontSize={tamanhoFonte}
        fontWeight={tipografia.peso.medium}
        color={cores.text.heading}
        letterSpacing="0.02em"
      >
        IMSANTT
      </Box>
      <Box
        as="span"
        fontFamily={tipografia.familia.mono}
        fontSize={tamanhoFonte}
        fontWeight={tipografia.peso.medium}
        color={cores.text.subtle}
        letterSpacing="0.02em"
      >
        TECH
      </Box>
    </Box>
  );
}
