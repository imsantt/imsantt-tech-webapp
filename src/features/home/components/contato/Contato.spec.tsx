import { describe, it, expect } from "vitest";
import {
  renderComProviders,
  screen,
  fireEvent,
} from "../../../../tests/helpers";
import { Contato } from "./Contato";

describe("Contato", () => {
  it("deve renderizar o título da seção", () => {
    renderComProviders(<Contato />);
    expect(screen.getByText("Vamos conversar")).toBeInTheDocument();
  });

  it("deve renderizar o banner de feature em desenvolvimento", () => {
    renderComProviders(<Contato />);
    expect(screen.getByText("Feature em desenvolvimento")).toBeInTheDocument();
    expect(
      screen.getByText(/envio de mensagens ainda está sendo implementado/),
    ).toBeInTheDocument();
  });

  it("deve renderizar campos de formulário desabilitados", () => {
    renderComProviders(<Contato />);
    const form = screen.getByLabelText("Formulário de contato");
    expect(form).toHaveAttribute("aria-disabled", "true");
  });

  it("deve renderizar labels de nome, email e mensagem", () => {
    renderComProviders(<Contato />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Mensagem")).toBeInTheDocument();
  });

  it("deve renderizar botão de enviar desabilitado", () => {
    renderComProviders(<Contato />);
    const botao = screen.getByText("Enviar mensagem");
    expect(botao).toBeDisabled();
  });

  it("deve ter heading h2 com id para acessibilidade", () => {
    renderComProviders(<Contato />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Vamos conversar",
    });
    expect(heading).toHaveAttribute("id", "contato-titulo");
  });

  it("deve atualizar valor do input ao digitar (aoAlterar)", () => {
    renderComProviders(<Contato />);
    // jsdom ignora pointer-events, então conseguimos interagir
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
});
