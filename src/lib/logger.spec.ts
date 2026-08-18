import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger, mascararEmail } from "./logger";

describe("mascararEmail", () => {
  it("deve mascarar e-mails antes de registrar logs", () => {
    expect(mascararEmail("robert.santos@email.com")).toBe(
      "ro********@em***.com",
    );
  });

  it("deve preservar e-mails inválidos sem alterar", () => {
    expect(mascararEmail("email-invalido")).toBe("email-invalido");
  });
});

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("não deve expor e-mails em contextos de log", () => {
    logger.info("Mensagem de contato enviada", {
      email: "robert.santos@email.com",
    });

    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining("[INFO]"),
      expect.objectContaining({
        email: "ro********@em***.com",
      }),
    );
  });
});
