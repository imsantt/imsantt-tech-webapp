/** Usuário autenticado exposto ao cliente (subconjunto seguro da sessão). */
export interface UsuarioAutenticado {
  login: string;
  nome: string | null;
  avatar: string | null;
}

/** Resposta de /auth/me. */
export interface RespostaSessao {
  autenticado: boolean;
  usuario?: UsuarioAutenticado;
}
