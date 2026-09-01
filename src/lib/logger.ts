/**
 * Logger estruturado para a aplicação.
 *
 * - Em produção: silencia debug/info, mantém warn/error
 * - Em desenvolvimento: exibe tudo com contexto formatado
 * - Preparado para integrar com serviço externo (Sentry, DataDog, etc.)
 *
 * Uso:
 *   import { logger } from "@/lib/logger";
 *   logger.info("Mensagem enviada", { email: "user@mail.com" });
 *   logger.error("Falha ao enviar", { erro: err });
 */

import { env } from "./env";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

interface LogEntry {
  level: LogLevel;
  mensagem: string;
  contexto?: LogContext;
  timestamp: string;
}

const limitar = (valor: number, min: number, max: number): number =>
  Math.min(Math.max(valor, min), max);

/** Mantém os 2 primeiros caracteres e substitui o restante por asteriscos. */
function mascararTrecho(
  texto: string,
  minEstrelas: number,
  maxEstrelas: number,
): string {
  const estrelas = limitar(texto.length - 2, minEstrelas, maxEstrelas);
  return texto.slice(0, 2) + "*".repeat(estrelas);
}

export function mascararEmail(email?: string): string {
  if (!email || typeof email !== "string") return "";

  const normalizado = email.trim();
  const arroba = normalizado.indexOf("@");
  if (arroba < 1) return normalizado; // sem "@" ou usuário vazio

  const usuario = normalizado.slice(0, arroba);
  const dominioCompleto = normalizado.slice(arroba + 1);
  const ponto = dominioCompleto.lastIndexOf(".");
  if (ponto < 1) return normalizado; // domínio sem TLD válido

  const dominioBase = dominioCompleto.slice(0, ponto);
  const tld = dominioCompleto.slice(ponto + 1);

  return `${mascararTrecho(usuario, 2, 8)}@${mascararTrecho(dominioBase, 3, 3)}.${tld}`;
}

function mascararContexto(contexto?: LogContext): LogContext | undefined {
  if (!contexto) return undefined;

  const contextoMascarado: LogContext = {};

  Object.entries(contexto).forEach(([chave, valor]) => {
    if (
      typeof valor === "string" &&
      /@/.test(valor) &&
      chave.toLowerCase().includes("email")
    ) {
      contextoMascarado[chave] = mascararEmail(valor);
      return;
    }

    contextoMascarado[chave] = valor;
  });

  return contextoMascarado;
}

const NIVEL_PRIORIDADE: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/** Nível mínimo para exibir logs */
const nivelMinimo: LogLevel = env.isProd ? "warn" : "debug";

function deveLogar(nivel: LogLevel): boolean {
  return NIVEL_PRIORIDADE[nivel] >= NIVEL_PRIORIDADE[nivelMinimo];
}

function formatarEntrada(entry: LogEntry): string {
  const prefixo = `[${entry.level.toUpperCase()}] ${entry.timestamp}`;
  return `${prefixo} — ${entry.mensagem}`;
}

function emitir(entry: LogEntry): void {
  if (!deveLogar(entry.level)) return;

  const mensagemFormatada = formatarEntrada(entry);

  const contextoSeguro = mascararContexto(entry.contexto);

  switch (entry.level) {
    case "debug":
      console.debug(mensagemFormatada, contextoSeguro ?? "");
      break;
    case "info":
      console.info(mensagemFormatada, contextoSeguro ?? "");
      break;
    case "warn":
      console.warn(mensagemFormatada, contextoSeguro ?? "");
      break;
    case "error":
      console.error(mensagemFormatada, contextoSeguro ?? "");
      // Futuro: enviar para Sentry/DataDog
      // reportToExternalService(entry);
      break;
  }
}

function criarLog(level: LogLevel) {
  return (mensagem: string, contexto?: LogContext): void => {
    emitir({
      level,
      mensagem,
      contexto,
      timestamp: new Date().toISOString(),
    });
  };
}

export const logger = {
  debug: criarLog("debug"),
  info: criarLog("info"),
  warn: criarLog("warn"),
  error: criarLog("error"),
} as const;
