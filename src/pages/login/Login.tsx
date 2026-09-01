import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  chakra,
  Field,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { Logo } from "@/components/ui/logo/Logo";
import { cores } from "@/lib/tema/tokens";
import {
  entrarComGitHub,
  mensagemErroLogin,
} from "@/services/autenticacao/autenticacao.service";
import { useSessao } from "@/hooks/use-sessao/useSessao.hook";
import * as s from "./Login.styles";

const MotionBox = motion.create(Box);

const containerVariants = {
  oculto: { opacity: 0 },
  visivel: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  oculto: { opacity: 0, y: 14 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface DadosLogin {
  email: string;
  senha: string;
}

const estadoInicial: DadosLogin = { email: "", senha: "" };

export function Login() {
  const [formulario, setFormulario] = useState<DadosLogin>(estadoInicial);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [entrando, setEntrando] = useState(false);
  const [parametros] = useSearchParams();
  const navegar = useNavigate();
  const { autenticado, isLoading } = useSessao();

  const erroLogin = mensagemErroLogin(parametros.get("erro"));

  // Se já houver sessão válida, encaminha ao painel.
  useEffect(() => {
    if (!isLoading && autenticado) navegar("/painel", { replace: true });
  }, [autenticado, isLoading, navegar]);

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const aoEntrarComGitHub = () => {
    setEntrando(true);
    entrarComGitHub();
  };

  // Credenciais (e-mail/senha) seguem apenas como interface — o acesso real
  // é exclusivamente via GitHub (allowlist do proprietário no servidor).
  const aoEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box as="main" id="conteudo-principal" css={s.pagina}>
      <Box css={s.traceTopo} aria-hidden="true" />

      {/* ─── Painel editorial (esquerda) ─────────────────────────────────── */}
      <Box css={s.painel} aria-hidden="true">
        <Box css={s.painelGrade} />
        <Box css={s.painelConteudo}>
          <Logo tamanhoFonte="md" tamanhoIcone="26px" />

          <Box>
            <HStack gap="3" align="center" mb="6">
              <Box css={s.eyebrowTraco} />
              <Text css={s.eyebrowTexto}>Painel privado</Text>
            </HStack>
            <Heading as="p" css={s.painelTagline}>
              Onde a engenharia encontra a{" "}
              <chakra.span css={s.painelTaglineAcento}>intenção</chakra.span>.
            </Heading>
            <Text css={s.painelDescricao}>
              Um espaço reservado para gerir conteúdo, projetos e as iniciativas
              que dão forma ao imsantt.tech.
            </Text>
          </Box>

          <Box css={s.painelMeta}>
            <Box css={s.metaLinha}>
              <Box css={s.metaPonto} />
              <Text as="span">
                <chakra.span css={s.metaChave}>status</chakra.span> · sistemas
                operacionais
              </Text>
            </Box>
            <Box css={s.metaLinha}>
              <Text as="span">
                <chakra.span css={s.metaChave}>acesso</chakra.span> · restrito
                ao proprietário
              </Text>
            </Box>
            <Box css={s.metaLinha}>
              <Text as="span">
                <chakra.span css={s.metaChave}>região</chakra.span> · edge ·
                cloudflare
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ─── Coluna do formulário (direita) ──────────────────────────────── */}
      <Box css={s.colunaFormulario}>
        <MotionBox
          css={s.cartao}
          variants={containerVariants}
          initial="oculto"
          animate="visivel"
        >
          <VStack gap="7" align="stretch">
            {/* Cabeçalho */}
            <MotionBox variants={itemVariants}>
              <VStack gap="4" align="flex-start">
                <Box display={{ base: "flex", lg: "none" }}>
                  <Logo tamanhoFonte="md" />
                </Box>
                <HStack gap="3" align="center">
                  <Box css={s.eyebrowTraco} aria-hidden="true" />
                  <Text css={s.eyebrowTexto}>Área restrita</Text>
                </HStack>
                <Heading as="h1" css={s.titulo}>
                  Bem-vindo de volta
                </Heading>
                <Text css={s.subtitulo}>
                  Este painel é exclusivo do proprietário. Entre com o GitHub
                  para continuar.
                </Text>
              </VStack>
            </MotionBox>

            {/* Erro de login (vindo do callback via ?erro=) */}
            {erroLogin && (
              <MotionBox variants={itemVariants}>
                <Box css={s.erro} role="alert" aria-live="assertive">
                  <Box fontSize="sm" flexShrink={0} aria-hidden="true">
                    ✕
                  </Box>
                  <Text
                    fontSize="xs"
                    color={cores.danger.light}
                    lineHeight="1.5"
                  >
                    {erroLogin}
                  </Text>
                </Box>
              </MotionBox>
            )}

            {/* GitHub — ação primária */}
            <MotionBox variants={itemVariants}>
              <VStack gap="3" align="stretch">
                <chakra.button
                  type="button"
                  css={s.botaoGithub}
                  aria-label="Continuar com GitHub"
                  onClick={aoEntrarComGitHub}
                  disabled={entrando}
                  aria-busy={entrando}
                >
                  <FiGithub size={18} aria-hidden="true" />
                  {entrando ? "Redirecionando…" : "Continuar com GitHub"}
                </chakra.button>
                <HStack justify="center" gap="2">
                  <Text
                    fontSize="0.6875rem"
                    color={cores.text.subtle}
                    fontFamily="mono"
                  >
                    método recomendado
                  </Text>
                  <Box as="span" css={s.badgeExclusivo}>
                    Exclusivo
                  </Box>
                </HStack>
              </VStack>
            </MotionBox>

            {/* Separador */}
            <MotionBox variants={itemVariants}>
              <Box css={s.separador} aria-hidden="true">
                <Box css={s.separadorLinha} />
                <Text css={s.separadorTexto}>ou com credenciais</Text>
                <Box css={s.separadorLinha} />
              </Box>
            </MotionBox>

            {/* Formulário de credenciais — alternativa */}
            <MotionBox variants={itemVariants}>
              <form
                noValidate
                aria-label="Formulário de acesso"
                onSubmit={aoEnviar}
                style={s.formulario}
              >
                <Field.Root>
                  <Field.Label css={s.rotulo}>E-mail</Field.Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formulario.email}
                    onChange={aoAlterar}
                    autoComplete="email"
                    css={s.entrada}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label css={s.rotulo}>Senha</Field.Label>
                  <Box position="relative">
                    <Input
                      id="senha"
                      name="senha"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="••••••••"
                      value={formulario.senha}
                      onChange={aoAlterar}
                      autoComplete="current-password"
                      pr="12"
                      css={s.entrada}
                    />
                    <chakra.button
                      type="button"
                      onClick={() => setMostrarSenha((v) => !v)}
                      aria-label={
                        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                      }
                      aria-pressed={mostrarSenha}
                      css={s.olhoBotao}
                    >
                      {mostrarSenha ? (
                        <FiEyeOff size={16} />
                      ) : (
                        <FiEye size={16} />
                      )}
                    </chakra.button>
                  </Box>
                </Field.Root>

                <Box css={s.linhaAuxiliar}>
                  <chakra.label css={s.checkboxLabel} htmlFor="lembrar">
                    <input id="lembrar" name="lembrar" type="checkbox" />
                    Manter conectado
                  </chakra.label>
                  <chakra.a href="#" css={s.linkDiscreto}>
                    Esqueci minha senha
                  </chakra.a>
                </Box>

                <Button type="submit" size="lg" css={s.botaoEntrar}>
                  Entrar com credenciais
                </Button>

                <Box css={s.aviso} role="note">
                  <Box fontSize="sm" flexShrink={0} aria-hidden="true">
                    ⚠
                  </Box>
                  <Text
                    fontSize="xs"
                    color={cores.warning.light}
                    lineHeight="1.5"
                  >
                    Login por credenciais é apenas demonstrativo. O acesso real
                    é exclusivo via GitHub.
                  </Text>
                </Box>
              </form>
            </MotionBox>

            {/* Rodapé */}
            <MotionBox variants={itemVariants}>
              <VStack gap="5">
                <Text css={s.rodapeTexto}>
                  Não tem acesso?{" "}
                  <chakra.a href="#" css={s.linkDiscreto} display="inline">
                    Fale com o proprietário
                  </chakra.a>
                </Text>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Box css={s.voltarLink}>
                    <FiArrowLeft size={13} aria-hidden="true" />
                    Voltar para o início
                  </Box>
                </Link>
              </VStack>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}
