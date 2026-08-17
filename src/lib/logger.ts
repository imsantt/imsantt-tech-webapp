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

interface LogEntry {
  level: LogLevel;
  mensagem: string;
  contexto?: Record<string, unknown>;
  timestamp: string;
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

  switch (entry.level) {
    case "debug":
      console.debug(mensagemFormatada, entry.contexto ?? "");
      break;
    case "info":
      console.info(mensagemFormatada, entry.contexto ?? "");
      break;
    case "warn":
      console.warn(mensagemFormatada, entry.contexto ?? "");
      break;
    case "error":
      console.error(mensagemFormatada, entry.contexto ?? "");
      // Futuro: enviar para Sentry/DataDog
      // reportToExternalService(entry);
      break;
  }
}

function criarLog(level: LogLevel) {
  return (mensagem: string, contexto?: Record<string, unknown>): void => {
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
