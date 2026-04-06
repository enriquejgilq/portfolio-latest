import React from "react";
import { 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Share, 
  MoreHorizontal,
  ExternalLink,
  Code
} from "lucide-react";
import { motion } from "framer-motion";

export default function TwitterPost({ item, type, profile }) {
  // Datos comunes
  const title = type === "project" ? item.name : item.position;
  const subtitle = type === "project" ? item.description : item.company;
  const images = type === "project" ? (item.images || []) : [];
  const tech = type === "project" ? (item.technology || []) : [];
  
  // Para trabajos (jobs), manejamos la descripción como array o string
  const description = type === "job" 
    ? (Array.isArray(item.description) ? item.description.join(' ') : item.description)
    : item.description;

  return (
    <motion.article 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="flex gap-3 p-4 border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
    >
      {/* Columna Avatar */}
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
           <img 
              src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} 
              className="w-full h-full object-cover" 
              alt="User Avatar" 
           />
        </div>
      </div>

      {/* Columna Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1 min-w-0">
            <span className="font-bold text-[15px] hover:underline truncate">{profile?.name}</span>
            <span className="text-gray-500 text-[15px]">@{profile?.username}</span>
            <span className="text-gray-500 text-[15px]">·</span>
            <span className="text-gray-500 text-[15px] hover:underline">Recent</span>
          </div>
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>

        <div className="mb-2">
           <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
           <div className="text-[15px] text-gray-800 leading-normal whitespace-pre-wrap">
              {description}
           </div>
        </div>

        {/* Media (Images) */}
        {images.length > 0 && (
          <div className={`mt-3 rounded-2xl overflow-hidden border border-gray-200 grid gap-[2px] ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
             {images.slice(0, 4).map((img, idx) => (
                <div key={idx} className={`bg-gray-100 overflow-hidden ${images.length === 1 ? "aspect-auto max-h-[500px]" : "aspect-video"}`}>
                   <img src={img} className="w-full h-full object-cover" alt={`Tweet Media ${idx}`} />
                </div>
             ))}
          </div>
        )}

        {/* Technologies (Tags) */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
             {tech.map((t, idx) => (
               <span key={idx} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1">
                 <Code className="w-3 h-3" /> {t}
               </span>
             ))}
          </div>
        )}

        {/* Interaction Actions */}
        <div className="flex items-center justify-between mt-3 max-w-[425px] text-gray-500">
           <div className="group flex items-center gap-2 hover:text-blue-500 transition-colors">
              <div className="p-2 group-hover:bg-blue-50 rounded-full transition-colors"><MessageCircle className="w-[18.75px] h-[18.75px]" /></div>
              <span className="text-xs">12</span>
           </div>
           <div className="group flex items-center gap-2 hover:text-green-500 transition-colors">
              <div className="p-2 group-hover:bg-green-50 rounded-full transition-colors"><Repeat2 className="w-[18.75px] h-[18.75px]" /></div>
              <span className="text-xs">{(idx => (idx % 15) + 2)(Math.floor(Math.random()*100))}</span>
           </div>
           <div className="group flex items-center gap-2 hover:text-pink-500 transition-colors">
              <div className="p-2 group-hover:bg-pink-50 rounded-full transition-colors"><Heart className="w-[18.75px] h-[18.75px]" /></div>
              <span className="text-xs">{(idx => (idx % 80) + 10)(Math.floor(Math.random()*100))}</span>
           </div>
           <div className="group flex items-center gap-2 hover:text-blue-500 transition-colors">
              <div className="p-2 group-hover:bg-blue-50 rounded-full transition-colors"><Share className="w-[18.75px] h-[18.75px]" /></div>
           </div>
           <div className="group flex items-center gap-2 hover:text-blue-500 transition-colors">
              <div className="p-2 group-hover:bg-blue-50 rounded-full transition-colors"><ExternalLink className="w-[18.75px] h-[18.75px]" /></div>
           </div>
        </div>
      </div>
    </motion.article>
  );
}
