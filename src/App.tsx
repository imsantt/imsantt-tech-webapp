import { useLocation } from "react-router-dom";
import { Navbar, NavbarSimples, Footer } from "./components/layout";
import { AppRoutes } from "./routes";

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isAuth = pathname === "/login";

  if (isAuth) {
    return (
      <>
        <a href="#conteudo-principal" className="pular-para-conteudo">
          Pular para o conteúdo principal
        </a>
        <AppRoutes />
      </>
    );
  }

  return (
    <>
      <a href="#conteudo-principal" className="pular-para-conteudo">
        Pular para o conteúdo principal
      </a>
      {isHome ? <Navbar /> : <NavbarSimples />}
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
