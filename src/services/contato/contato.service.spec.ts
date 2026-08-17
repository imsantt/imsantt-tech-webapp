import { describe, it, expect, vi, beforeEach } from "vitest";
import { enviarMensagemContato } from "./contato.service";

// Mock do logger para não poluir output de testes
vi.mock("@/lib/logger", () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe("contato.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    it("deve retornar void (não retorna dados)", async () => {
      const resultado = await enviarMensagemContato({
        nome: "Teste",
        email: "teste@email.com",
        mensagem: "Mensagem de teste.",
      });

      expect(resultado).toBeUndefined();
    });

    it("deve chamar o logger com o email do remetente", async () => {
      const { logger } = await import("@/lib/logger");

      await enviarMensagemContato({
        nome: "Maria",
        email: "maria@teste.com",
        mensagem: "Quero saber mais.",
      });

      expect(logger.info).toHaveBeenCalledWith("Mensagem de contato enviada", {
        email: "maria@teste.com",
      });
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
