import { useState, useEffect } from 'react';

export function useProfile() {
  const [profileData, setProfileData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const host = import.meta.env.VITE_HOST || "";

  // Suponiendo que hay un Endpoint GET para traer los datos actuales del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Si no tienes este GET aún en el backend, no impedirá el renderizado
        const token = localStorage.getItem("portfolio_token") || "";
        const res = await fetch(`${host}/api/auth/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "x-auth-token": token
          }
        });
        if (res.ok) {
          const data = await res.json();
          // Asigna valores por defecto del usuario
          setProfileData(data.user || { name: data.name || "", description: data.description || "" });
        }
      } catch (err) {
        // Fallback silencioso si no hay GET
        console.warn("Fallo al traer Data inicial de Perfil (GET)", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [host]);

  const updateProfile = async (updateData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("portfolio_token") || "";
      const res = await fetch(`${host}/api/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-auth-token": token
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error("Fallo al actualizar el perfil.");
      }

      const data = await res.json();
      setProfileData({ ...profileData, ...updateData });
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData) => {
    // Si la actualización de password va por el mismo o distinto endpoint.
    // Usaremos el mismo por ahora según convención
    return updateProfile(passwordData);
  };

  return {
    profileData,
    loading,
    error,
    updateProfile,
    updatePassword
  };
}
