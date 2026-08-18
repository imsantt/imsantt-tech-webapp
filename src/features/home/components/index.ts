import { lazy } from "react";

export const Hero = lazy(() =>
  import("./hero/Hero").then((m) => ({ default: m.Hero })),
);

export const Trajetoria = lazy(() =>
  import("./trajetoria/Trajetoria").then((m) => ({ default: m.Trajetoria })),
);

export const HabilidadesSecao = lazy(() =>
  import("./habilidades/HabilidadesSecao").then((m) => ({
    default: m.HabilidadesSecao,
  })),
);

export const Contato = lazy(() =>
  import("./contato/Contato").then((m) => ({ default: m.Contato })),
);
