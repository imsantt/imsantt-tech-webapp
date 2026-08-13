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

interface DadosFormulario {
  nome: string;
  email: string;
  mensagem: string;
}

const estadoInicial: DadosFormulario = { nome: "", email: "", mensagem: "" };

const estiloEntrada = {
  bg: "#111118",
  border: "1px solid",
  borderColor: "#2a2a3a",
  borderRadius: "xl",
  color: "#f3f4f6",
  fontSize: "sm",
  _placeholder: { color: "rgba(156,163,175,0.5)" },
  _focus: {
    borderColor: "#a855f7",
    boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.15)",
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

  // 🚧 Envio real ainda não implementado — será conectado ao Supabase Edge Function
  const aoEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      as="section"
      id="contato"
      aria-labelledby="contato-titulo"
      py={{ base: "16", md: "24" }}
      px="6"
      bg="#0a0a0f"
    >
      <Box maxW="680px" mx="auto">
        <VStack gap="4" mb={{ base: "10", md: "14" }} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color="#a855f7"
          >
            Contato
          </Text>
          <Heading
            as="h2"
            id="contato-titulo"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="700"
            letterSpacing="-1px"
            color="#f3f4f6"
          >
            Vamos conversar
          </Heading>
          <Text fontSize="md" color="#9ca3af" lineHeight="1.6">
            Tem um projeto em mente ou quer trocar uma ideia? Manda uma
            mensagem.
          </Text>
        </VStack>

        <Box
          bg="#16161f"
          border="1px solid #2a2a3a"
          borderRadius="2xl"
          p={{ base: "6", md: "10" }}
        >
          {/* Banner de feature em desenvolvimento */}
          <Box
            display="flex"
            alignItems="flex-start"
            gap="3"
            bg="rgba(124, 58, 237, 0.08)"
            border="1px solid rgba(124, 58, 237, 0.3)"
            borderRadius="xl"
            px="4"
            py="3"
            mb="6"
          >
            <Box fontSize="lg" flexShrink={0} aria-hidden="true">
              🚧
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="600" color="#f3f4f6" mb="0.5">
                Feature em desenvolvimento
              </Text>
              <Text fontSize="xs" color="#9ca3af" lineHeight="1.5">
                O envio de mensagens ainda está sendo implementado. Em breve
                você poderá entrar em contato diretamente por aqui.
              </Text>
            </Box>
          </Box>

          <Box
            as="form"
            onSubmit={aoEnviar}
            noValidate
            aria-label="Formulário de contato"
            display="flex"
            flexDirection="column"
            gap="6"
            opacity={0.5}
            pointerEvents="none"
            aria-disabled="true"
          >
            <Field.Root>
              <Field.Label
                fontSize="sm"
                fontWeight="500"
                color="#f3f4f6"
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
                color="#f3f4f6"
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
                color="#f3f4f6"
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
              bg="#7c3aed"
              color="white"
              fontWeight="600"
              size="lg"
              px="8"
              borderRadius="xl"
              alignSelf="flex-start"
              disabled
              tabIndex={-1}
              cursor="not-allowed"
            >
              Enviar mensagem
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
