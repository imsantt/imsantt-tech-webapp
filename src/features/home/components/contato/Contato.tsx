import { useState } from "react";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { cores, raio, sombras, layout } from "@/lib/tema/tokens";

interface DadosFormulario {
  nome: string;
  email: string;
  mensagem: string;
}

const estadoInicial: DadosFormulario = { nome: "", email: "", mensagem: "" };

const estiloEntrada = {
  bg: cores.bg.sutil,
  border: "1px solid",
  borderColor: cores.borda.DEFAULT,
  borderRadius: raio.xl,
  color: cores.texto.titulo,
  fontSize: "sm",
  _placeholder: { color: cores.texto.sutil },
  _focus: {
    borderColor: cores.primaria.claro,
    boxShadow: sombras.input,
    outline: "none",
  },
};

export function Contato() {
  const [formulario, setFormulario] = useState<DadosFormulario>(estadoInicial);

  const aoAlterar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      as="section"
      id="contato"
      aria-labelledby="contato-titulo"
      py={{ base: "16", md: "24" }}
      px="6"
      bg={cores.bg.base}
    >
      <Box maxW={layout.maxWidthEstrito} mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color={cores.primaria.claro}
          >
            Contato
          </Text>
          <Heading
            as="h2"
            id="contato-titulo"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="700"
            letterSpacing="-1px"
            color={cores.texto.titulo}
          >
            Vamos conversar
          </Heading>
          <Text fontSize="md" color={cores.texto.corpo} lineHeight="1.6">
            Tem um projeto em mente ou quer trocar uma ideia? Manda uma
            mensagem.
          </Text>
        </VStack>

        <Box
          bg={cores.bg.card}
          border={`1px solid ${cores.borda.DEFAULT}`}
          borderRadius={raio["2xl"]}
          p={{ base: "6", md: "10" }}
        >
          {/* Banner em desenvolvimento */}
          <Box
            display="flex"
            alignItems="flex-start"
            gap="3"
            bg={cores.primaria.sutil}
            border={`1px solid ${cores.primaria.borda}`}
            borderRadius={raio.xl}
            px="4"
            py="3"
            mb="6"
          >
            <Box fontSize="lg" flexShrink={0} aria-hidden="true">
              🚧
            </Box>
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color={cores.texto.titulo}
                mb="0.5"
              >
                Feature em desenvolvimento
              </Text>
              <Text fontSize="xs" color={cores.texto.corpo} lineHeight="1.5">
                O envio de mensagens ainda está sendo implementado. Em breve
                você poderá entrar em contato diretamente por aqui.
              </Text>
            </Box>
          </Box>

          {/* Formulário desabilitado */}
          <form
            noValidate
            aria-label="Formulário de contato"
            aria-disabled="true"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          >
            <Field.Root>
              <Field.Label
                fontSize="sm"
                fontWeight="500"
                color={cores.texto.titulo}
                mb="2"
              >
                Nome
              </Field.Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                value={formulario.nome}
                onChange={aoAlterar}
                autoComplete="name"
                tabIndex={-1}
                {...estiloEntrada}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label
                fontSize="sm"
                fontWeight="500"
                color={cores.texto.titulo}
                mb="2"
              >
                E-mail
              </Field.Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formulario.email}
                onChange={aoAlterar}
                autoComplete="email"
                tabIndex={-1}
                {...estiloEntrada}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label
                fontSize="sm"
                fontWeight="500"
                color={cores.texto.titulo}
                mb="2"
              >
                Mensagem
              </Field.Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                placeholder="Conte um pouco sobre seu projeto ou ideia..."
                value={formulario.mensagem}
                onChange={aoAlterar}
                rows={5}
                resize="vertical"
                tabIndex={-1}
                {...estiloEntrada}
              />
            </Field.Root>

            <Button
              type="submit"
              bg={cores.primaria.DEFAULT}
              color={cores.branco}
              fontWeight="600"
              size="lg"
              px="8"
              borderRadius={raio.xl}
              alignSelf="flex-start"
              disabled
              tabIndex={-1}
              cursor="not-allowed"
            >
              Enviar mensagem
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
