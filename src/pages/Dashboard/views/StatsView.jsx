import { useEffect, useState } from "react";
import { BarChart3, Users, Clock, ArrowUpRight } from "lucide-react";

export default function StatsView() {
  const [stats, setStats] = useState({ visits: 0, loading: true });
  const host = import.meta.env.VITE_HOST || "";

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(`${host}/api/visits`); // Obtendrá de Auth backend por su contexto o se requiere param
        const data = await res.json();
        setStats({ visits: data.visits || 0, loading: false });
      } catch (err) {
        setStats({ visits: 0, loading: false });
      }
    };
    fetchVisits();
  }, [host]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Estadísticas</h2>
          <p className="text-gray-500">Un resumen sobre el rendimiento de tu plataforma publico.</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
          Ver reporte <ArrowUpRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-emerald-50 rounded-full">
            <Users className="text-emerald-500 w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Visitas Totales</p>
            <h3 className="text-4xl font-black text-gray-800">
              {stats.loading ? "..." : stats.visits}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-indigo-50 rounded-full">
            <BarChart3 className="text-indigo-500 w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Proyectos</p>
            <h3 className="text-4xl font-black text-gray-800">
              --
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-amber-50 rounded-full">
            <Clock className="text-amber-500 w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Uptimes</p>
            <h3 className="text-4xl font-black text-gray-800">
              99.9%
            </h3>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center">
        <p className="text-gray-400">Gráfico de visitas en el tiempo (Próximamente)</p>
      </div>
    </div>
  );
}
