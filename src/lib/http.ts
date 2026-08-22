/**
 * Cliente HTTP para a API proprietária (imsantt-tech-api).
 *
 * Wrapper fino sobre fetch com:
 * - Base URL vinda de env (VITE_API_URL)
 * - credentials: "include" para enviar/receber cookies HttpOnly (sessão)
 * - Serialização/parse JSON
 * - Erros normalizados (HttpError) com status e corpo
 *
 * Não guarda tokens em memória nem em localStorage — a sessão é mantida
 * pelo cookie HttpOnly emitido pelo backend, inacessível ao JavaScript.
 */

import { env } from "./env";

export class HttpError extends Error {
  readonly status: number;
  readonly corpo: unknown;

  constructor(status: number, mensagem: string, corpo?: unknown) {
    super(mensagem);
    this.name = "HttpError";
    this.status = status;
    this.corpo = corpo;
  }
}

/** Lançado quando não há conexão / falha de rede antes de obter resposta. */
export class NetworkError extends Error {
  constructor(mensagem = "Falha de rede") {
    super(mensagem);
    this.name = "NetworkError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  /** Corpo que será serializado como JSON automaticamente. */
  json?: unknown;
}

function montarUrl(caminho: string): string {
  const base = env.apiUrl?.replace(/\/+$/, "") ?? "";
  const rota = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return `${base}${rota}`;
}

/** Extrai `message` (string) do corpo de erro, se existir. */
function extrairMensagem(corpo: unknown): string | undefined {
  if (
    corpo &&
    typeof corpo === "object" &&
    "message" in corpo &&
    typeof (corpo as { message: unknown }).message === "string"
  ) {
    return (corpo as { message: string }).message;
  }
  return undefined;
}

async function parseCorpo(resposta: Response): Promise<unknown> {
  const contentType = resposta.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return undefined;
  }
  try {
    return await resposta.json();
  } catch {
    return undefined;
  }
}

async function request<T>(
  caminho: string,
  options: RequestOptions = {},
): Promise<T> {
  const { json, headers, ...resto } = options;

  let resposta: Response;
  try {
    resposta = await fetch(montarUrl(caminho), {
      // Envia e recebe cookies HttpOnly (sessão) — essencial para auth.
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
      ...resto,
    });
  } catch {
    // fetch só rejeita em falha de rede/CORS, não em status HTTP de erro.
    throw new NetworkError();
  }

  const corpo = await parseCorpo(resposta);

  if (!resposta.ok) {
    const mensagem =
      extrairMensagem(corpo) ??
      `Requisição falhou com status ${resposta.status}`;
    throw new HttpError(resposta.status, mensagem, corpo);
  }

  return corpo as T;
}

export const http = {
  get: <T>(caminho: string, options?: RequestOptions) =>
    request<T>(caminho, { ...options, method: "GET" }),
  post: <T>(caminho: string, json?: unknown, options?: RequestOptions) =>
    request<T>(caminho, { ...options, method: "POST", json }),
  put: <T>(caminho: string, json?: unknown, options?: RequestOptions) =>
    request<T>(caminho, { ...options, method: "PUT", json }),
  patch: <T>(caminho: string, json?: unknown, options?: RequestOptions) =>
    request<T>(caminho, { ...options, method: "PATCH", json }),
  delete: <T>(caminho: string, options?: RequestOptions) =>
    request<T>(caminho, { ...options, method: "DELETE" }),
} as const;
