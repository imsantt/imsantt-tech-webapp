import { Hero, Trajetoria, HabilidadesSecao, Contato } from "./components";

export function Home() {
  return (
    <main id="conteudo-principal">
      <Hero />
      <HabilidadesSecao />
      <Trajetoria />
      <Contato />
    </main>
  );
}
