import type { MensagemContato } from "@/types/contato";
import { logger, mascararEmail } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

/**
 * Envia uma mensagem de contato via Supabase Edge Function.
 * A lógica do cliente valida e sanitiza os dados, mas a regra real de abuso fica no backend.
 */
export async function enviarMensagemContato(
  dados: MensagemContato,
): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase não configurado para envio de mensagens.");
  }

  const { error } = await supabase.functions.invoke("enviar-contato", {
    body: dados,
  });

  if (error) {
    throw error;
  }

  logger.info("Mensagem de contato enviada", {
    email: mascararEmail(dados.email),
  });
}
