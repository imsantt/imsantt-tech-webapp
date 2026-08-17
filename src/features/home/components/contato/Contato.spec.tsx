import { describe, it, expect, vi } from "vitest";
import { renderComProviders, screen, fireEvent } from "@/tests/helpers";
import { Contato } from "./Contato";

// Mock do serviço de contato
vi.mock("@/services/contato/contato.service", () => ({
  enviarMensagemContato: vi.fn(() => Promise.resolve()),
}));

describe("Contato", () => {
  it("deve renderizar o título da seção", () => {
    renderComProviders(<Contato />);
    expect(screen.getByText("Vamos conversar")).toBeInTheDocument();
  });

  it("deve renderizar o banner de feature em desenvolvimento", () => {
    renderComProviders(<Contato />);
    expect(screen.getByText("Feature em desenvolvimento")).toBeInTheDocument();
    expect(
      screen.getByText(/envio de mensagens ainda está sendo finalizado/),
    ).toBeInTheDocument();
  });

  it("deve renderizar formulário habilitado para interação", () => {
    renderComProviders(<Contato />);
    const form = screen.getByLabelText("Formulário de contato");
    expect(form).not.toHaveAttribute("aria-disabled");
  });

  it("deve renderizar labels de nome, email e mensagem", () => {
    renderComProviders(<Contato />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Mensagem")).toBeInTheDocument();
  });

  it("deve renderizar botão de enviar habilitado", () => {
    renderComProviders(<Contato />);
    const botao = screen.getByText("Enviar mensagem");
    expect(botao).toBeEnabled();
  });

  it("deve ter heading h2 com id para acessibilidade", () => {
    renderComProviders(<Contato />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Vamos conversar",
    });
    expect(heading).toHaveAttribute("id", "contato-titulo");
  });

  it("deve atualizar valor do input ao digitar", () => {
    renderComProviders(<Contato />);
    const inputNome = screen.getByPlaceholderText("Seu nome completo");
    fireEvent.change(inputNome, { target: { value: "Robert", name: "nome" } });
    expect(inputNome).toHaveValue("Robert");
  });

  it("deve atualizar valor do email ao digitar", () => {
    renderComProviders(<Contato />);
    const inputEmail = screen.getByPlaceholderText("seu@email.com");
    fireEvent.change(inputEmail, {
      target: { value: "teste@email.com", name: "email" },
    });
    expect(inputEmail).toHaveValue("teste@email.com");
  });

  it("deve atualizar valor da mensagem ao digitar", () => {
    renderComProviders(<Contato />);
    const textarea = screen.getByPlaceholderText(/Conte um pouco/);
    fireEvent.change(textarea, { target: { value: "Olá!", name: "mensagem" } });
    expect(textarea).toHaveValue("Olá!");
  });

  it("deve exibir erros de validação ao submeter formulário vazio", async () => {
    renderComProviders(<Contato />);
    const botao = screen.getByText("Enviar mensagem");
    fireEvent.click(botao);

    expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("E-mail é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Mensagem é obrigatória")).toBeInTheDocument();
  });

  it("deve limpar erro do campo ao digitar", async () => {
    renderComProviders(<Contato />);

    // Submeter vazio para gerar erros
    fireEvent.click(screen.getByText("Enviar mensagem"));
    expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();

    // Digitar no campo nome
    const inputNome = screen.getByPlaceholderText("Seu nome completo");
    fireEvent.change(inputNome, { target: { value: "Robert", name: "nome" } });

    expect(screen.queryByText("Nome é obrigatório")).not.toBeInTheDocument();
  });
});
