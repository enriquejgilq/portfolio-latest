import React from "react";
import { 
  X, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstagramPostModal({ item, profile, onClose }) {
  if (!item) return null;

  const title = item.name || item.position;
  const company = item.company || "";
  const images = item.images || [];
  const description = Array.isArray(item.description) 
    ? item.description.join('\n') 
    : item.description;
  const tech = item.technology || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 lg:p-20 overflow-hidden">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-[1200px] max-h-full relative z-10 shadow-2xl"
        >
          {/* Close Button Top Right (Mobile/Tablet) */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:-right-12 md:top-0 text-white hover:text-gray-300 z-50 p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Left Column: Media Section */}
          <div className="bg-black flex-1 flex items-center justify-center relative min-h-[300px] md:min-h-0">
             {images.length > 0 ? (
               <div className="w-full h-full">
                  <img src={images[0]} className="w-full h-full object-contain" alt="Post view" />
                  {images.length > 1 && (
                     <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <button className="bg-white/20 p-2 rounded-full backdrop-blur-md pointer-events-auto hover:bg-white/40"><ChevronLeft className="text-white" /></button>
                        <button className="bg-white/20 p-2 rounded-full backdrop-blur-md pointer-events-auto hover:bg-white/40"><ChevronRight className="text-white" /></button>
                     </div>
                  )}
               </div>
             ) : (
                <div className="text-white flex flex-col items-center gap-3">
                   <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center"><ExternalLink className="w-8 h-8 opacity-40" /></div>
                   <span className="text-gray-500 font-bold tracking-widest text-xs uppercase">{item.company || "Proyecto"}</span>
                </div>
             )}
          </div>

          {/* Right Column: Info Section */}
          <div className="w-full md:w-[450px] flex flex-col bg-white overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden shrink-0">
                     <img src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <div className="flex flex-col">
                     <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-gray-900 hover:underline cursor-pointer">{profile?.username}</span>
                        <span className="text-blue-500 font-bold text-xs uppercase tracking-tighter">Siguiendo</span>
                     </div>
                     <span className="text-xs text-gray-500">{item.location || "Remoto"}</span>
                  </div>
               </div>
               <MoreHorizontal className="w-5 h-5 text-gray-800 cursor-pointer" />
            </div>

            {/* Content Body */}
            <div className="flex-1 p-4 space-y-4">
               {/* Description */}
               <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                     <img src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <div className="text-[14px]">
                     <span className="font-bold mr-2">{profile?.username}</span>
                     <span className="text-gray-800 whitespace-pre-wrap">{description}</span>
                     
                     {/* Tech Tags as Hashtags */}
                     {tech.length > 0 && (
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-4">
                           {tech.map((t, idx) => (
                             <span key={idx} className="text-[#00376B] font-medium hover:underline cursor-pointer">#{t}</span>
                           ))}
                           <span className="text-[#00376B] font-medium">#portafolio</span>
                           <span className="text-[#00376B] font-medium">#desarrollo</span>
                        </div>
                     )}

                     <div className="mt-4 flex items-center gap-4 text-gray-500 text-xs">
                        <span>18 h</span>
                        <span className="font-bold cursor-pointer">Ver traducción</span>
                     </div>
                  </div>
               </div>

               {/* Stats / Interactions (Aesthetic) */}
               <div className="pt-2 border-t border-gray-100 mt-auto sticky bottom-0 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4">
                        <Heart className="w-6 h-6 text-gray-800 hover:text-gray-400 cursor-pointer" />
                        <MessageCircle className="w-6 h-6 text-gray-800 hover:text-gray-400 cursor-pointer" />
                        <Send className="w-6 h-6 text-gray-800 hover:text-gray-400 cursor-pointer" />
                     </div>
                     <Bookmark className="w-6 h-6 text-gray-800 hover:text-gray-400 cursor-pointer" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="font-bold text-[14px]">1.245 Me gusta</span>
                     <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Hace 18 horas</span>
                  </div>
               </div>
            </div>

            {/* Post a Comment (Aesthetic) */}
            <div className="p-4 border-t border-gray-100 flex items-center gap-3">
               <span className="text-2xl opacity-40">😊</span>
               <input type="text" placeholder="Añadir un comentario..." className="flex-1 text-[14px] bg-transparent focus:outline-none" />
               <button className="text-blue-500 font-bold text-[14px] opacity-40">Publicar</button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
