import { useState } from "react";
import { FolderGit2, Edit2, Trash2, Eye, Plus, X, Globe, Github, AlertTriangle, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../../../hooks/useProjects.jsx";

export default function ProjectsView() {
  const { projects, loading, addProjects, updateProject, deleteProject } = useProjects();
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState(null); 
  const [editingProject, setEditingProject] = useState(null); 
  const [deletingProject, setDeletingProject] = useState(null); 
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Forms state
  const [editForm, setEditForm] = useState({ name: "", description: "", technology: [""], images: [""], demoUrl: "", repoUrl: "" });
  const [createForm, setCreateForm] = useState({ name: "", description: "", technology: [""], images: [""], demoUrl: "", repoUrl: "" });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Handlers de Creación ---
  const handleOpenCreate = () => {
    setCreateForm({ name: "", description: "", technology: [""], images: [""], demoUrl: "", repoUrl: "" });
    setIsCreatingProject(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    
    const newBody = {
      ...createForm,
      technology: createForm.technology.filter(Boolean),
      images: createForm.images.filter(Boolean)
    };
    
    const result = await addProjects(newBody);
    if (result.success) {
      setIsCreatingProject(false);
    } else {
      alert("Error al crear: " + result.error);
    }
    setIsSubmiting(false);
  };

  // --- Handlers de Edición ---
  const handleOpenEdit = (proj) => {
    const tech = Array.isArray(proj.technology) ? proj.technology : [proj.technology || ""];
    const imgs = Array.isArray(proj.images) ? proj.images : [proj.images || ""];
    
    setEditForm({
      name: proj.name || "",
      description: proj.description || "",
      technology: tech.length > 0 ? tech : [""],
      images: imgs.length > 0 ? imgs : [""],
      demoUrl: proj.demoUrl || (proj.works?.[1] || ""),
      repoUrl: proj.repoUrl || (proj.works?.[0] || "")
    });
    setEditingProject(proj);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    
    const updatedBody = {
      ...editForm,
      technology: editForm.technology.filter(Boolean),
      images: editForm.images.filter(Boolean)
    };
    
    const result = await updateProject(editingProject._id, updatedBody);
    if (result.success) {
      setEditingProject(null);
    } else {
      alert("Error al editar: " + result.error);
    }
    setIsSubmiting(false);
  };

  // --- Handlers de Eliminación ---
  const handleDeleteConfirm = async () => {
    setIsSubmiting(true);
    const result = await deleteProject(deletingProject._id);
    if (result.success) {
      setDeletingProject(null);
    } else {
      alert("Error al eliminar: " + result.error);
    }
    setIsSubmiting(false);
  };

  // --- Lógica de Búsqueda ---
  const filteredJobs = []; // Placeholder si fuera necesario, pero ProjectsView usa projects directamente
  
  const handleCloseDetails = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Imágenes (URLs)</label>
                    <button type="button" onClick={() => setCreateForm({...createForm, images: [...createForm.images, ""]})} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 flex items-center">
                      <Plus className="w-3 h-3 mr-1" /> Añadir Imagen
                    </button>
                  </div>
                  <div className="space-y-2">
                    {createForm.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" placeholder="https://..." value={img} onChange={e => {
                          const newImgs = [...createForm.images];
                          newImgs[idx] = e.target.value;
                          setCreateForm({...createForm, images: newImgs});
                        }} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" />
                        {createForm.images.length > 1 && (
                          <button type="button" onClick={() => setCreateForm({...createForm, images: createForm.images.filter((_, i) => i !== idx)})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Tecnologías</label>
                    <button type="button" onClick={() => setCreateForm({...createForm, technology: [...createForm.technology, ""]})} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 flex items-center">
                      <Plus className="w-3 h-3 mr-1" /> Añadir Tech
                    </button>
                  </div>
                  <div className="space-y-2">
                    {createForm.technology.map((tech, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" placeholder="Ej: React" value={tech} onChange={e => {
                          const newTech = [...createForm.technology];
                          newTech[idx] = e.target.value;
                          setCreateForm({...createForm, technology: newTech});
                        }} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" />
                        {createForm.technology.length > 1 && (
                          <button type="button" onClick={() => setCreateForm({...createForm, technology: createForm.technology.filter((_, i) => i !== idx)})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Demo</label>
                    <input type="text" placeholder="https://" value={createForm.demoUrl} onChange={e => setCreateForm({...createForm, demoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                   </div>
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Repo</label>
                    <input type="text" placeholder="https://" value={createForm.repoUrl} onChange={e => setCreateForm({...createForm, repoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Imágenes (URLs)</label>
                    <button type="button" onClick={() => setEditForm({...editForm, images: [...editForm.images, ""]})} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 flex items-center">
                      <Plus className="w-3 h-3 mr-1" /> Añadir Imagen
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editForm.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" value={img} onChange={e => {
                          const newImgs = [...editForm.images];
                          newImgs[idx] = e.target.value;
                          setEditForm({...editForm, images: newImgs});
                        }} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" />
                        {editForm.images.length > 1 && (
                          <button type="button" onClick={() => setEditForm({...editForm, images: editForm.images.filter((_, i) => i !== idx)})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Tecnologías</label>
                    <button type="button" onClick={() => setEditForm({...editForm, technology: [...editForm.technology, ""]})} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 flex items-center">
                      <Plus className="w-3 h-3 mr-1" /> Añadir Tech
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editForm.technology.map((tech, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" value={tech} onChange={e => {
                          const newTech = [...editForm.technology];
                          newTech[idx] = e.target.value;
                          setEditForm({...editForm, technology: newTech});
                        }} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border text-sm" />
                        {editForm.technology.length > 1 && (
                          <button type="button" onClick={() => setEditForm({...editForm, technology: editForm.technology.filter((_, i) => i !== idx)})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Demo</label>
                    <input type="text" placeholder="https://" value={editForm.demoUrl} onChange={e => setEditForm({...editForm, demoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
                   </div>
                   <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Repo</label>
                    <input type="text" placeholder="https://" value={editForm.repoUrl} onChange={e => setEditForm({...editForm, repoUrl: e.target.value})} className="w-full border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white p-2 border" />
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
                <button onClick={handleCloseDetails} className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                {selectedProject.images?.length > 0 && (
                  <div className="relative mb-8 group">
                    <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={selectedProject.images[currentImageIndex]}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                      
                      {selectedProject.images.length > 1 && (
                        <>
                          <button 
                            onClick={() => setCurrentImageIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-800 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                          </button>
                          <button 
                            onClick={() => setCurrentImageIndex(prev => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-800 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                          </button>
                        </>
                      )}
                    </div>
                    
                    {selectedProject.images.length > 1 && (
                      <div className="flex justify-center mt-3 gap-1.5">
                        {selectedProject.images.map((_, i) => (
                           <button 
                            key={i} 
                            onClick={() => setCurrentImageIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? "w-6 bg-blue-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
                           />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                <h4 className="text-2xl font-black tracking-tight text-gray-900 mb-2">{selectedProject.name}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 italic">{selectedProject.description}</p>

                {selectedProject.technology?.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center">
                       <span className="w-6 h-[2px] bg-blue-500 mr-2"></span>
                       Tecnologías
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technology.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-blue-700 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {(selectedProject.works?.[1] || selectedProject.demoUrl) && (
                    <a 
                      href={selectedProject.works?.[1] || selectedProject.demoUrl} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                      <Globe className="w-4 h-4 mr-2" /> Demo en Vivo
                    </a>
                  )}
                  {(selectedProject.works?.[0] || selectedProject.repoUrl) && (
                    <a 
                      href={selectedProject.works?.[0] || selectedProject.repoUrl} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200"
                    >
                      <Github className="w-4 h-4 mr-2" /> Repositorio
                    </a>
                  )}
                </div>
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
