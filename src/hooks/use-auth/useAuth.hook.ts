import { useCallback, useEffect, useRef, useState } from "react";
import type { Credenciais, Sessao } from "@/types/auth";
import {
  AuthError,
  MENSAGEM_ERRO_GENERICA,
  MENSAGEM_MUITAS_TENTATIVAS,
} from "@/types/auth";
import { authProvider } from "@/services/auth";
import { validarCredenciais } from "@/lib/validacao-auth";
import { RateLimiter } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";

/**
 * Rate limiter client-side para login.
 * Apenas UX anti-spam — o rate limiting real é responsabilidade do backend.
 * 5 tentativas por 1 minuto.
 */
const limiterLogin = new RateLimiter({
  maxTentativas: 5,
  janela: 60 * 1000,
});

export interface UseAuthRetorno {
  sessao: Sessao | null;
  autenticado: boolean;
  /** Carregando a verificação inicial de sessão. */
  carregando: boolean;
  /** Submit de login em andamento. */
  enviando: boolean;
  /** Mensagem de erro genérica para exibir na UI (ou null). */
  erro: string | null;
  entrar: (credenciais: Credenciais) => Promise<boolean>;
  sair: () => Promise<void>;
  limparErro: () => void;
}

/**
 * Hook de autenticação.
 * Abstrai o provider ativo (API própria ou Supabase) atrás de uma API estável.
 */
export function useAuth(): UseAuthRetorno {
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const montado = useRef(true);

  useEffect(() => {
    montado.current = true;
    return () => {
      montado.current = false;
    };
  }, []);

  // Verificação inicial de sessão + inscrição em mudanças (se suportado).
  useEffect(() => {
    let cancelar: (() => void) | undefined;

    authProvider
      .sessaoAtual()
      .then((s) => {
        if (montado.current) setSessao(s);
      })
      .catch(() => {
        if (montado.current) setSessao(null);
      })
      .finally(() => {
        if (montado.current) setCarregando(false);
      });

    if (authProvider.aoMudarSessao) {
      cancelar = authProvider.aoMudarSessao((s) => {
        if (montado.current) setSessao(s);
      });
    }

    return () => cancelar?.();
  }, []);

  const limparErro = useCallback(() => setErro(null), []);

  const entrar = useCallback(
    async (credenciais: Credenciais): Promise<boolean> => {
      setErro(null);

      // 1. Validação client-side (UX / defesa em profundidade).
      const errosValidacao = validarCredenciais(credenciais);
      if (errosValidacao.length > 0) {
        setErro(MENSAGEM_ERRO_GENERICA);
        return false;
      }

      // 2. Rate limit client-side (anti-spam).
      if (!limiterLogin.permitir()) {
        setErro(MENSAGEM_MUITAS_TENTATIVAS);
        return false;
      }

      setEnviando(true);
      try {
        const novaSessao = await authProvider.entrar(credenciais);
        if (montado.current) setSessao(novaSessao);
        limiterLogin.resetar();
        return true;
      } catch (e) {
        // Mensagem sempre genérica — nunca revela se o e-mail existe.
        const mensagem =
          e instanceof AuthError && e.codigo === "muitas-tentativas"
            ? MENSAGEM_MUITAS_TENTATIVAS
            : MENSAGEM_ERRO_GENERICA;
        if (montado.current) setErro(mensagem);
        return false;
      } finally {
        if (montado.current) setEnviando(false);
      }
    },
    [],
  );

  const sair = useCallback(async () => {
    try {
      await authProvider.sair();
    } catch (e) {
      logger.warn("Erro ao sair", {
        erro: e instanceof Error ? e.name : "desconhecido",
      });
    } finally {
      if (montado.current) setSessao(null);
    }
  }, []);

  return {
    sessao,
    autenticado: sessao !== null,
    carregando,
    enviando,
    erro,
    entrar,
    sair,
    limparErro,
  };
}
