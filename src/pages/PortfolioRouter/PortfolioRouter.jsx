import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GoogleLayout from "../../layouts/GoogleLayout/GoogleLayout";
import FacebookLayout from "../../layouts/FacebookLayout/FacebookLayout";

// Si luego quieres agregar layouts, los importarías aquí
// import TwitterLayout from "../../layouts/TwitterLayout/TwitterLayout";

export default function PortfolioRouter() {
  const { username } = useParams();
  const [layoutStyle, setLayoutStyle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const host = import.meta.env.VITE_HOST || ""; // Por si no está en App.jsx

  useEffect(() => {
    const fetchUserTheme = async () => {
      setLoading(true);
      try {
        // Paso 2: Consultar a quién vas a "pintar" (Fetch Público)
        const response = await fetch(`${host}/api/auth/public/${username}`);
        if (!response.ok) {
          throw new Error("Usuario no encontrado");
        }
        const data = await response.json();
        
        // Supongamos que la API devuelve { layout: 'Google' } u otra prop
        // Asignamos 'Google' como valor por defecto si no viene.
        setLayoutStyle(data.layout_type || "Google");
      } catch (err) {
        console.error("Error fetching user layout:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserTheme();
    }
  }, [username, host]);

  // Pantalla blanca de carga mientras la API responde
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Manejo de usuario no encontrado
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl text-gray-800">404 - {error}</h1>
      </div>
    );
  }

  // Paso 3: Renderizado Condicional del Tema Visual (Mapeado contra el backend Enum)
  switch (layoutStyle) {
    case "Google":
      return <GoogleLayout username={username} />;
    case "Twitter":
    case "X":
      // return <TwitterLayout username={username} />;
      return <div className="p-10">Borrador: Layout Twitter/X para {username}</div>;
    case "Facebook":
      return <FacebookLayout username={username} />;
    case "Instagram":
      // return <InstagramLayout username={username} />;
      return <div className="p-10">Borrador: Layout Instagram para {username}</div>;
    default:
      // Fallback a Google
      return <GoogleLayout username={username} />;
  }
}
