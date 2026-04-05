import FacebookPost from "./FacebookPost";
import { Search, Info, Link, User, ArrowRight } from "lucide-react";

export default function FacebookFeed({ projects, jobs, profile, searchQuery, activeTab }) {
  // Los proyectos YA vienen filtrados desde el hook usePublicPortfolio vía API
  const filteredProjects = projects;

  // Los trabajos (Jobs) los seguimos filtrando localmente por ahora
  const filteredJobs = jobs.filter(j => 
    j.position.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(j.description) ? j.description.join(' ') : j.description).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determinar qué renderizar según la pestaña activa
  const showProjects = activeTab === "Publicaciones" || activeTab === "Proyectos";
  const showJobs = activeTab === "Publicaciones" || activeTab === "Trabajos";
  const showInfo = activeTab === "Información";
  const showPhotos = activeTab === "Fotos";

  // Extraer todas las fotos de todos los proyectos
  const allProjectImages = (projects || []).flatMap(p => 
    (p.images || []).map(img => ({ url: img, projectName: p.name, projectId: p._id }))
  );

  const hasResults = (showProjects && filteredProjects.length > 0) || (showJobs && filteredJobs.length > 0) || showInfo || (showPhotos && allProjectImages.length > 0);

  return (
    <div className="flex-1 max-w-[680px] w-full flex flex-col gap-4">
      {/* Fotos Tab Content (Galería Unificada) */}
      {showPhotos && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Fotos</h3>
            <span className="text-sm text-gray-500 font-medium">{allProjectImages.length} fotos encontradas</span>
          </div>

          {!allProjectImages.length ? (
            <div className="text-center py-10 text-gray-400">
               <p>Aún no hay fotos cargadas en los proyectos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allProjectImages.map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer border border-gray-100">
                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Project ${idx}`} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">Proyecto</p>
                    <p className="text-white text-xs font-medium line-clamp-2">{img.projectName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Información Tab Content */}
      {showInfo && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Información</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"><User className="w-6 h-6" /></div>
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Biografía</p>
                  <p className="text-gray-800 font-medium">{profile?.bio || "No hay biografía disponible."}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile?.socialMedia?.github && (
                 <a href={profile.socialMedia.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-slate-100 transition-all border border-gray-100 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white"><Link className="w-4 h-4" /></div>
                       <span className="font-bold text-gray-700">GitHub</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                 </a>
              )}
              {profile?.socialMedia?.linkedin && (
                 <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all border border-gray-100 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Link className="w-4 h-4" /></div>
                       <span className="font-bold text-gray-700">LinkedIn</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                 </a>
              )}
              {profile?.socialMedia?.twitter && (
                 <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-sky-50 transition-all border border-gray-100 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white"><Link className="w-4 h-4" /></div>
                       <span className="font-bold text-gray-700">Twitter / X</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                 </a>
              )}
              {profile?.socialMedia?.instagram && (
                 <a href={profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-all border border-gray-100 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white"><Link className="w-4 h-4" /></div>
                       <span className="font-bold text-gray-700">Instagram</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                 </a>
              )}
              {profile?.socialMedia?.facebook && (
                 <a href={profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all border border-gray-100 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white"><Link className="w-4 h-4" /></div>
                       <span className="font-bold text-gray-700">Facebook</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                 </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Default Feed Layout (Posts) */}
      {!showInfo && (
        <>
          {/* Create Post Placeholder (Aesthetic) - Solo en Publicaciones */}
          {activeTab === "Publicaciones" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <img src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-10 h-10 rounded-full border border-gray-100" alt="Me" />
                <div className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-gray-500 text-sm hover:bg-gray-200 cursor-pointer">
                  ¿Qué estás pensando, {profile?.name?.split(' ')[0]}?
                </div>
              </div>
            </div>
          )}

          {!hasResults ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-bold">No se encontraron resultados para "{searchQuery}"</p>
            </div>
          ) : (
            <>
              {showProjects && filteredProjects.map((project, idx) => (
                <FacebookPost key={`p-${project._id || idx}`} item={project} type="project" profile={profile} />
              ))}
              {showJobs && filteredJobs.map((job, idx) => (
                <FacebookPost key={`j-${job._id || idx}`} item={job} type="job" profile={profile} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
