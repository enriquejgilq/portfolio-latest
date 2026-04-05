import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRecovery = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simularemos la llamada a la API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center"
      >
        {!submitted ? (
          <>
            <div className="mb-6">
              <ShieldCheck className="w-16 h-16 text-teal-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Recuperar Acceso</h1>
              <p className="text-teal-200/80 text-sm">
                Ingresa el correo electrónico asociado a tu cuenta para enviarte un enlace de recuperación.
              </p>
            </div>

            <form onSubmit={handleRecovery} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-300" />
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-teal-300/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:bg-teal-400 hover:shadow-teal-500/30 transition-all disabled:opacity-70"
              >
                {loading ? "Enviando..." : "Enviar Enlace"}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-4"
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Correo Enviado!</h2>
            <p className="text-teal-200/80 text-sm mb-8">
              Revisa tu bandeja de entrada o la carpeta de spam para restablecer tu contraseña.
            </p>
          </motion.div>
        )}

        <div className="mt-8">
          <Link to="/login" className="flex items-center justify-center text-sm text-teal-200 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio de sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
