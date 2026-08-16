import { Hero, Trajetoria, Expertise, Contato } from "./components";

export function Home() {
  return (
    <main id="conteudo-principal">
      <Hero />
      <Expertise />
      <Trajetoria />
      <Contato />
    </main>
  );
}
