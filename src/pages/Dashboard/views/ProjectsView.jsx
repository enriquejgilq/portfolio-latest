import { useState, useEffect } from "react";
import { FolderGit2, Edit2, Trash2, Eye, Plus, X, Globe, Github, AlertTriangle, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsView() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState(null); 
  const [editingProject, setEditingProject] = useState(null); 
  const [deletingProject, setDeletingProject] = useState(null); 
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Forms state
  const [editForm, setEditForm] = useState({ name: "", description: "", technology: "", demoUrl: "", repoUrl: "" });
  const [createForm, setCreateForm] = useState({ name: "", description: "", technology: "", demoUrl: "", repoUrl: "" });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const host = import.meta.env.VITE_HOST || "";

  useEffect(() => {
    fetchProjects();
  }, [host]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${host}/api/getAllPortfolio`); 
      const data = await res.json();
      setProjects(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers de Creación ---
  const handleOpenCreate = () => {
    setCreateForm({ name: "", description: "", technology: "", demoUrl: "", repoUrl: "" });
    setIsCreatingProject(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const newBody = {
        ...createForm,
        technology: createForm.technology.split(",").map(t => t.trim()).filter(Boolean)
      };
      
      const res = await fetch(`${host}/api/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBody)
      });
      
      if (!res.ok) throw new Error("Fallo al crear proyecto");
      
      const data = await res.json();
      
      // Actualizamos listado asumiendo que el back retorna el objeto insertado en `data.project` o similar, 
      // si no retorna nada, hacemos un refetch.
      if (data && (data.project || data.result)) {
        setProjects([data.project || data.result, ...projects]);
      } else {
        await fetchProjects();
      }
      setIsCreatingProject(false);
    } catch (err) {
      console.error(err);
      alert("Error simulado o falló conexión al backend al intentar Crear.");
    } finally {
      setIsSubmiting(false);
    }
  };

  // --- Handlers de Edición ---
  const handleOpenEdit = (proj) => {
    setEditForm({
      name: proj.name || "",
      description: proj.description || "",
      technology: proj.technology ? proj.technology.join(", ") : "",
      demoUrl: proj.demoUrl || "",
      repoUrl: proj.repoUrl || ""
    });
    setEditingProject(proj);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const updatedBody = {
        ...editForm,
        technology: editForm.technology.split(",").map(t => t.trim()).filter(Boolean)
      };
      
      const res = await fetch(`${host}/api/portfolio/${editingProject._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBody)
      });
      
      if (!res.ok) throw new Error("Fallo al actualizar");

      setProjects(projects.map(p => p._id === editingProject._id ? { ...p, ...updatedBody } : p));
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      alert("Error falló conexión al backend al intentar Editar.");
    } finally {
      setIsSubmiting(false);
    }
  };

  // --- Handlers de Eliminación ---
  const handleDeleteConfirm = async () => {
    setIsSubmiting(true);
    try {
      const res = await fetch(`${host}/api/portfolio/${deletingProject._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Fallo al eliminar");

      setProjects(projects.filter(p => p._id !== deletingProject._id));
      setDeletingProject(null);
    } catch (err) {
      console.error(err);
      alert("Error: falló conexión al backend al intentar Eliminar.");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Mis Proyectos</h2>
          <p className="text-gray-500">Gestiona, edita y elimina tu portafolio público.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <th className="p-4">Proyecto</th>
              <th className="p-4 hidden sm:table-cell">Tecnologías</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
               <tr><td colSpan="3" className="p-8 text-center text-gray-500">Cargando proyectos...</td></tr>
            ) : projects.length === 0 ? (
               <tr><td colSpan="3" className="p-8 text-center text-gray-500">No hay proyectos para mostrar.</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {project.images?.[0] ? (
                        <img src={project.images[0]} alt={project.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                      ) : (
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <FolderGit2 className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800 truncate max-w-[200px]">{project.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.technology?.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.technology?.length > 3 && (
                         <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">+{project.technology.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedProject(project)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Detalles">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenEdit(project)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeletingProject(project)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
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

      {/* MODALES REUSABLES */}

      {/* Modal Añadir Proyecto */}
      <AnimatePresence>
        {isCreatingProject && (
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
                  Agregar Nuevo Proyecto
                </h3>
                <button onClick={() => setIsCreatingProject(false)} className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
                  <input type="text" value={createForm.name} onChange={e => setCreateForm({...createForm, name: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea rows={3} value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologías (Variables separadas por coma)</label>
                  <input type="text" placeholder="React, Node.js, Mongo..." value={createForm.technology} onChange={e => setCreateForm({...createForm, technology: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                </div>
                <div className="flex gap-4">
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Demo</label>
                    <input type="url" placeholder="https://" value={createForm.demoUrl} onChange={e => setCreateForm({...createForm, demoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                   </div>
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Repo</label>
                    <input type="url" placeholder="https://" value={createForm.repoUrl} onChange={e => setCreateForm({...createForm, repoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                   </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsCreatingProject(false)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium">Cancel</button>
                  <button type="submit" disabled={isSubmiting} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center rounded-xl transition-colors font-medium">
                     <Save className="w-4 h-4 mr-2" />
                     {isSubmiting ? "Guardando..." : "Crear Proyecto"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Editar Proyecto */}
      <AnimatePresence>
        {editingProject && (
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
                  Editar Proyecto
                </h3>
                <button onClick={() => setEditingProject(null)} className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea rows={3} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologías (Variables separadas por coma)</label>
                  <input type="text" placeholder="React, Node.js, Mongo..." value={editForm.technology} onChange={e => setEditForm({...editForm, technology: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                </div>
                <div className="flex gap-4">
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Demo</label>
                    <input type="url" placeholder="https://" value={editForm.demoUrl} onChange={e => setEditForm({...editForm, demoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                   </div>
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Repo</label>
                    <input type="url" placeholder="https://" value={editForm.repoUrl} onChange={e => setEditForm({...editForm, repoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                   </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingProject(null)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium">Cancel</button>
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

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">Detalles del Proyecto</h3>
                <button onClick={() => setSelectedProject(null)} className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                {selectedProject.images?.[0] && (
                  <div className="w-full h-64 mb-6 rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
                    <img src={selectedProject.images[0]} alt={selectedProject.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                
                <h4 className="text-2xl font-black tracking-tight text-gray-900 mb-2">{selectedProject.name}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedProject.description}</p>

                {selectedProject.technology?.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Tecnologías</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technology.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium border border-indigo-100">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Confirmar Eliminación */}
      <AnimatePresence>
        {deletingProject && (
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eliminar Proyecto</h3>
              <p className="text-gray-500 text-sm mb-6">
                ¿Estás seguro de que deseas borrar "<strong>{deletingProject.name}</strong>"? Esta acción no se puede deshacer.
              </p>
              
              <div className="flex gap-3">
                <button onClick={() => setDeletingProject(null)} className="w-1/2 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>
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
