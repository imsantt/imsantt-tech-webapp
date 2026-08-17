import { useState, type FormEvent } from "react";
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
import {
  validarContato,
  sanitizarContato,
  type ErroValidacao,
} from "@/lib/validacao";
import { enviarMensagemContato } from "@/services/contato/contato.service";
import { limiterContato } from "@/lib/rate-limiter";

type StatusFormulario = "idle" | "validando" | "enviando" | "sucesso" | "erro";

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
  const [status, setStatus] = useState<StatusFormulario>("idle");
  const [erros, setErros] = useState<ErroValidacao[]>([]);
  const [erroGeral, setErroGeral] = useState<string>("");

  const aoAlterar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));

    // Limpar erro do campo ao digitar
    if (erros.length > 0) {
      setErros((prev) => prev.filter((erro) => erro.campo !== name));
    }
  };

  const erroDoCampo = (campo: string): string | undefined =>
    erros.find((e) => e.campo === campo)?.mensagem;

  const aoEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroGeral("");

    // Rate limiting
    if (!limiterContato.permitir()) {
      const espera = Math.ceil(limiterContato.tempoEspera() / 1000);
      setErroGeral(
        `Muitas tentativas. Aguarde ${espera}s antes de tentar novamente.`,
      );
      setStatus("erro");
      return;
    }

    // Sanitizar e validar
    setStatus("validando");
    const dadosSanitizados = sanitizarContato(formulario);
    const errosValidacao = validarContato(dadosSanitizados);

    if (errosValidacao.length > 0) {
      setErros(errosValidacao);
      setStatus("erro");
      return;
    }

    // Enviar
    setStatus("enviando");

    try {
      await enviarMensagemContato(dadosSanitizados);
      setStatus("sucesso");
      setFormulario(estadoInicial);
      setErros([]);
    } catch {
      setErroGeral(
        "Não foi possível enviar a mensagem. Tente novamente em instantes.",
      );
      setStatus("erro");
    }
  };

  const isEnviando = status === "enviando";
  const isSucesso = status === "sucesso";

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
                O envio de mensagens ainda está sendo finalizado. O formulário
                já valida e sanitiza os dados, mas a integração com o serviço de
                e-mail será ativada em breve.
              </Text>
            </Box>
          </Box>

          {/* Feedback de sucesso */}
          {isSucesso && (
            <Box
              display="flex"
              alignItems="flex-start"
              gap="3"
              bg={cores.sucesso.sutil}
              border={`1px solid rgba(34, 197, 94, 0.35)`}
              borderRadius={raio.xl}
              px="4"
              py="3"
              mb="6"
              role="status"
              aria-live="polite"
            >
              <Box fontSize="lg" flexShrink={0} aria-hidden="true">
                ✓
              </Box>
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={cores.sucesso.claro}
                >
                  Mensagem enviada com sucesso!
                </Text>
                <Text fontSize="xs" color={cores.texto.corpo} lineHeight="1.5">
                  Obrigado pelo contato. Retorno em breve.
                </Text>
              </Box>
            </Box>
          )}

          {/* Feedback de erro geral */}
          {erroGeral && status === "erro" && (
            <Box
              display="flex"
              alignItems="flex-start"
              gap="3"
              bg={cores.erro.sutil}
              border={`1px solid rgba(239, 68, 68, 0.35)`}
              borderRadius={raio.xl}
              px="4"
              py="3"
              mb="6"
              role="alert"
              aria-live="assertive"
            >
              <Box fontSize="lg" flexShrink={0} aria-hidden="true">
                ✕
              </Box>
              <Text fontSize="sm" color={cores.erro.claro}>
                {erroGeral}
              </Text>
            </Box>
          )}

          {/* Formulário */}
          <form
            noValidate
            aria-label="Formulário de contato"
            onSubmit={aoEnviar}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Field.Root invalid={!!erroDoCampo("nome")}>
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
                disabled={isEnviando}
                aria-describedby={erroDoCampo("nome") ? "erro-nome" : undefined}
                {...estiloEntrada}
              />
              {erroDoCampo("nome") && (
                <Text
                  id="erro-nome"
                  fontSize="xs"
                  color={cores.erro.claro}
                  mt="1"
                >
                  {erroDoCampo("nome")}
                </Text>
              )}
            </Field.Root>

            <Field.Root invalid={!!erroDoCampo("email")}>
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
                disabled={isEnviando}
                aria-describedby={
                  erroDoCampo("email") ? "erro-email" : undefined
                }
                {...estiloEntrada}
              />
              {erroDoCampo("email") && (
                <Text
                  id="erro-email"
                  fontSize="xs"
                  color={cores.erro.claro}
                  mt="1"
                >
                  {erroDoCampo("email")}
                </Text>
              )}
            </Field.Root>

            <Field.Root invalid={!!erroDoCampo("mensagem")}>
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
                disabled={isEnviando}
                aria-describedby={
                  erroDoCampo("mensagem") ? "erro-mensagem" : undefined
                }
                {...estiloEntrada}
              />
              {erroDoCampo("mensagem") && (
                <Text
                  id="erro-mensagem"
                  fontSize="xs"
                  color={cores.erro.claro}
                  mt="1"
                >
                  {erroDoCampo("mensagem")}
                </Text>
              )}
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
              disabled={isEnviando}
              loading={isEnviando}
              loadingText="Enviando..."
              _hover={{ bg: cores.primaria.hover }}
            >
              Enviar mensagem
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
