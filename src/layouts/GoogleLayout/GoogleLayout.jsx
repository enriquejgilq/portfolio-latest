import { useLocation } from "react-router-dom";
import HomePage from "../../pages/Home/HomePage";
import { SearchPage } from "../../pages/SearchPage/SearchPage";

export default function GoogleLayout({ username }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  // Si hay una consulta, mostramos los resultados (SearchPage),
  // si no, mostramos el buscador principal (HomePage).
  // Pasamos el "username" para que estos componentes hagan sus fetch a la API filtrando por usuario.
  
  if (query !== null && query !== undefined && query !== "") {
    return <SearchPage username={username} />;
  }

  return <HomePage username={username} />;
}
