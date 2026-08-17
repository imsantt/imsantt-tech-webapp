import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname!, "src"),
    },
  },
  build: {
    target: "es2022",
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router")
          ) {
            return "vendor-react";
          }
          if (
            id.includes("node_modules/@chakra-ui") ||
            id.includes("node_modules/@emotion") ||
            id.includes("node_modules/framer-motion")
          ) {
            return "vendor-ui";
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.spec.{ts,tsx}",
        "src/**/*.test.{ts,tsx}",
        "src/tests/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/App.tsx",
        "src/**/index.ts",
        "src/routes/**",
        "src/services/**",
        "src/types/**",
        "src/lib/supabase.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
