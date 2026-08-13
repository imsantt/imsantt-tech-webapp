import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Home, NotFound } from "../pages";
import { cores, raio } from "../lib/tema/tokens";

function CarregandoPagina() {
  return (
    <Box
      minH="100svh"
      bg={cores.bg.base}
      display="flex"
      alignItems="center"
      justifyContent="center"
      role="status"
      aria-label="Carregando..."
    >
      <Box
        w="40px"
        h="40px"
        border={`3px solid ${cores.borda.DEFAULT}`}
        borderTop={`3px solid ${cores.primaria.claro}`}
        borderRadius={raio.full}
        style={{ animation: "spin 0.7s linear infinite" }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Box>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<CarregandoPagina />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
