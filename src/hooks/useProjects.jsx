import { useState, useEffect } from 'react';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const host = import.meta.env.VITE_HOST || "";
  const statsBase = host.includes("localhost") ? "http://localhost:3002" : host;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Usamos el endpoint del microservicio en 3002 si aplica, o mantenemos el host base
      const res = await fetch(`${statsBase}/api/getAllPortfolio`, { credentials: 'include' });
      if (!res.ok) throw new Error("Error al obtener proyectos");
      const data = await res.json();
      setProjects(data.results || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [host]);

  const addProjects = async (formData) => {
    try {
      // Mapeamos el objeto del formulario al formato exacto que pide el backend
      const mappedProject = {
        name: formData.name,
        description: formData.description,
        technology: Array.isArray(formData.technology) ? formData.technology : [],
        images: Array.isArray(formData.images) ? formData.images : [],
        works: [
          formData.repoUrl || "",
          formData.demoUrl || ""
        ].filter(Boolean) // Eliminamos vacíos si prefieres, o los dejamos como strings
      };

      // El endpoint 'createMultiplePortfolios' espera un array de estos objetos
      const payload = [mappedProject];
      
      const res = await fetch(`${statsBase}/api/createMultiplePortfolios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error("Fallo al crear proyecto(s)");
      const data = await res.json();
      
      // Actualizamos el estado local
      await fetchProjects();
      return { success: true, data };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const res = await fetch(`${statsBase}/api/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Fallo al actualizar proyecto");
      setProjects(prev => prev.map(p => p._id === id ? { ...p, ...projectData } : p));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${statsBase}/api/portfolio/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Fallo al eliminar proyecto");
      setProjects(prev => prev.filter(p => p._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    projects,
    loading,
    error,
    addProjects,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects
  };
}
