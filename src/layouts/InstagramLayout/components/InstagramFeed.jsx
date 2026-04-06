import React, { useState } from "react";
import { 
  Grid, 
  Bookmark, 
  UserSquare2, 
  Heart, 
  MessageCircle, 
  Camera,
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import InstagramPostModal from "./InstagramPostModal";

export default function InstagramFeed({ projects, jobs, profile, searchQuery, activeTab, setActiveTab }) {
  const [selectedItem, setSelectedItem] = useState(null);

  // Los trabajos (Jobs) los filtramos localmente para el buscador
  const filteredJobs = (jobs || []).filter(j => 
    j.position.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Extraer todas las imágenes de proyectos para el grid principal
  const allProjectImages = (projects || []).flatMap(p => 
    (p.images || []).map(img => ({ ...p, url: img, projectName: p.name, projectId: p._id }))
  );

  const hasResults = (projects?.length > 0) || (filteredJobs.length > 0);

  const tabs = [
    { id: "Publicaciones", icon: <Grid className="w-3.5 h-3.5" />, label: "PUBLICACIONES" },
    { id: "Proyectos", icon: <Bookmark className="w-3.5 h-3.5" />, label: "PROYECTOS" },
    { id: "Trabajos", icon: <UserSquare2 className="w-3.5 h-3.5" />, label: "TRABAJOS" }
  ];

  return (
    <div className="flex flex-col w-full max-w-[935px] mx-auto border-t border-gray-200">
      {/* Tab Navigation Icons */}
      <div className="flex justify-center gap-14 md:gap-20 -mt-[1px]">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 py-4 border-t transition-all ${
              activeTab === tab.id 
                ? "border-black text-black" 
                : "border-transparent text-gray-500"
            }`}
          >
            <div className={`transition-colors ${activeTab === tab.id ? "text-black" : "text-gray-400"}`}>
              {tab.icon}
            </div>
            <span className="text-[12px] font-bold tracking-widest hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-3 gap-1 md:gap-7 pb-10">
        {activeTab === "Publicaciones" && (
           allProjectImages.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedItem(img)}
                className="aspect-square bg-gray-100 group relative cursor-pointer overflow-hidden rounded-sm"
              >
                 <img src={img.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Post ${idx}`} />
                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-1.5"><Heart className="w-6 h-6 fill-white" /> 12</div>
                    <div className="flex items-center gap-1.5"><MessageCircle className="w-6 h-6 fill-white" /> 4</div>
                 </div>
              </motion.div>
           ))
        )}

        {activeTab === "Proyectos" && (
           projects.map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedItem(p)}
                className="aspect-square bg-gray-100 group relative cursor-pointer overflow-hidden rounded-sm"
              >
                 <img src={p.images?.[0] || "https://ui-avatars.com/api/?name=" + p.name} className="w-full h-full object-cover" alt={`Project ${idx}`} />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-white text-[10px] font-bold tracking-widest mb-1 uppercase">Proyecto</span>
                    <p className="text-white text-xs font-medium line-clamp-2">{p.name}</p>
                 </div>
              </motion.div>
           ))
        )}

        {activeTab === "Trabajos" && (
           filteredJobs.map((j, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedItem(j)}
                className="aspect-square bg-blue-50/50 group relative cursor-pointer overflow-hidden rounded-sm border border-gray-100"
              >
                 <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                       <UserSquare2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-gray-900 text-[10px] font-bold tracking-widest uppercase">{j.company}</p>
                    <p className="text-gray-600 text-[10px] font-medium">{j.position}</p>
                 </div>
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold px-3 py-1.5 border border-white rounded-full">Ver detalles</span>
                 </div>
              </motion.div>
           ))
        )}
      </div>

      {/* Post Modal */}
      <InstagramPostModal 
        item={selectedItem} 
        profile={profile} 
        onClose={() => setSelectedItem(null)} 
      />

      {/* Empty State */}
      {!hasResults && searchQuery ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center">
             <Search className="w-8 h-8 text-gray-200" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No se encontraron resultados</h3>
          <p className="text-gray-500 max-w-xs">No hay coincidencias para "{searchQuery}" en este perfil.</p>
        </div>
      ) : (
        ((activeTab === "Publicaciones" && allProjectImages.length === 0) ||
        (activeTab === "Proyectos" && projects.length === 0) ||
        (activeTab === "Trabajos" && filteredJobs.length === 0)) && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="w-16 h-16 rounded-full border-2 border-gray-900 flex items-center justify-center">
             <Camera className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter">Comparte momentos</h3>
          <p className="text-gray-500 max-w-xs">Aún no hay contenido en esta categoría.</p>
        </div>
        )
      )}
    </div>
  );
}
