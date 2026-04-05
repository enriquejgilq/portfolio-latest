import { useState, useEffect } from 'react';

export function useExperience() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const host = import.meta.env.VITE_HOST || "";
  // El usuario especificó el puerto 3002 para el POST, asumimos el mismo para el resto de este microservicio
  const statsBase = host.includes("localhost") ? "http://localhost:3002" : host;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${statsBase}/api/getAllExperience`, { credentials: 'include' });
      if (!res.ok) throw new Error("Error al obtener experiencias");
      const data = await res.json();
      
      // La API puede devolver un array directo o un objeto { results: [] }
      const finalJobs = Array.isArray(data) ? data : (data.results || []);
      setJobs(finalJobs);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [host]);

  const addExperience = async (formData) => {
    try {
      // Formateamos las fechas a ISO si es necesario y mapeamos campos
      const payload = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate + "T00:00:00.000Z").toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate + "T00:00:00.000Z").toISOString() : null,
      };

      const res = await fetch(`${statsBase}/api/postExperience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Fallo al crear la experiencia");
      }

      const data = await res.json();
      const newJob = data.job || data.result || data.experience;
      
      if (newJob) {
        setJobs(prev => [newJob, ...prev]);
      } else {
        await fetchJobs();
      }
      return { success: true };
    } catch (err) {
      console.error("Error en addExperience:", err);
      return { success: false, error: err.message };
    }
  };

  const updateExperience = async (id, formData) => {
    try {
      const payload = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      };

      const res = await fetch(`${statsBase}/api/experience/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Fallo al actualizar");
      setJobs(prev => prev.map(j => (j._id === id ? { ...j, ...formData } : j)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteExperience = async (id) => {
    try {
      const res = await fetch(`${statsBase}/api/experience/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Fallo al eliminar");
      setJobs(prev => prev.filter(j => j._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    jobs,
    loading,
    error,
    addExperience,
    updateExperience,
    deleteExperience,
    refreshJobs: fetchJobs
  };
}
