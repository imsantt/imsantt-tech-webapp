import { describe, it, expect, vi, afterEach } from "vitest";

const configValida = {
  contato: { email: "contato@imsantt.tech", telefone: "" },
  navegacao: [{ label: "Início", href: "#hero" }],
  linksAjuda: [{ label: "Termos", href: "#" }],
  redesSociais: [
    { label: "GitHub", href: "https://github.com/imsantt", icone: "github" },
  ],
  nomeAutor: "Robert Santos",
  cargo: "Engenheiro de Software",
  disponivel: true,
};

/** Mock do client cujo `.from().select().single()` resolve `{ data, error }`. */
function mockSupabaseClient(resposta: { data: unknown; error: unknown }) {
  const single = vi.fn().mockResolvedValue(resposta);
  const select = vi.fn().mockReturnValue({ single });
  const from = vi.fn().mockReturnValue({ select });
  return { client: { from }, from, select, single };
}

async function importarService() {
  return import("./configuracao.service");
}

describe("configuracao.service (fonte Supabase + fallback)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.doUnmock("@/lib/supabase");
  });

  describe("fonte remota", () => {
    it("retorna a configuração vinda do Supabase (linha única)", async () => {
      const { client, from, select, single } = mockSupabaseClient({
        data: configValida,
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { obterConfiguracao } = await importarService();
      const config = await obterConfiguracao();

      expect(from).toHaveBeenCalledWith("configuracoes");
      expect(select).toHaveBeenCalledWith("*");
      expect(single).toHaveBeenCalled();
      expect(config.nomeAutor).toBe("Robert Santos");
    });

    it("em config remota inválida, loga erro e usa fallback (não vazio)", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: { ...configValida, contato: { email: "invalido", telefone: "" } },
        error: null,
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { obterConfiguracao } = await importarService();
      const config = await obterConfiguracao();

      expect(config).toBeDefined();
      expect(config.contato).toBeDefined();
      expect(erroSpy).toHaveBeenCalled();
    });
  });

  describe("fallback sinalizado", () => {
    it("sem Supabase configurado (null), usa o stub e loga aviso", async () => {
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: null }));

      const { obterConfiguracao } = await importarService();
      const config = await obterConfiguracao();

      expect(config.contato).toBeDefined();
      expect(config.nomeAutor).toBeDefined();
      expect(avisoSpy).toHaveBeenCalled();
    });

    it("com erro na consulta, usa o stub e loga erro + aviso", async () => {
      const erroSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const avisoSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { client } = mockSupabaseClient({
        data: null,
        error: { message: "falha" },
      });
      vi.resetModules();
      vi.doMock("@/lib/supabase", () => ({ supabase: client }));

      const { obterConfiguracao } = await importarService();
      const config = await obterConfiguracao();

      expect(config.contato).toBeDefined();
      expect(erroSpy).toHaveBeenCalled();
      expect(avisoSpy).toHaveBeenCalled();
    });
  });
});
