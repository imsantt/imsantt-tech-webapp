import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { cores, layout } from "@/lib/tema/tokens";
import {
  validarContato,
  sanitizarContato,
  type ErroValidacao,
} from "@/lib/validacao";
import { enviarMensagemContato } from "@/services/contato/contato.service";
import { limiterContato } from "@/lib/rate-limiter";
import * as s from "./Contato.styles";

type StatusFormulario = "idle" | "validando" | "enviando" | "sucesso" | "erro";

interface DadosFormulario {
  nome: string;
  email: string;
  mensagem: string;
}

const estadoInicial: DadosFormulario = { nome: "", email: "", mensagem: "" };

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

    if (erros.length > 0) {
      setErros((prev) => prev.filter((erro) => erro.campo !== name));
    }
  };

  const erroDoCampo = (campo: string): string | undefined =>
    erros.find((e) => e.campo === campo)?.mensagem;

  const aoEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroGeral("");

    if (!limiterContato.permitir()) {
      const espera = Math.ceil(limiterContato.tempoEspera() / 1000);
      setErroGeral(
        `Muitas tentativas. Aguarde ${espera}s antes de tentar novamente.`,
      );
      setStatus("erro");
      return;
    }

    setStatus("validando");
    const dadosSanitizados = sanitizarContato(formulario);
    const errosValidacao = validarContato(dadosSanitizados);

    if (errosValidacao.length > 0) {
      setErros(errosValidacao);
      setStatus("erro");
      return;
    }

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
      css={s.secao}
    >
      <Box maxW={layout.maxWidthEstrito} mx="auto">
        <VStack
          gap="5"
          mb={{ base: "10", md: "14" }}
          textAlign="left"
          align="flex-start"
        >
          <HStack gap="3" align="center">
            <Box css={s.eyebrowTraco} aria-hidden="true" />
            <Text css={s.eyebrowTexto}>04 — Contato</Text>
          </HStack>
          <Heading as="h2" id="contato-titulo" css={s.titulo}>
            Vamos conversar
          </Heading>
          <Text css={s.subtitulo}>
            Tem um projeto em mente ou quer trocar uma ideia? Manda uma
            mensagem.
          </Text>
        </VStack>

        <Box css={s.cartao}>
          {isSucesso && (
            <Box css={s.feedbackSucesso} role="status" aria-live="polite">
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

          {erroGeral && status === "erro" && (
            <Box css={s.feedbackErro} role="alert" aria-live="assertive">
              <Box fontSize="lg" flexShrink={0} aria-hidden="true">
                ✕
              </Box>
              <Text fontSize="sm" color={cores.erro.claro}>
                {erroGeral}
              </Text>
            </Box>
          )}

          <form
            noValidate
            aria-label="Formulário de contato"
            onSubmit={aoEnviar}
            style={s.formulario}
          >
            <Field.Root invalid={!!erroDoCampo("nome")}>
              <Field.Label css={s.rotulo}>Nome</Field.Label>
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
                css={s.entrada}
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
              <Field.Label css={s.rotulo}>E-mail</Field.Label>
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
                css={s.entrada}
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
              <Field.Label css={s.rotulo}>Mensagem</Field.Label>
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
                css={s.entrada}
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
              size="lg"
              disabled={isEnviando}
              loading={isEnviando}
              loadingText="Enviando..."
              css={s.botaoEnviar}
            >
              Enviar mensagem
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
