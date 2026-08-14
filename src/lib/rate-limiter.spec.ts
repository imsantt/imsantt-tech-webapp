import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RateLimiter } from "./rate-limiter";

describe("RateLimiter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deve permitir tentativas dentro do limite", () => {
    const limiter = new RateLimiter({ maxTentativas: 3, janela: 60000 });

    expect(limiter.permitir()).toBe(true);
    expect(limiter.permitir()).toBe(true);
    expect(limiter.permitir()).toBe(true);
  });

  it("deve bloquear após exceder o limite", () => {
    const limiter = new RateLimiter({ maxTentativas: 2, janela: 60000 });

    expect(limiter.permitir()).toBe(true);
    expect(limiter.permitir()).toBe(true);
    expect(limiter.permitir()).toBe(false);
  });

  it("deve permitir novamente após a janela expirar", () => {
    const limiter = new RateLimiter({ maxTentativas: 1, janela: 10000 });

    expect(limiter.permitir()).toBe(true);
    expect(limiter.permitir()).toBe(false);

    vi.advanceTimersByTime(10001);

    expect(limiter.permitir()).toBe(true);
  });

  it("deve retornar tempo de espera correto", () => {
    const limiter = new RateLimiter({ maxTentativas: 1, janela: 5000 });

    limiter.permitir();
    expect(limiter.tempoEspera()).toBeGreaterThan(0);
    expect(limiter.tempoEspera()).toBeLessThanOrEqual(5000);
  });

  it("deve retornar 0 de espera quando pode tentar", () => {
    const limiter = new RateLimiter({ maxTentativas: 3, janela: 60000 });
    expect(limiter.tempoEspera()).toBe(0);
  });

  it("deve resetar o contador", () => {
    const limiter = new RateLimiter({ maxTentativas: 1, janela: 60000 });

    limiter.permitir();
    expect(limiter.permitir()).toBe(false);

    limiter.resetar();
    expect(limiter.permitir()).toBe(true);
  });
});
