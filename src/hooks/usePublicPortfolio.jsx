import { useState, useEffect } from 'react';

export function usePublicPortfolio(username, searchQuery = "") {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const host = import.meta.env.VITE_HOST || "";
  const statsBase = host.includes("localhost") ? "http://localhost:3002" : host;

  useEffect(() => {
    const fetchData = async () => {
      // No reseteamos loading si ya tenemos perfil para evitar parpadeos en búsqueda
      if (!profile) setLoading(true);
      setError(null);

      try {
        // 1. Perfil (Solo si no lo tenemos)
        if (!profile) {
          const profileRes = await fetch(`${host}/api/auth/public/${username}`);
          if (!profileRes.ok) throw new Error("Usuario no encontrado");
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        // 2. Proyectos (Búsqueda o Todos)
        const projectEndpoint = searchQuery 
          ? `${host}/api/searchPortfolio?query=${encodeURIComponent(searchQuery)}&username=${username}`
          : `${host}/api/getAllPortfolio?username=${username}`;
        
        const projectsRes = await fetch(projectEndpoint);
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData.results || []);
        }

        // 3. Experiencia (Jobs) - Mantener siempre cargado o filtrar localmente?
        // Cargamos todos los jobs una sola vez si no los tenemos
        if (jobs.length === 0) {
          try {
            const jobsRes = await fetch(`${statsBase}/api/getAllExperience?username=${username}`);
            if (jobsRes.ok) {
              const jobsData = await jobsRes.json();
              const finalJobs = Array.isArray(jobsData) ? jobsData : (jobsData.results || []);
              setJobs(finalJobs);
            }
          } catch (jobErr) {
            console.warn("Error opcional cargando experiencia:", jobErr);
            setJobs([]);
          }
        }

      } catch (err) {
        console.error("Error cargando portafolio público:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, host, searchQuery]); // Re-ejecutar si cambia el término de búsqueda

  return { profile, projects, jobs, loading, error };
}
