import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderComProviders, screen, userEvent } from "@/tests/helpers";
import { Login } from "./Login";
import type { UseAuthRetorno } from "@/hooks/use-auth/useAuth.hook";

const { useAuthMock, navigateMock } = vi.hoisted(() => ({
  useAuthMock: vi.fn(),
  navigateMock: vi.fn(),
}));

vi.mock("@/hooks/use-auth/useAuth.hook", () => ({
  useAuth: useAuthMock,
}));

vi.mock("react-router-dom", async () => {
  const real =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return { ...real, useNavigate: () => navigateMock };
});

function montarUseAuth(
  overrides: Partial<UseAuthRetorno> = {},
): UseAuthRetorno {
  return {
    sessao: null,
    autenticado: false,
    carregando: false,
    enviando: false,
    erro: null,
    entrar: vi.fn().mockResolvedValue(true),
    sair: vi.fn(),
    limparErro: vi.fn(),
    ...overrides,
  };
}

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthMock.mockReturnValue(montarUseAuth());
  });

  it("deve ter main com id conteudo-principal", () => {
    renderComProviders(<Login />);
    expect(screen.getByRole("main")).toHaveAttribute(
      "id",
      "conteudo-principal",
    );
  });

  it("deve renderizar o título de acesso", () => {
    renderComProviders(<Login />);
    expect(
      screen.getByRole("heading", { name: "Acessar conta" }),
    ).toBeInTheDocument();
  });

  it("deve renderizar o campo de e-mail com o tipo correto", () => {
    renderComProviders(<Login />);
    const email = screen.getByLabelText("E-mail");
    expect(email).toHaveAttribute("type", "email");
  });

  it("deve renderizar o campo de senha com o tipo correto", () => {
    renderComProviders(<Login />);
    const senha = screen.getByLabelText("Senha");
    expect(senha).toHaveAttribute("type", "password");
  });

  it("deve renderizar o botão de submit Entrar", () => {
    renderComProviders(<Login />);
    const botao = screen.getByRole("button", { name: "Entrar" });
    expect(botao).toHaveAttribute("type", "submit");
  });

  it("deve chamar entrar com as credenciais digitadas ao submeter", async () => {
    const entrar = vi.fn().mockResolvedValue(true);
    useAuthMock.mockReturnValue(montarUseAuth({ entrar }));

    renderComProviders(<Login />);
    await userEvent.type(screen.getByLabelText("E-mail"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Senha"), "senhaForte123");
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(entrar).toHaveBeenCalledWith({
      email: "user@email.com",
      senha: "senhaForte123",
    });
  });

  it("deve exibir a mensagem de erro genérica quando houver erro", () => {
    useAuthMock.mockReturnValue(
      montarUseAuth({ erro: "E-mail ou senha inválidos." }),
    );
    renderComProviders(<Login />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "E-mail ou senha inválidos.",
    );
  });

  it("deve desabilitar o botão e mostrar estado de envio", () => {
    useAuthMock.mockReturnValue(montarUseAuth({ enviando: true }));
    renderComProviders(<Login />);
    const botao = screen.getByRole("button", { name: "Entrando..." });
    expect(botao).toBeDisabled();
  });

  it("deve redirecionar quando já autenticado", () => {
    useAuthMock.mockReturnValue(montarUseAuth({ autenticado: true }));
    renderComProviders(<Login />);
    expect(navigateMock).toHaveBeenCalledWith("/admin/dashboard", {
      replace: true,
    });
  });
});
