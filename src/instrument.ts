import * as Sentry from "@sentry/react";
import React from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: __APP_VERSION__,
  enabled: import.meta.env.PROD,

  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Tracing — 20% em produção, 100% em dev
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/imsantt\.dev/,
    /^https:\/\/.*\.imsantt-tech-webapp\.pages\.dev/,
  ],

  // Session Replay — apenas sessões com erro em produção
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  // Logs estruturados
  enableLogs: true,

  // Ignora erros comuns de browser que não são actionable
  ignoreErrors: [
    "ResizeObserver loop",
    "Non-Error promise rejection",
    "Load failed",
    "Failed to fetch",
    "NetworkError",
    "AbortError",
  ],
});
