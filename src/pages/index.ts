import { lazy } from "react";

export const Home = lazy(() =>
  import("../features/home/Home").then((m) => ({ default: m.Home })),
);

export { NotFound } from "./not-found/NotFound";
