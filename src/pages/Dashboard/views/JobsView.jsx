import { useState } from "react";
import { Briefcase, Eye, Search, X, Calendar, Building2, Plus, Save, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "../../../hooks/useExperience.jsx";

export default function JobsView() {
  const { jobs, loading, addExperience, updateExperience, deleteExperience } = useExperience();
  
  // Modals state
  const [selectedJob, setSelectedJob] = useState(null); // Detalles
  const [isCreatingJob, setIsCreatingJob] = useState(false); // Crear
  const [editingJob, setEditingJob] = useState(null); // Editar
  const [deletingJob, setDeletingJob] = useState(null); // Eliminar

  const [isSubmiting, setIsSubmiting] = useState(false);

  // Forms state
  const [createForm, setCreateForm] = useState({ position: "", company: "", typePosition: "Full-time", location: "", startDate: "", endDate: "", description: [""] });
  const [editForm, setEditForm] = useState({ position: "", company: "", typePosition: "Full-time", location: "", startDate: "", endDate: "", description: [""] });

  const [searchTerm, setSearchTerm] = useState("");

  // --- Handlers Creación Trabajo ---
  const handleOpenCreate = () => {
    setCreateForm({ position: "", company: "", typePosition: "Full-time", location: "", startDate: "", endDate: "", description: [""] });
    setIsCreatingJob(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const result = await addExperience(createForm);
    if (result.success) {
      setIsCreatingJob(false);
    } else {
      alert("Error al crear: " + result.error);
    }
    setIsSubmiting(false);
  };

  // --- Handlers Edición Trabajo ---
  const handleOpenEdit = (job) => {
    const desc = Array.isArray(job.description) ? job.description : [job.description || ""];
    setEditForm({
      position: job.position || job.role || job.title || "",
      company: job.company || "",
      typePosition: job.typePosition || "Full-time",
      location: job.location || "",
      startDate: job.startDate ? job.startDate.split("T")[0] : "",
      endDate: job.endDate ? job.endDate.split("T")[0] : "",
      description: desc.length > 0 ? desc : [""]
    });
    setEditingJob(job);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const result = await updateExperience(editingJob._id, editForm);
    if (result.success) {
      setEditingJob(null);
    } else {
      alert("Error al actualizar: " + result.error);
    }
    setIsSubmiting(false);
  };

  // --- Handlers Eliminación Trabajo ---
  const handleDeleteConfirm = async () => {
    setIsSubmiting(true);
    const result = await deleteExperience(deletingJob._id);
    if (result.success) {
      setDeletingJob(null);
    } else {
      alert("Error al eliminar: " + result.error);
    }
    setIsSubmiting(false);
  };

  // --- Lógica de Búsqueda ---
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    const posMatch = (job.position || job.role || job.title || "").toLowerCase().includes(term);
    const compMatch = (job.company || "").toLowerCase().includes(term);
    return posMatch || compMatch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Mis Trabajos</h2>
          <p className="text-gray-500">Consulta tu historial de experiencia laboral y agrégalos.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar trabajo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button onClick={handleOpenCreate} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Trabajo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <th className="p-4">Empresa / Rol</th>
              <th className="p-4">Período</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
               <tr><td colSpan="3" className="p-8 text-center text-gray-500">Cargando trabajos...</td></tr>
            ) : jobs.length === 0 ? (
               <tr><td colSpan="3" className="p-8 text-center text-gray-500">No hay experiencia cargada.</td></tr>
            ) : filteredJobs.length === 0 ? (
               <tr><td colSpan="3" className="p-8 text-center text-gray-500">No se encontró contenido para "{searchTerm}".</td></tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job._id || job.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{job.position || job.role || job.title || "Posición"}</p>
                        <p className="text-sm text-gray-500">{job.company || "Empresa"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {job.startDate ? job.startDate.split("T")[0] : "--"} - {job.endDate ? job.endDate.split("T")[0] : "Presente"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedJob(job)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Detalles">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenEdit(job)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeletingJob(job)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Añadir Trabajo */}
      <AnimatePresence>
        {isCreatingJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-gray-100">
                <h3 className="text-xl font-bold flex items-center text-gray-800">
                  <Plus className="w-5 h-5 mr-2 text-blue-500" />
                  Agregar Experiencia
                </h3>
                <button onClick={() => setIsCreatingJob(false)} className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Puesto o Rol</label>
                    <input type="text" placeholder="Ej: Senior Backend Developer" value={createForm.position} onChange={e => setCreateForm({...createForm, position: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compañía</label>
                    <input type="text" placeholder="Ej: Google" value={createForm.company} onChange={e => setCreateForm({...createForm, company: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Jornada</label>
                    <select value={createForm.typePosition} onChange={e => setCreateForm({...createForm, typePosition: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                    <input type="text" placeholder="Ej: Mountain View, CA" value={createForm.location} onChange={e => setCreateForm({...createForm, location: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" required />
                  </div>
                </div>

                <div className="flex gap-4">
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-blue-500" /> Fecha Inicio
                    </label>
                    <input 
                      type="date" 
                      value={createForm.startDate} 
                      onChange={e => setCreateForm({...createForm, startDate: e.target.value})} 
                      className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" 
                      required 
                    />
                   </div>
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-blue-500" /> Fecha Fin
                    </label>
                    <input 
                      type="date" 
                      value={createForm.endDate} 
                      onChange={e => setCreateForm({...createForm, endDate: e.target.value})} 
                      className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" 
                    />
                    <p className="text-[10px] text-gray-400 mt-1">* Dejar vacío si es el trabajo actual</p>
                   </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Descripción y Logros</label>
                    <button 
                      type="button" 
                      onClick={() => setCreateForm({...createForm, description: [...createForm.description, ""]})}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Añadir Logro
                    </button>
                  </div>
                  <div className="space-y-2">
                    {createForm.description.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          placeholder={`Logro #${idx + 1}`} 
                          value={item} 
                          onChange={e => {
                            const newDesc = [...createForm.description];
                            newDesc[idx] = e.target.value;
                            setCreateForm({...createForm, description: newDesc});
                          }} 
                          className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" 
                          required 
                        />
                        {createForm.description.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => setCreateForm({...createForm, description: createForm.description.filter((_, i) => i !== idx)})}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsCreatingJob(false)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium">Cancelar</button>
                  <button type="submit" disabled={isSubmiting} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center rounded-xl transition-colors font-medium">
                     <Save className="w-4 h-4 mr-2" />
                     {isSubmiting ? "Guardando..." : "Agregar Trabajo"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Editar Trabajo */}
      <AnimatePresence>
        {editingJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-gray-100">
                <h3 className="text-xl font-bold flex items-center text-gray-800">
                  <Edit2 className="w-5 h-5 mr-2 text-amber-500" />
                  Editar Experiencia
                </h3>
                <button onClick={() => setEditingJob(null)} className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Puesto o Rol</label>
                    <input type="text" value={editForm.position} onChange={e => setEditForm({...editForm, position: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compañía</label>
                    <input type="text" value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Jornada</label>
                    <select value={editForm.typePosition} onChange={e => setEditForm({...editForm, typePosition: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                    <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" required />
                  </div>
                </div>

                <div className="flex gap-4">
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-amber-500" /> Fecha Inicio
                    </label>
                    <input 
                      type="date" 
                      value={editForm.startDate} 
                      onChange={e => setEditForm({...editForm, startDate: e.target.value})} 
                      className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" 
                      required 
                    />
                   </div>
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-amber-500" /> Fecha Fin
                    </label>
                    <input 
                      type="date" 
                      value={editForm.endDate} 
                      onChange={e => setEditForm({...editForm, endDate: e.target.value})} 
                      className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" 
                    />
                   </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Descripción y Logros</label>
                    <button 
                      type="button" 
                      onClick={() => setEditForm({...editForm, description: [...editForm.description, ""]})}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Añadir Logro
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editForm.description.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          value={item} 
                          onChange={e => {
                            const newDesc = [...editForm.description];
                            newDesc[idx] = e.target.value;
                            setEditForm({...editForm, description: newDesc});
                          }} 
                          className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" 
                          required 
                        />
                        {editForm.description.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => setEditForm({...editForm, description: editForm.description.filter((_, i) => i !== idx)})}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingJob(null)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium">Cancelar</button>
                  <button type="submit" disabled={isSubmiting} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center rounded-xl transition-colors font-medium">
                     <Save className="w-4 h-4 mr-2" />
                     {isSubmiting ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Detalles Trabajo */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex flex-col bg-slate-800 text-white p-8 relative">
                <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-4 mb-2">
                   <div className="p-3 bg-white/10 rounded-xl">
                      <Briefcase className="w-8 h-8 text-blue-400" />
                   </div>
                   <div>
                     <h3 className="text-3xl font-bold tracking-tight">{selectedJob.position || selectedJob.role || selectedJob.title}</h3>
                     <p className="text-blue-200 text-sm opacity-80">{selectedJob.typePosition} • {selectedJob.location}</p>
                   </div>
                </div>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap gap-6 mb-8 text-sm">
                  <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <Building2 className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="font-semibold text-gray-800">{selectedJob.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{selectedJob.startDate ? selectedJob.startDate.split("T")[0] : "--"} — {selectedJob.endDate ? selectedJob.endDate.split("T")[0] : "Presente"}</span>
                  </div>
                </div>
                
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Descripción y Logros</h4>
                <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
                  {Array.isArray(selectedJob.description) && selectedJob.description.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                       {selectedJob.description.map((item, i) => (
                         <li key={i}>{item}</li>
                       ))}
                    </ul>
                  ) : selectedJob.description ? (
                    <p>{selectedJob.description}</p>
                  ) : (
                    <p className="text-gray-400 italic">No hay descripción detallada registrada para este puesto.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Confirmar Eliminación */}
      <AnimatePresence>
        {deletingJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center"
            >
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eliminar Trabajo</h3>
              <p className="text-gray-500 text-sm mb-6">
                ¿Estás seguro de que deseas borrar tu registro en "<strong>{deletingJob.company}</strong>"?
              </p>
              
              <div className="flex gap-3">
                <button onClick={() => setDeletingJob(null)} className="w-1/2 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>
                <button disabled={isSubmiting} onClick={handleDeleteConfirm} className="w-1/2 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-70">
                  {isSubmiting ? "..." : "Sí, Eliminar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
