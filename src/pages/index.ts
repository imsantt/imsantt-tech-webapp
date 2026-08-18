import { lazy } from "react";

export const Home = lazy(() =>
  import("../features/home/Home").then((m) => ({ default: m.Home })),
);

export const Habilidades = lazy(() =>
  import("../features/habilidades/Habilidades").then((m) => ({
    default: m.Habilidades,
  })),
);

export const NotFound = lazy(() =>
  import("./not-found/NotFound").then((m) => ({ default: m.NotFound })),
);
