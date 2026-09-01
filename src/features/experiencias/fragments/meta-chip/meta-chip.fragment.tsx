import { Box } from "@chakra-ui/react";
import { cores, raio, tipografia } from "@/lib/tema/tokens";

/** Chip de metadado — usado para modelo, vínculo e setor de uma experiência. */
export function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      gap="1.5"
      fontFamily={tipografia.familia.mono}
      fontSize="xs"
      fontWeight="400"
      color={cores.text.body}
      bg={cores.primary.subtle}
      border={`1px solid ${cores.border.DEFAULT}`}
      px="2.5"
      py="1"
      borderRadius={raio.sm}
      whiteSpace="nowrap"
    >
      {children}
    </Box>
  );
}
