import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Habilidades,
  Experiencias,
  Login,
  Painel,
  NotFound,
} from "../pages";
import { cores, raio } from "@/lib/tema/tokens";

function CarregandoPagina() {
  return (
    <Box
      minH="100svh"
      bg={cores.background.base}
      display="flex"
      alignItems="center"
      justifyContent="center"
      role="status"
      aria-label="Carregando..."
    >
      <Box
        w="40px"
        h="40px"
        border={`3px solid ${cores.border.DEFAULT}`}
        borderTop={`3px solid ${cores.primary.light}`}
        borderRadius={raio.full}
        style={{ animation: "spin 0.7s linear infinite" }}
      />
    </Box>
  );
}

const transicaoPagina = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const transicaoConfig = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

export function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={transicaoPagina.initial}
        animate={transicaoPagina.animate}
        exit={transicaoPagina.exit}
        transition={transicaoConfig}
      >
        <Suspense fallback={<CarregandoPagina />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/habilidades" element={<Habilidades />} />
            <Route path="/experiencias" element={<Experiencias />} />
            <Route path="/login" element={<Login />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
