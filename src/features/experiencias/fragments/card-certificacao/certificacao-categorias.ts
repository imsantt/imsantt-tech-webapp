import { cores } from "@/lib/tema/tokens";
import type { CategoriaCertificacao } from "@/types/certificacao";

/** Metadados visuais por categoria — compartilhado entre card e filtros. */
export const CATEGORIAS: Record<
  CategoriaCertificacao,
  { rotulo: string; acento: { base: string; bg: string; border: string } }
> = {
  cloud: { rotulo: "Cloud & AWS", acento: cores.category.cyan },
  lideranca: { rotulo: "Liderança & Gestão", acento: cores.category.emerald },
  ia: { rotulo: "Inteligência Artificial", acento: cores.category.violet },
  produto: { rotulo: "Produto & Negócio", acento: cores.category.gold },
  outros: { rotulo: "Outros", acento: cores.category.rose },
};
