import { useState, useEffect } from "react";
import { User, Lock, Save, CheckCircle } from "lucide-react";
import { useProfile } from "../../../hooks/useProfile.jsx";

export default function ProfileView() {
  const { profileData, loading, error, updateProfile, updatePassword } = useProfile();
  
  // Local state for the forms
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });
  const [successMsg, setSuccessMsg] = useState("");

  // Populate local form when hook fetches data
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        description: profileData.description || "",
      });
    }
  }, [profileData]);

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
    // Se envía el payload esperado por el PUT
    const result = await updatePassword({
      password: passwordData.currentPassword,
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
            <button disabled={loading} className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors font-medium disabled:opacity-70">
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
      </div>
    </div>
  );
}
