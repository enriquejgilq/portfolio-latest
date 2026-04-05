import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, LayoutTemplate, ArrowRight, ArrowLeft } from "lucide-react";

const themes = [
  { id: "Google", name: "Buscador Clásico", color: "bg-blue-500", desc: "Como Google Search" },
  { id: "Twitter", name: "Social Feed", color: "bg-sky-500", desc: "Estilo Twitter clásico" },
  { id: "X", name: "Modern Feed", color: "bg-zinc-800", desc: "Estilo X (Oscuro)" },
  { id: "Facebook", name: "Classic Social", color: "bg-indigo-600", desc: "Estilo Facebook" },
  { id: "Instagram", name: "Visual Grid", color: "bg-pink-600", desc: "Estilo Instagram" }
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", layout: "Google" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const host = import.meta.env.VITE_HOST || "";

  const handleNext = () => {
    if (formData.username && formData.email && formData.password) setStep(2);
    else setError("Por favor completa todos los campos.");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${host}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en el registro. Intenta otro username.");
      
      // Tras registrar, redirigir al login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl p-8 overflow-hidden"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Construye tu Espacio</h1>
          <p className="text-purple-200 text-sm">Paso {step} de 2</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 text-sm text-center rounded-xl border border-red-500/30">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="space-y-5"
            >
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="text"
                  placeholder="Username único"
                  value={formData.username}
                  onChange={(e) => {
                    setError("");
                    setFormData({ ...formData, username: e.target.value.toLowerCase() })
                  }}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-purple-300/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={(e) => {
                    setError("");
                    setFormData({ ...formData, email: e.target.value })
                  }}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-purple-300/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) => {
                    setError("");
                    setFormData({ ...formData, password: e.target.value })
                  }}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-purple-300/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-2xl flex items-center justify-center font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all group"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              onSubmit={handleRegister}
              className="space-y-6"
            >
              <div className="text-center mb-4">
                <LayoutTemplate className="w-10 h-10 mx-auto text-purple-300 mb-2" />
                <h3 className="text-xl text-white font-semibold">Elige tu Plantilla</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setFormData({ ...formData, layout: theme.id })}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                      formData.layout === theme.id 
                        ? `border-white ${theme.color} shadow-lg scale-[1.02]` 
                        : 'border-transparent bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <h4 className="text-white font-bold mb-1">{theme.name}</h4>
                    <p className={`text-xs ${formData.layout === theme.id ? 'text-white/90' : 'text-purple-200/70'}`}>
                      {theme.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-white/10 text-white py-3 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-70"
                >
                  {loading ? "Creando perfl..." : "Finalizar Registro"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-purple-200">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
