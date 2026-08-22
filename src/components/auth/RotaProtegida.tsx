import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { cores, raio } from "@/lib/tema/tokens";
import { useAuth } from "@/hooks/use-auth/useAuth.hook";

function Carregando() {
  return (
    <Box
      minH="100svh"
      bg={cores.bg.base}
      display="flex"
      alignItems="center"
      justifyContent="center"
      role="status"
      aria-label="Verificando sessão..."
    >
      <Box
        w="40px"
        h="40px"
        border={`3px solid ${cores.borda.DEFAULT}`}
        borderTop={`3px solid ${cores.primaria.claro}`}
        borderRadius={raio.full}
        style={{ animation: "spin 0.7s linear infinite" }}
      />
    </Box>
  );
}

interface RotaProtegidaProps {
  children: ReactNode;
  /** Rota para redirecionar quando não autenticado. Padrão: /login */
  redirecionarPara?: string;
}

/**
 * Protege rotas que exigem autenticação.
 * - Enquanto verifica a sessão, exibe um loader.
 * - Se não autenticado, redireciona para /login preservando a origem em state.from.
 * - Se autenticado, renderiza o conteúdo.
 */
export function RotaProtegida({
  children,
  redirecionarPara = "/login",
}: RotaProtegidaProps) {
  const { autenticado, carregando } = useAuth();
  const location = useLocation();

  if (carregando) {
    return <Carregando />;
  }

  if (!autenticado) {
    return (
      <Navigate
        to={redirecionarPara}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}
