import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { cores, raio } from "@/lib/tema/tokens";
import { logger } from "@/lib/logger";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary para capturar erros de renderização.
 * Evita que um componente quebrado derrube toda a página.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Erro capturado pelo ErrorBoundary", {
      erro: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          p="8"
          bg={cores.bg.card}
          border={`1px solid ${cores.borda.DEFAULT}`}
          borderRadius={raio["2xl"]}
          textAlign="center"
        >
          <VStack gap="3">
            <Heading as="h3" fontSize="lg" color={cores.texto.titulo}>
              Algo deu errado
            </Heading>
            <Text fontSize="sm" color={cores.texto.corpo}>
              Não foi possível carregar este conteúdo. Tente recarregar a
              página.
            </Text>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
