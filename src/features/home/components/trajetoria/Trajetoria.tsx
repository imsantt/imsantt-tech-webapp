import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { CardExperiencia } from "../../../../components/ui/card-experiencia";
import { experiencias } from "../../data/experiencias";
import { cores, layout } from "../../../../lib/tema/tokens";

export function Trajetoria() {
  const anosExperiencia = DateTime.now().get("year") - 2019;

  return (
    <Box
      as="section"
      id="trajetoria"
      aria-labelledby="trajetoria-titulo"
      py={{ base: "16", md: "24" }}
      px={{ base: "6", md: "12", lg: "24" }}
      bg={`linear-gradient(135deg, rgba(124,58,237,0.35) 0%, ${cores.bg.base} 65%)`}
    >
      <Box maxW={layout.maxWidth} mx="auto">
        {/* Cabeçalho */}
        <VStack
          align="flex-start"
          gap="3"
          mb={{ base: "10", md: "14" }}
          textAlign="left"
        >
          <Text
            fontSize="xs"
            fontWeight="300"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color={cores.branco}
          >
            Trajetória
          </Text>

          <Heading
            as="h2"
            id="trajetoria-titulo"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="300"
            letterSpacing="-2px"
            lineHeight="1.05"
            color={cores.branco}
          >
            Experiência Profissional
          </Heading>

          <Text
            fontSize="md"
            color="rgba(255, 255, 255, 0.8)"
            maxW="520px"
            lineHeight="1.6"
            fontWeight="300"
          >
            +{anosExperiencia} anos construindo software escalável e liderando
            equipes em empresas de impacto.
          </Text>
        </VStack>

        {/* Grid de cards */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="5"
        >
          {experiencias.map((exp) => (
            <CardExperiencia key={exp.id} exp={exp} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
