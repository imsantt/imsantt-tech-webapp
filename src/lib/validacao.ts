/**
 * Utilitários de validação e sanitização.
 * Usar em qualquer input de usuário antes de enviar ao backend.
 */

import type { MensagemContato } from "@/types/contato";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOME = 100;
const MAX_EMAIL = 254;
const MAX_MENSAGEM = 2000;

export interface ErroValidacao {
  campo: string;
  mensagem: string;
}

/**
 * Remove HTML tags e caracteres perigosos de uma string.
 * Mantém texto útil, mas elimina padrões usados em XSS e atributos de evento.
 */
export function sanitizar(valor: string): string {
  return valor
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "$1 ")
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "$1 ")
    .replace(/<[^>]+>/g, " ")
    .replace(/(?:javascript|vbscript|data)\s*:/gi, "")
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, " ")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Valida dados do formulário de contato.
 * Retorna array vazio se válido, ou lista de erros.
 */
export function validarContato(dados: MensagemContato): ErroValidacao[] {
  const erros: ErroValidacao[] = [];

  // Nome
  const nome = dados.nome.trim();
  if (!nome) {
    erros.push({ campo: "nome", mensagem: "Nome é obrigatório" });
  } else if (nome.length > MAX_NOME) {
    erros.push({
      campo: "nome",
      mensagem: `Nome deve ter no máximo ${MAX_NOME} caracteres`,
    });
  }

  // Email
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

  // Mensagem
  const mensagem = dados.mensagem.trim();
  if (!mensagem) {
    erros.push({ campo: "mensagem", mensagem: "Mensagem é obrigatória" });
  } else if (mensagem.length > MAX_MENSAGEM) {
    erros.push({
      campo: "mensagem",
      mensagem: `Mensagem deve ter no máximo ${MAX_MENSAGEM} caracteres`,
    });
  }

  return erros;
}

/**
 * Sanitiza todos os campos de um objeto de contato.
 */
export function sanitizarContato(dados: MensagemContato): MensagemContato {
  return {
    nome: sanitizar(dados.nome),
    email: sanitizar(dados.email).toLowerCase(),
    mensagem: sanitizar(dados.mensagem),
  };
}
