import { describe, it, expect, vi, afterEach } from "vitest";
import { obterConfiguracao } from "./configuracao.service";

describe("configuracao.service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unmock("@/stubs/configuracao.stub");
  });

  describe("obterConfiguracao", () => {
    it("deve retornar objeto de configuração com campos obrigatórios", async () => {
      const config = await obterConfiguracao();
      expect(config.contato).toBeDefined();
      expect(config.contato.email).toBeDefined();
      expect(Array.isArray(config.navegacao)).toBe(true);
      expect(Array.isArray(config.redesSociais)).toBe(true);
      expect(config.nomeAutor).toBeDefined();
      expect(typeof config.disponivel).toBe("boolean");
    });

    it("redes sociais devem usar ícones válidos", async () => {
      const config = await obterConfiguracao();
      config.redesSociais.forEach((rede) => {
        expect(["github", "linkedin", "instagram"]).toContain(rede.icone);
      });
    });
  });

  describe("validação de schema na borda", () => {
    it("em config inválida, loga erro e devolve fallback local (não vazio)", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      vi.resetModules();
      vi.doMock("@/stubs/configuracao.stub", () => ({
        // email inválido -> viola o schema
        STUB_CONFIGURACAO: {
          contato: { email: "invalido", telefone: "" },
          navegacao: [],
          linksAjuda: [],
          redesSociais: [],
          nomeAutor: "X",
          cargo: "Y",
          disponivel: true,
        },
      }));

      const { obterConfiguracao: obterInvalida } = await import(
        "./configuracao.service"
      );

      const config = await obterInvalida();

      // Fallback: ainda retorna um objeto de configuração, não quebra a UI
      expect(config).toBeDefined();
      expect(config.contato).toBeDefined();
      expect(erroSpy).toHaveBeenCalled();
    });
  });
});
