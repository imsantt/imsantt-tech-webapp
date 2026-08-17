import { lazy } from "react";

export const Home = lazy(() =>
  import("../features/home/Home").then((m) => ({ default: m.Home })),
);

export const NotFound = lazy(() =>
  import("./not-found/NotFound").then((m) => ({ default: m.NotFound })),
);
