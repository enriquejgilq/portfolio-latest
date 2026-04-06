import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import { SearchPage } from "./pages/SearchPage/SearchPage.jsx";
import { PageDetails } from "./pages/PageDetails/PageDetails.jsx";
import PortfolioRouter from "./pages/PortfolioRouter/PortfolioRouter.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Recovery from "./pages/Auth/Recovery.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz ahora redirige al portal inicial de la plataforma */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas de Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        
        {/* Rutas requeridas para paso 1 */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/:username" element={<PortfolioRouter />} />
        
        {/* Ruta para cuando el usuario hacía submit en la Home local (Si es legacy se puede borrar, por ahora se queda) */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/details" element={<PageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
