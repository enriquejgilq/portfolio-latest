import { BarChart3, Users, Clock, ArrowUpRight, AlertCircle } from "lucide-react";
import { useStats } from "../../../hooks/useStats.jsx";

export default function StatsView() {
  const { stats, loading, error } = useStats();
  
  const monthNames = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
              {stats.loading ? "..." : stats.totalOverall}
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Historial de Visitas por Mes</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase">Reporte Mensual</span>
        </div>
        <div className="p-0">
          {stats.loading ? (
            <div className="p-10 text-center text-gray-400 italic">Cargando historial...</div>
          ) : stats.history.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {stats.history.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                       {item.month}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{monthNames[item.month]} {item.year}</p>
                      <p className="text-xs text-gray-500 italic">Registros de este periodo</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-blue-600">{item.count}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">vistas</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center text-gray-400 flex flex-col items-center">
              <BarChart3 className="w-12 h-12 mb-3 opacity-20" />
              <p>No hay datos históricos disponibles todavía.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
