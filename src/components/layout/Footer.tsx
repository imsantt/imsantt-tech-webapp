import { Box, Text } from "@chakra-ui/react";

const anoAtual = new Date().getFullYear();

export function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      borderTop="1px solid #2a2a3a"
      py="8"
      px="6"
      bg="#111118"
      textAlign="center"
    >
      <Box
        maxW="1200px"
        mx="auto"
        display="flex"
        flexDirection="column"
        gap="1.5"
      >
        <Text fontSize="sm" color="#9ca3af">
          © {anoAtual}{" "}
          <Box as="span" color="#a855f7" fontWeight="600">
            Robert Santos
          </Box>
          . Feito com dedicação e ☕
        </Text>
        <Text fontSize="xs" color="rgba(156,163,175,0.6)">
          Engenheiro de Software Sênior &amp; Arquiteto
        </Text>
      </Box>
    </Box>
  );
}
