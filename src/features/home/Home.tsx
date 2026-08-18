import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary/ErrorBoundary";
import { Hero, Trajetoria, HabilidadesSecao, Contato } from "./components";
import { HeroSkeleton } from "./components/hero/fragments/hero-skeleton/hero-skeleton.fragment";
import { HeroError } from "./components/hero/fragments/hero-error/hero-error.fragment";
import { HabilidadesSkeleton } from "./components/habilidades/fragments/habilidades-skeleton/habilidades-skeleton.fragment";
import { HabilidadesError } from "./components/habilidades/fragments/habilidades-error/habilidades-error.fragment";
import { TrajetoriaSkeleton } from "./components/trajetoria/fragments/trajetoria-skeleton/trajetoria-skeleton.fragment";
import { TrajetoriaError } from "./components/trajetoria/fragments/trajetoria-error/trajetoria-error.fragment";
import { ContatoSkeleton } from "./components/contato/fragments/contato-skeleton/contato-skeleton.fragment";
import { ContatoError } from "./components/contato/fragments/contato-error/contato-error.fragment";

export function Home() {
  return (
    <main id="conteudo-principal">
      <ErrorBoundary fallback={<HeroError />}>
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<HabilidadesError />}>
        <Suspense fallback={<HabilidadesSkeleton />}>
          <HabilidadesSecao />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<TrajetoriaError />}>
        <Suspense fallback={<TrajetoriaSkeleton />}>
          <Trajetoria />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContatoError />}>
        <Suspense fallback={<ContatoSkeleton />}>
          <Contato />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
