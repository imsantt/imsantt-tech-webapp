import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  renderComProviders,
  screen,
  fireEvent,
  userEvent,
} from "@/tests/helpers";
import { Login } from "./Login";

const entrarComGitHubMock = vi.fn();

vi.mock("@/services/autenticacao/autenticacao.service", async () => {
  const real = await vi.importActual<
    typeof import("@/services/autenticacao/autenticacao.service")
  >("@/services/autenticacao/autenticacao.service");
  return {
    ...real,
    entrarComGitHub: () => entrarComGitHubMock(),
  };
});

vi.mock("@/hooks/use-sessao/useSessao.hook", () => ({
  useSessao: () => ({
    autenticado: false,
    usuario: null,
    isLoading: false,
    isError: false,
    revalidar: vi.fn(),
  }),
}));

describe("Login (interface)", () => {
  beforeEach(() => {
    entrarComGitHubMock.mockClear();
  });

  it("deve renderizar o título de acesso", () => {
    renderComProviders(<Login />);
    expect(screen.getByText("Bem-vindo de volta")).toBeInTheDocument();
  });

  it("deve destacar o GitHub como método de acesso", () => {
    renderComProviders(<Login />);
    expect(
      screen.getByRole("button", { name: "Continuar com GitHub" }),
    ).toBeInTheDocument();
  });

  it("deve iniciar o fluxo do GitHub ao clicar no botão", () => {
    renderComProviders(<Login />);
    fireEvent.click(
      screen.getByRole("button", { name: "Continuar com GitHub" }),
    );
    expect(entrarComGitHubMock).toHaveBeenCalledTimes(1);
  });

  it("deve indicar que o login por credenciais é demonstrativo", () => {
    renderComProviders(<Login />);
    expect(screen.getByText(/apenas demonstrativo/)).toBeInTheDocument();
  });

  it("deve renderizar campos de e-mail e senha", () => {
    renderComProviders(<Login />);
    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("deve atualizar o valor do campo de e-mail ao digitar", async () => {
    renderComProviders(<Login />);
    const email =
      screen.getByPlaceholderText<HTMLInputElement>("seu@email.com");
    await userEvent.type(email, "teste@imsantt.tech");
    expect(email.value).toBe("teste@imsantt.tech");
  });

  it("deve alternar a visibilidade da senha", () => {
    renderComProviders(<Login />);
    const senha = screen.getByPlaceholderText("••••••••");
    expect(senha).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(senha).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar senha" }));
    expect(senha).toHaveAttribute("type", "password");
  });

  it("deve ter link para voltar ao início", () => {
    renderComProviders(<Login />);
    const link = screen.getByText("Voltar para o início");
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});
