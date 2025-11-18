import { Header } from "./components/Header.jsx" //No hace falta poner la extension .jsx porque estamos usando el empaquetador Vite pero es recomendable hacerlo
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { NotFoundPage } from "./pages/404.jsx";

function App() {
  // Recuperamos la pagina actual en la que estamos
  const currentPath = window.location.pathname

  let page = <NotFoundPage/>

  if(currentPath === '/'){
    page = <HomePage/>
  } else if (currentPath === '/search'){
    page = <SearchPage/>
   }


  return (
    <>
      <Header />
      { page }
      <Footer />
    </>
  );
}

export default App;
