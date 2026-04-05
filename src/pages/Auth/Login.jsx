import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const host = import.meta.env.VITE_HOST || "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error("Credenciales inválidas o error de conexión.");
      
      const data = await response.json();
      
      // Guardamos el username para tenerlo "a la mano" en todo el dashboard
      // Si el back no lo devuelve en 'data.username', usamos el que ingresó el usuario
      localStorage.setItem("portfolio_username", data.username || username);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Bienvenido</h1>
          <p className="text-blue-200 text-sm">Inicia sesión en tu Portafolio SaaS</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-blue-300/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-blue-300/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-blue-300">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50" />
              <span>Recordarme</span>
            </label>
            <Link to="/recovery" className="hover:text-white transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Entrar a mi Dashboard"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-blue-200">
          ¿No tienes una cuenta aún?{" "}
          <Link to="/register" className="text-white font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
