/**
 * Modelos de domínio — Autenticação.
 *
 * Tipos agnósticos ao provider. Tanto o backend proprietário quanto o
 * Supabase são adaptados para estes contratos, de modo que a UI e os hooks
 * nunca dependam de um provider específico.
 */

/** Credenciais fornecidas pelo usuário no formulário de login. */
export interface Credenciais {
  email: string;
  senha: string;
}

/** Usuário autenticado (dados não sensíveis). */
export interface Usuario {
  id: string;
  email: string;
  nome?: string;
}

/**
 * Sessão ativa.
 *
 * Importante: o token de acesso NÃO é exposto aqui de propósito.
 * - No provider da API: o token vive em cookie HttpOnly (inacessível ao JS),
 *   protegendo contra roubo por XSS.
 * - No provider do Supabase: o SDK gerencia o token internamente.
 */
export interface Sessao {
  usuario: Usuario;
  /** Epoch (ms) de expiração, quando o provider informa. */
  expiraEm?: number;
}

/**
 * Contrato comum de autenticação.
 * Qualquer provider (API própria, Supabase, etc.) implementa esta interface.
 */
export interface AuthProvider {
  /** Autentica com e-mail e senha. Lança AuthError em falha. */
  entrar(credenciais: Credenciais): Promise<Sessao>;

  /** Encerra a sessão atual. Idempotente. */
  sair(): Promise<void>;

  /** Retorna a sessão atual, ou null se não autenticado. */
  sessaoAtual(): Promise<Sessao | null>;

  /**
   * (Opcional) Observa mudanças de sessão (ex.: refresh, logout em outra aba).
   * Retorna uma função para cancelar a inscrição.
   */
  aoMudarSessao?(callback: (sessao: Sessao | null) => void): () => void;
}

/** Códigos de erro normalizados entre providers. */
export type AuthErrorCode =
  | "credenciais-invalidas"
  | "rede"
  | "nao-configurado"
  | "muitas-tentativas"
  | "desconhecido";

/**
 * Erro de autenticação normalizado.
 * A mensagem exibida ao usuário deve ser genérica (evita enumeração de contas).
 */
export class AuthError extends Error {
  readonly codigo: AuthErrorCode;

  constructor(codigo: AuthErrorCode, mensagem?: string) {
    super(mensagem ?? codigo);
    this.name = "AuthError";
    this.codigo = codigo;
  }
}

/** Mensagem genérica única para falha de login (não revela detalhes). */
export const MENSAGEM_ERRO_GENERICA = "E-mail ou senha inválidos.";

/** Mensagem para excesso de tentativas (rate limit client-side). */
export const MENSAGEM_MUITAS_TENTATIVAS =
  "Muitas tentativas. Aguarde um momento antes de tentar novamente.";
