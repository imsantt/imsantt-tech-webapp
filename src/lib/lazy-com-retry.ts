import { type ComponentType, lazy } from "react";

const STORAGE_KEY = "page-has-force-refreshed";

/**
 * Wrapper sobre React.lazy que tenta um reload automático caso o chunk falhe ao carregar.
 * Resolve o problema de ChunkLoadError após deploys que alteram os hashes dos assets.
 *
 * - Na primeira falha: recarrega a página uma vez (busca os novos chunks)
 * - Se falhar de novo após reload: repassa o erro (capturado pelo ErrorBoundary/Sentry)
 */
export function lazyComRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    const jaRecarregou = JSON.parse(
      window.sessionStorage.getItem(STORAGE_KEY) || "false",
    );

    try {
      const componente = await importFn();
      window.sessionStorage.setItem(STORAGE_KEY, "false");
      return componente;
    } catch (erro) {
      if (!jaRecarregou) {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
        window.location.reload();
        // Retorna componente vazio enquanto recarrega
        return { default: (() => null) as unknown as T };
      }

      // Já tentou recarregar e continuou falhando — repassa pro Sentry/ErrorBoundary
      throw erro;
    }
  });
}
