import { lazy } from "react";

// Lazy loading por página — melhora o tempo de carregamento inicial
export const Home = lazy(() =>
  import("../features/home/Home").then((m) => ({ default: m.Home })),
);

export { NotFound } from "./NotFound";
