import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Hook para scroll suave até uma âncora na home.
 * Se a rota atual não for '/', navega para a home antes de rolar.
 */
export function useScrollSuave() {
  const location = useLocation();
  const navigate = useNavigate();

  const rolarParaAncora = useCallback(
    (ancora: string) => {
      const executarScroll = () => {
        document.getElementById(ancora)?.scrollIntoView({ behavior: "smooth" });
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(executarScroll, 120);
      } else {
        executarScroll();
      }
    },
    [location.pathname, navigate],
  );

  return { rolarParaAncora };
}
