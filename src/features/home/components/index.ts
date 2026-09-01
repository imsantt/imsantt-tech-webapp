import { lazyComRetry } from "@/lib/lazy-com-retry";

export const Hero = lazyComRetry(() =>
  import("./hero/Hero").then((m) => ({ default: m.Hero })),
);

export const Trajetoria = lazyComRetry(() =>
  import("./trajetoria/Trajetoria").then((m) => ({ default: m.Trajetoria })),
);

export const HabilidadesSecao = lazyComRetry(() =>
  import("./habilidades/HabilidadesSecao").then((m) => ({
    default: m.HabilidadesSecao,
  })),
);

export const Servicos = lazyComRetry(() =>
  import("./servicos/Servicos").then((m) => ({ default: m.Servicos })),
);

export const Contato = lazyComRetry(() =>
  import("./contato/Contato").then((m) => ({ default: m.Contato })),
);
