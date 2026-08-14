/**
 * Rate limiter simples para client-side.
 * NÃO substitui rate limiting server-side — é apenas UX para evitar spam acidental.
 * O rate limiting real deve ser feito no Supabase Edge Function ou Cloudflare WAF.
 */

interface RateLimiterConfig {
  /** Máximo de tentativas permitidas */
  maxTentativas: number;
  /** Janela de tempo em milissegundos */
  janela: number;
}

export class RateLimiter {
  private tentativas: number[] = [];
  private config: RateLimiterConfig;

  constructor(config: RateLimiterConfig) {
    this.config = config;
  }

  /**
   * Verifica se a ação é permitida.
   * Retorna true se pode executar, false se excedeu o limite.
   */
  permitir(): boolean {
    const agora = Date.now();

    // Remove tentativas fora da janela
    this.tentativas = this.tentativas.filter(
      (t) => agora - t < this.config.janela,
    );

    if (this.tentativas.length >= this.config.maxTentativas) {
      return false;
    }

    this.tentativas.push(agora);
    return true;
  }

  /**
   * Tempo em ms até a próxima tentativa ser permitida.
   * Retorna 0 se já pode tentar.
   */
  tempoEspera(): number {
    if (this.tentativas.length < this.config.maxTentativas) return 0;

    const maisAntiga = this.tentativas[0];
    const agora = Date.now();
    const restante = this.config.janela - (agora - maisAntiga);

    return Math.max(0, restante);
  }

  /** Reseta o contador */
  resetar(): void {
    this.tentativas = [];
  }
}

/**
 * Rate limiter padrão para formulário de contato.
 * 3 tentativas por 5 minutos.
 */
export const limiterContato = new RateLimiter({
  maxTentativas: 3,
  janela: 5 * 60 * 1000, // 5 minutos
});
