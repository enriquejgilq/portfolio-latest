import { useState, useEffect } from "react";
import { User, Lock, Save, CheckCircle } from "lucide-react";
import { useProfile } from "../../../hooks/useProfile.jsx";

export default function ProfileView() {
  const { profileData, loading, error, updateProfile, updatePassword } = useProfile();
  
  // Local state for the forms
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    layout_type: "Google",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: ""
  });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const layouts = ["Google", "Instagram", "Facebook", "X", "Twitter"];

  // Populate local form when hook fetches data
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        description: profileData.description || "",
        layout_type: profileData.layout_type || "Google",
        github: profileData.github || "",
        linkedin: profileData.linkedin || "",
        twitter: profileData.twitter || "",
        instagram: profileData.instagram || "",
        facebook: profileData.facebook || ""
      });
    }
  }, [profileData]);

  if (!profileData && loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
         <p className="text-gray-500 font-medium">Cargando tus datos...</p>
      </div>
    );
  }

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const result = await updateProfile(formData);
    if (result.success) {
      setSuccessMsg("Información actualizada exitosamente.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const result = await updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });
    
    if (result.success) {
      setPasswordData({ currentPassword: "", newPassword: "" });
      setSuccessMsg("Contraseña actualizada exitosamente.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Mi Perfil</h2>
      <p className="text-gray-500">Administra tu información personal y opciones de seguridad.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
          Error: {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 text-sm font-medium flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Info Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="text-blue-600 w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold">Información General</h3>
          </div>
          
          <form onSubmit={handleUpdateInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Público</label>
              <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                 className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 p-2.5 border" 
                 placeholder="e.g. Enrique Gil" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Breve</label>
              <textarea 
                 rows={3} 
                 value={formData.description}
                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                 className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 p-2.5 border" 
                 placeholder="Desarrollador Full Stack..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Estilo del Portafolio (Layout)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {layouts.map((layout) => (
                  <button
                    key={layout}
                    type="button"
                    onClick={() => setFormData({ ...formData, layout_type: layout })}
                    className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-2 ${
                      formData.layout_type === layout
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {layout}
                  </button>
                ))}
              </div>
            </div>
            <button disabled={loading} className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors font-medium disabled:opacity-70 mt-6">
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <Lock className="text-red-500 w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold">Seguridad</h3>
          </div>
          
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
              <input 
                 type="password" 
                 value={passwordData.currentPassword}
                 onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                 className="w-full border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 bg-gray-50 p-2.5 border" 
                 required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <input 
                 type="password" 
                 value={passwordData.newPassword}
                 onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                 className="w-full border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 bg-gray-50 p-2.5 border" 
                 required
              />
            </div>
            <button disabled={loading} className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition-colors font-medium disabled:opacity-70">
              <Lock className="w-4 h-4 mr-2" />
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
          </form>
        </div>

        {/* Social Media Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <User className="text-indigo-600 w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold">Redes Sociales</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <span className="w-2 h-2 bg-slate-800 rounded-full mr-2"></span> GitHub
                  </label>
                  <input type="url" placeholder="https://github.com/..." value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-slate-500 focus:border-slate-500 bg-gray-50 p-2.5 border text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span> LinkedIn
                  </label>
                  <input type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 p-2.5 border text-sm" />
                </div>
             </div>

             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span> Twitter
                   </label>
                   <input type="url" placeholder="https://twitter.com/..." value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-sky-400 focus:border-sky-400 bg-gray-50 p-2.5 border text-sm" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                     <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span> Instagram
                   </label>
                   <input type="url" placeholder="https://instagram.com/..." value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-pink-400 focus:border-pink-400 bg-gray-50 p-2.5 border text-sm" />
                </div>
             </div>

             <div className="flex flex-col justify-between">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                     <span className="w-2 h-2 bg-blue-800 rounded-full mr-2"></span> Facebook
                   </label>
                   <input type="url" placeholder="https://facebook.com/..." value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-700 focus:border-blue-700 bg-gray-50 p-2.5 border text-sm" />
                </div>
                <button onClick={handleUpdateInfo} disabled={loading} className="w-full lg:w-auto self-end mt-4 lg:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-all font-semibold shadow-lg shadow-blue-200">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Sincronizando..." : "Guardar mis Redes"}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
