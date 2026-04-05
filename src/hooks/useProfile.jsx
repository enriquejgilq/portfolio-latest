import { useState, useEffect } from 'react';

export function useProfile() {
  const [profileData, setProfileData] = useState({ 
    name: "", 
    description: "", 
    layout_type: "Google",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const host = import.meta.env.VITE_HOST || "";

  // Suponiendo que hay un Endpoint GET para traer los datos actuales del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${host}/api/auth/profile`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          // Intentamos extraer el objeto de usuario ya sea directo o anidado
          const userData = data.user || data.result || data;
          const sm = userData.socialMedia || {};
          setProfileData({
            name: userData.username || "",
            description: userData.description || "",
            layout_type: userData.layout_type || "Google",
            github: sm.github || "",
            linkedin: sm.linkedin || "",
            twitter: sm.twitter || "",
            instagram: sm.instagram || "",
            facebook: sm.facebook || ""
          });
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
      const payload = {
        username: updateData.name,
        description: updateData.description,
        layout_type: updateData.layout_type,
        socialMedia: {
          github: updateData.github,
          linkedin: updateData.linkedin,
          twitter: updateData.twitter,
          instagram: updateData.instagram,
          facebook: updateData.facebook
        }
      };

      const res = await fetch(`${host}/api/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error("Fallo al actualizar el perfil.");
      }

      const data = await res.json();
      // Refrescamos el estado con lo que el servidor nos diga que guardó
      const updatedUser = data.user || data.result || data;
      if (updatedUser && typeof updatedUser === 'object') {
        const sm = updatedUser.socialMedia || {};
        setProfileData({
          name: updatedUser.username || updateData.name,
          description: updatedUser.description || updateData.description,
          layout_type: updatedUser.layout_type || updateData.layout_type,
          github: sm.github || updateData.github,
          linkedin: sm.linkedin || updateData.linkedin,
          twitter: sm.twitter || updateData.twitter,
          instagram: sm.instagram || updateData.instagram,
          facebook: sm.facebook || updateData.facebook
        });
      }
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${host}/api/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
        credentials: 'include'
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Fallo al actualizar la contraseña.");
      }

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    profileData,
    loading,
    error,
    updateProfile,
    updatePassword
  };
}
