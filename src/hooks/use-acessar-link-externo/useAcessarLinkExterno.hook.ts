import { useCallback } from "react";

type Target = "_blank" | "_self" | "_parent" | "_top";

interface OpcoesLinkExterno {
  /** URL de destino */
  url: string;
  /** Target da janela (padrão: _blank) */
  target?: Target;
}

/**
 * Hook para abrir links externos de forma segura.
 * Usa window.open com noopener,noreferrer por padrão para proteção contra tabnabbing.
 */
export function useAcessarLinkExterno() {
  const acessar = useCallback(
    ({ url, target = "_blank" }: OpcoesLinkExterno) => {
      window.open(url, target, "noopener,noreferrer");
    },
    [],
  );

  return { acessar };
}
