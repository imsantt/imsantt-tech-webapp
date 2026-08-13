import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Home, NotFound } from "../pages";

function CarregandoPagina() {
  return (
    <Box
      minH="100svh"
      bg="#0a0a0f"
      display="flex"
      alignItems="center"
      justifyContent="center"
      role="status"
      aria-label="Carregando..."
    >
      <Box
        w="40px"
        h="40px"
        border="3px solid #2a2a3a"
        borderTop="3px solid #a855f7"
        borderRadius="full"
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
