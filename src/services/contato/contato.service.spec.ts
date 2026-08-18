import { describe, it, expect, vi, beforeEach } from "vitest";
import { enviarMensagemContato } from "./contato.service";

const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

// Mock do logger para não poluir output de testes
vi.mock("@/lib/logger", () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
  mascararEmail: (email?: string) => {
    if (!email || typeof email !== "string") return "";
    const [usuario, dominio] = email.trim().split("@");
    if (!usuario || !dominio) return email;
    return `${usuario.slice(0, 2)}********@${dominio.replace(/\.[^.]+$/, ".***")}`;
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabase: supabaseMock,
}));

describe("contato.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock.functions.invoke.mockResolvedValue({ error: null });
  });

  describe("enviarMensagemContato", () => {
    it("deve resolver sem erro com dados válidos", async () => {
      const dados = {
        nome: "Robert Santos",
        email: "robert@email.com",
        mensagem: "Olá, tenho um projeto em mente.",
      };

      await expect(enviarMensagemContato(dados)).resolves.toBeUndefined();
    });

    it("deve utilizar a Edge Function do Supabase para enviar a mensagem", async () => {
      const dados = {
        nome: "Maria",
        email: "maria@teste.com",
        mensagem: "Quero saber mais.",
      };

      await enviarMensagemContato(dados);

      expect(supabaseMock.functions.invoke).toHaveBeenCalledWith(
        "enviar-contato",
        {
          body: dados,
        },
      );
    });

    it("deve chamar o logger com o email mascarado do remetente", async () => {
      const { logger } = await import("@/lib/logger");

      await enviarMensagemContato({
        nome: "Maria",
        email: "maria@teste.com",
        mensagem: "Quero saber mais.",
      });

      expect(logger.info).toHaveBeenCalledWith(
        "Mensagem de contato enviada",
        expect.objectContaining({
          email: expect.stringMatching(/@/),
        }),
      );

      const contexto = (logger.info as ReturnType<typeof vi.fn>).mock
        .calls[0][1];
      expect(contexto.email).not.toBe("maria@teste.com");
    });

    it("não deve logar dados sensíveis (nome e mensagem)", async () => {
      const { logger } = await import("@/lib/logger");

      await enviarMensagemContato({
        nome: "Dado Sensível",
        email: "user@mail.com",
        mensagem: "Informação privada aqui.",
      });

      const chamada = (logger.info as ReturnType<typeof vi.fn>).mock.calls[0];
      const contexto = chamada[1] as Record<string, unknown>;

      expect(contexto).not.toHaveProperty("nome");
      expect(contexto).not.toHaveProperty("mensagem");
    });
  });
});
