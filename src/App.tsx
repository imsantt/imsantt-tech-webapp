import { Navbar, Footer } from "./components/layout";
import { AppRoutes } from "./routes";

function App() {
  return (
    <>
      <a href="#conteudo-principal" className="pular-para-conteudo">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
