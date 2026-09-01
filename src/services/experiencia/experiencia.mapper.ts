import { DateTime } from "luxon";
import type { Experiencia } from "@/types/experiencia";
import type { ExperienciaBruta } from "@/schemas/experiencia.schema";

/**
 * Ponto único de conversão fonte -> domínio.
 *
 * Recebe a linha bruta já validada pelo schema (snake_case, datas ISO) e
 * devolve o modelo de domínio `Experiencia` (camelCase, luxon `DateTime`).
 *
 * Concentrar o mapeamento aqui garante que a troca de fonte (stub -> Supabase)
 * não vaze formato bruto para hook ou componentes.
 */
export function mapearExperiencia(bruta: ExperienciaBruta): Experiencia {
  return {
    id: bruta.id,
    empresa: bruta.empresa,
    cargo: bruta.cargo,
    dataInicio: DateTime.fromISO(bruta.data_inicio),
    dataTermino: bruta.data_termino
      ? DateTime.fromISO(bruta.data_termino)
      : undefined,
    descricao: bruta.descricao,
    tecnologias: bruta.tecnologias,
    descricaoLonga: bruta.descricao_longa ?? undefined,
    local: bruta.local ?? undefined,
    modelo: bruta.modelo ?? undefined,
    tipo: bruta.tipo ?? undefined,
    setor: bruta.setor ?? undefined,
    destaques:
      bruta.destaques?.map((d) => ({
        texto: d.texto,
        metrica: d.metrica ?? undefined,
      })) ?? undefined,
    site: bruta.site ?? undefined,
  };
}

export function mapearExperiencias(brutas: ExperienciaBruta[]): Experiencia[] {
  return brutas.map(mapearExperiencia);
}
