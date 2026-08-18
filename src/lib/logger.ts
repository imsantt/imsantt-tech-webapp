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

export function mascararEmail(email?: string): string {
  if (!email || typeof email !== "string") return "";

  const emailNormalizado = email.trim();
  if (!emailNormalizado.includes("@")) return emailNormalizado;

  const [usuario, dominioCompleto] = emailNormalizado.split("@");
  if (!usuario || !dominioCompleto) return emailNormalizado;

  const dominio = dominioCompleto.split(".");
  const tld = dominio[dominio.length - 1] ?? "";
  const dominioBase = dominio.slice(0, -1).join(".") || dominio[0] || "";

  const usuarioMascarado =
    usuario.length <= 2
      ? `${usuario.slice(0, 2)}${"*".repeat(Math.max(2, usuario.length))}`
      : `${usuario.slice(0, 2)}${"*".repeat(Math.min(Math.max(usuario.length - 2, 2), 8))}`;

  const dominioBaseMascarado =
    dominioBase.length <= 2
      ? `${dominioBase.slice(0, 2)}${"*".repeat(Math.max(2, dominioBase.length))}`
      : `${dominioBase.slice(0, 2)}${"*".repeat(Math.min(Math.max(dominioBase.length - 2, 3), 3))}`;

  return `${usuarioMascarado}@${dominioBaseMascarado}.${tld}`;
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
