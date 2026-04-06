import React from "react";
import { Search, MoreHorizontal, Settings, CheckCircle2 } from "lucide-react";

export default function TwitterWidgets({ profile, projects, searchQuery, setSearchQuery }) {
  // Extraer tecnologías únicas como "Tendencias"
  const allTech = projects?.flatMap(p => p.technology || []) || [];
  const uniqueTech = [...new Set(allTech)].slice(0, 5);

  const socialProfiles = [
    { name: "GitHub", handle: "@github", url: profile?.socialMedia?.github },
    { name: "LinkedIn", handle: "@linkedin", url: profile?.socialMedia?.linkedin },
    { name: "Instagram", handle: "@instagram", url: profile?.socialMedia?.instagram }
  ].filter(p => p.url);

  return (
    <div className="hidden lg:flex flex-col gap-4 w-[350px] sticky top-0 h-screen py-2 px-4 ml-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md pt-0.5 pb-2">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18.25px] h-[18.25px] text-gray-400 group-focus-within:text-[#1D9BF0] transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 border border-transparent focus:border-[#1D9BF0] focus:bg-white focus:outline-none rounded-full py-3 pl-14 pr-4 text-[15px] transition-all"
          />
        </div>
      </div>

      {/* Qué está pasando (Tendencias) */}
      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-xl font-black text-gray-900 leading-tight">Qué está pasando</h3>
          <Settings className="w-5 h-5 text-gray-700 cursor-pointer" />
        </div>
        
        <div className="flex flex-col">
          {uniqueTech.map((tech, idx) => (
             <div key={idx} className="px-4 py-3 hover:bg-gray-200/50 cursor-pointer transition-colors group">
                <div className="flex justify-between items-start">
                   <span className="text-[13px] text-gray-500">Tendencia en {tech}</span>
                   <MoreHorizontal className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                </div>
                <p className="font-bold text-[15px] text-gray-900">#Portafolio{tech}</p>
                <span className="text-[13px] text-gray-500">{(idx + 1) * 3}k Posts</span>
             </div>
          ))}
          <div className="px-4 py-4 hover:bg-gray-200/50 cursor-pointer transition-colors text-blue-500 text-[15px]">Mostrar más</div>
        </div>
      </div>

      {/* A quién seguir (Redes Sociales) */}
      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 leading-tight px-4 py-3">A quién seguir</h3>
        
        <div className="flex flex-col">
          {socialProfiles.map((social, idx) => (
             <div key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-gray-200/50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${social.name}`} className="w-full h-full object-cover" alt="S" />
                   </div>
                   <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[15px] hover:underline">{social.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-white fill-[#1D9BF0]" />
                      </div>
                      <span className="text-gray-500 text-sm leading-tight">{social.handle}</span>
                   </div>
                </div>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="bg-black text-white hover:bg-black/90 font-bold px-4 py-1.5 rounded-full text-sm transition-colors">Seguir</a>
             </div>
          ))}
          <div className="px-4 py-4 hover:bg-gray-200/50 cursor-pointer transition-colors text-blue-500 text-[15px]">Mostrar más</div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 text-[13px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
         <span className="hover:underline cursor-pointer">Condiciones de Servicio</span>
         <span className="hover:underline cursor-pointer">Política de Privacidad</span>
         <span className="hover:underline cursor-pointer">Política de cookies</span>
         <span className="hover:underline cursor-pointer">Accesibilidad</span>
         <span className="hover:underline cursor-pointer">Información de anuncios</span>
         <span className="hover:underline cursor-pointer">© 2026 Portafolio Corp.</span>
      </div>
    </div>
  );
}
