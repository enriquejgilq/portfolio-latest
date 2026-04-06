import React, { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Mail,
  Search
} from "lucide-react";
import TwitterPost from "./TwitterPost";
import { motion } from "framer-motion";

export default function TwitterFeed({ projects, jobs, profile, searchQuery, activeTab, setActiveTab }) {
  // Filtrado simplificado para el feed central
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.technology?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredJobs = jobs.filter(j => 
    j.position.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = ["Proyectos", "Trabajos", "Fotos"];
  
  // Extraer todas las fotos para la galería
  const allProjectImages = (projects || []).flatMap(p => 
    (p.images || []).map(img => ({ url: img, projectName: p.name, projectId: p._id }))
  );

  return (
    <div className="flex-1 max-w-[600px] min-h-screen border-x border-gray-100 pb-10 bg-white min-w-0">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-1.5 flex items-center gap-6">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">{profile?.name}</h2>
          <p className="text-gray-500 text-xs">{(projects?.length || 0) + (jobs?.length || 0)} Posts</p>
        </div>
      </header>

      {/* Profile Info */}
      <section className="relative group">
        {/* Banner */}
        <div className="h-[200px] w-full bg-gradient-to-r from-[#1D9BF0] via-[#0D87DA] to-[#2F4F7F] overflow-hidden">
          {/* Placeholder o futura imagen de portada en BD */}
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-12 md:-mt-16 mb-4 relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[4px] border-white overflow-hidden bg-gray-50 shadow-sm relative group">
               <img src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <button className="mt-14 md:mt-18 border border-gray-300 px-4 py-1.5 rounded-full font-bold text-[15px] hover:bg-gray-100 transition-colors">
              Editar perfil
            </button>
          </div>

          <div className="mb-4">
            <h1 className="text-xl font-black text-gray-900 leading-tight">{profile?.name}</h1>
            <p className="text-gray-500 text-[15px] mb-3">@{profile?.username}</p>
            <p className="text-[15px] text-gray-800 leading-relaxed mb-3 whitespace-pre-wrap">{profile?.bio}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-[15px] mb-3">
              <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile?.location || "Remoto"}</div>
              {jobs && jobs.length > 0 && (() => {
                const latestJob = [...jobs].sort((a, b) => {
                  if (a.endDate === null && b.endDate !== null) return -1;
                  if (a.endDate !== null && b.endDate === null) return 1;
                  return new Date(b.startDate) - new Date(a.startDate);
                })[0];
                return (
                  <div className="flex items-center gap-1 text-[#1D9BF0] font-bold">
                    <LinkIcon className="w-4 h-4" /> {latestJob.company} - {latestJob.position}
                  </div>
                );
              })()}
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Se unió recientemente</div>
            </div>

            <div className="flex items-center gap-4 text-[15px]">
               <div className="hover:underline cursor-pointer"><span className="font-bold text-gray-900">{projects?.length || 0}</span> <span className="text-gray-500">Proyectos</span></div>
               <div className="hover:underline cursor-pointer"><span className="font-bold text-gray-900">{jobs?.length || 0}</span> <span className="text-gray-500">Trabajos</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
          {["Publicaciones", ...tabs].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className="flex-1 min-w-[100px] pt-4 pb-4 px-4 hover:bg-gray-100/50 transition-colors relative flex flex-col items-center group"
            >
              <span className={`text-[15px] ${activeTab === tab ? "font-bold text-gray-900" : "font-medium text-gray-500"}`}>
                {tab}
              </span>
              {activeTab === tab && (
                <div className="absolute bottom-0 w-max self-center min-w-[56px] h-[4px] bg-[#1D9BF0] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Feed Content */}
      <main className="min-h-screen">
        {activeTab === "Publicaciones" && (
          <>
            {filteredProjects.map((p, idx) => (
              <TwitterPost key={`p-${p._id || idx}`} item={p} type="project" profile={profile} />
            ))}
            {filteredJobs.map((j, idx) => (
              <TwitterPost key={`j-${j._id || idx}`} item={j} type="job" profile={profile} />
            ))}
          </>
        )}

        {activeTab === "Proyectos" && (
          filteredProjects.map((p, idx) => (
            <TwitterPost key={`p-${p._id || idx}`} item={p} type="project" profile={profile} />
          ))
        )}

        {activeTab === "Trabajos" && (
          filteredJobs.map((j, idx) => (
            <TwitterPost key={`j-${j._id || idx}`} item={j} type="job" profile={profile} />
          ))
        )}

        {activeTab === "Fotos" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 pt-0.5 px-0.5">
            {allProjectImages.map((img, idx) => (
               <div key={idx} className="aspect-square bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer overflow-hidden border-[0.5px] border-white">
                  <img src={img.url} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
               </div>
            ))}
          </div>
        )}

        {((activeTab === "Publicaciones" && filteredProjects.length === 0 && filteredJobs.length === 0) ||
          (activeTab === "Proyectos" && filteredProjects.length === 0) ||
          (activeTab === "Trabajos" && filteredJobs.length === 0) ||
          (activeTab === "Fotos" && allProjectImages.length === 0)) && (
          <div className="p-10 text-center space-y-2 border-t border-gray-100">
            {searchQuery ? (
               <>
                 <h3 className="text-xl font-bold text-gray-900">No hay resultados</h3>
                 <p className="text-gray-500">No se encontraron coincidencias para "{searchQuery}" en este perfil.</p>
               </>
            ) : (
               <>
                 <h3 className="text-xl font-bold text-gray-900">Nada que mostrar</h3>
                 <p className="text-gray-500">Todavía no hay contenido publicado en esta categoría.</p>
               </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
