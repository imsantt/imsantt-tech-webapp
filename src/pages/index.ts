import { lazyComRetry } from "@/lib/lazy-com-retry";

export const Home = lazyComRetry(() =>
  import("../features/home/Home").then((m) => ({ default: m.Home })),
);

export const Habilidades = lazyComRetry(() =>
  import("../features/habilidades/Habilidades").then((m) => ({
    default: m.Habilidades,
  })),
);

export const Login = lazyComRetry(() =>
  import("../features/login/Login").then((m) => ({ default: m.Login })),
);

export const Dashboard = lazyComRetry(() =>
  import("../features/admin/Dashboard").then((m) => ({
    default: m.Dashboard,
  })),
);

export const NotFound = lazyComRetry(() =>
  import("./not-found/NotFound").then((m) => ({ default: m.NotFound })),
);
