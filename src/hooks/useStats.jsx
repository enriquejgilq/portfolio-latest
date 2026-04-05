import { useState, useEffect } from 'react';

export function useStats() {
  const [stats, setStats] = useState({ totalOverall: 0, history: [], loading: true });
  const [error, setError] = useState(null);
  
  const host = import.meta.env.VITE_HOST || "";

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const username = localStorage.getItem("portfolio_username") || "enriquegilq";
        
        // Host para estadísticas en puerto 3002 (específico para este microservicio)
        const statsBase = host.includes("localhost") ? "http://localhost:3002" : host;
        
        const res = await fetch(`${statsBase}/api/visits/stats?username=${username}`); 
        if (!res.ok) throw new Error("Error al obtener estadísticas");
        
        const data = await res.json();
        
        setStats({ 
          totalOverall: data.totalOverall || 0,
          history: data.history || [],
          loading: false 
        });
      } catch (err) {
        console.error("Error al obtener estadísticas de visitas:", err);
        setError(err.message);
        setStats({ totalOverall: 0, history: [], loading: false });
      }
    };
    fetchVisits();
  }, [host]);

  return {
    stats,
    loading: stats.loading,
    error
  };
}
