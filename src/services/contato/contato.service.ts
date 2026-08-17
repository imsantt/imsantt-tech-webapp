import type { MensagemContato } from "../../types/contato";
import { logger } from "../../lib/logger";

/**
 * Envia uma mensagem de contato.
 * TODO: conectar ao endpoint real (Supabase Edge Function ou serviço de e-mail).
 */
export async function enviarMensagemContato(
  dados: MensagemContato,
): Promise<void> {
  // Substituir pela chamada real:
  // const { error } = await supabase.functions.invoke('enviar-contato', { body: dados })
  // if (error) throw error

  await new Promise((res) => setTimeout(res, 1500));
  logger.info("Mensagem de contato enviada", { email: dados.email });
}
