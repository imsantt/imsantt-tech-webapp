import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { http, HttpError, NetworkError } from "./http";

vi.mock("./env", () => ({
  env: { apiUrl: "https://api.test" },
}));

function respostaJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("http", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("deve montar a URL com base do env e enviar credenciais (cookies)", async () => {
    fetchMock.mockResolvedValue(respostaJson({ ok: true }));

    await http.get("/auth/me");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.test/auth/me");
    expect(init.credentials).toBe("include");
    expect(init.method).toBe("GET");
  });

  it("deve serializar o corpo como JSON no POST", async () => {
    fetchMock.mockResolvedValue(respostaJson({ id: "1" }));

    await http.post("/auth/login", { email: "a@b.com", senha: "x" });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(init.body)).toEqual({ email: "a@b.com", senha: "x" });
  });

  it("deve retornar o corpo JSON parseado", async () => {
    fetchMock.mockResolvedValue(respostaJson({ usuario: { id: "42" } }));

    const resultado = await http.get<{ usuario: { id: string } }>("/auth/me");
    expect(resultado.usuario.id).toBe("42");
  });

  it("deve lançar HttpError com status em respostas de erro", async () => {
    fetchMock.mockResolvedValue(
      respostaJson({ message: "Não autorizado" }, 401),
    );

    await expect(http.get("/auth/me")).rejects.toBeInstanceOf(HttpError);
    await expect(http.get("/auth/me")).rejects.toMatchObject({ status: 401 });
  });

  it("deve lançar NetworkError quando o fetch falha", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(http.get("/auth/me")).rejects.toBeInstanceOf(NetworkError);
  });
});
