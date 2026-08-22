/**
 * Validação de credenciais de login (client-side).
 *
 * Apenas UX / defesa em profundidade: bloqueia payloads absurdos antes de
 * chegar ao backend. A validação REAL é sempre responsabilidade do servidor.
 */

import type { Credenciais } from "@/types/auth";
import type { ErroValidacao } from "./validacao";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const MIN_SENHA = 8;
const MAX_SENHA = 128;

/**
 * Valida credenciais de login.
 * Retorna array vazio se válido, ou lista de erros por campo.
 */
export function validarCredenciais(dados: Credenciais): ErroValidacao[] {
  const erros: ErroValidacao[] = [];

  const email = dados.email.trim().toLowerCase();
  if (!email) {
    erros.push({ campo: "email", mensagem: "E-mail é obrigatório" });
  } else if (!EMAIL_REGEX.test(email)) {
    erros.push({ campo: "email", mensagem: "E-mail inválido" });
  } else if (email.length > MAX_EMAIL) {
    erros.push({
      campo: "email",
      mensagem: `E-mail deve ter no máximo ${MAX_EMAIL} caracteres`,
    });
  }

  const senha = dados.senha;
  if (!senha) {
    erros.push({ campo: "senha", mensagem: "Senha é obrigatória" });
  } else if (senha.length < MIN_SENHA) {
    erros.push({
      campo: "senha",
      mensagem: `Senha deve ter no mínimo ${MIN_SENHA} caracteres`,
    });
  } else if (senha.length > MAX_SENHA) {
    erros.push({
      campo: "senha",
      mensagem: `Senha deve ter no máximo ${MAX_SENHA} caracteres`,
    });
  }

  return erros;
}
