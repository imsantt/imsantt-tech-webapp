import { lazyComRetry } from "@/lib/lazy-com-retry";

export const Home = lazyComRetry(() =>
  import("../features/home/Home").then((m) => ({ default: m.Home })),
);

export const Habilidades = lazyComRetry(() =>
  import("../features/habilidades/Habilidades").then((m) => ({
    default: m.Habilidades,
  })),
);

export const Experiencias = lazyComRetry(() =>
  import("../features/experiencias/Experiencias").then((m) => ({
    default: m.Experiencias,
  })),
);

export const Login = lazyComRetry(() =>
  import("./login/Login").then((m) => ({ default: m.Login })),
);

export const Painel = lazyComRetry(() =>
  import("./painel/Painel").then((m) => ({ default: m.Painel })),
);

export const NotFound = lazyComRetry(() =>
  import("./not-found/NotFound").then((m) => ({ default: m.NotFound })),
);
