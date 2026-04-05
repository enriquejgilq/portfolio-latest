import { useState } from "react";
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Globe, Briefcase, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FacebookPost({ item, type, profile }) {
  const [liked, setLiked] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  // Determinar datos según tipo (Proyecto o Experiencia)
  const title = type === 'project' ? item.name : item.position;
  const subtitle = type === 'project' ? item.technology?.join(' • ') : `${item.company} • ${item.typePosition}`;
  const dateStr = type === 'job' ? `${new Date(item.startDate).getFullYear()} - ${item.endDate ? new Date(item.endDate).getFullYear() : 'Actualidad'}` : "Hace un momento";
  
  const images = type === 'project' ? item.images : [];
  const description = type === 'job' 
    ? (Array.isArray(item.description) ? item.description.join(' ') : item.description) 
    : item.description;

  const handleNext = () => setCurrentImg(p => (p + 1) % images.length);
  const handlePrev = () => setCurrentImg(p => (p === 0 ? images.length - 1 : p - 1));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 overflow-hidden">
            {profile?.imgLogo ? (
              <img src={profile.imgLogo} alt="User" className="w-full h-full object-cover" />
            ) : (
              <Globe className="w-5 h-5 text-blue-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 hover:underline cursor-pointer">{profile?.username || ""}</span>
              <span className="text-gray-500 text-sm flex items-center gap-1">• <Globe className="w-3 h-3" /></span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Publicado {dateStr}</p>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-2 space-y-3">
        <div className="flex items-start gap-2">
           <div className="mt-1 p-1 bg-gray-50 rounded-lg">
             {type === 'job' ? <Briefcase className="w-4 h-4 text-amber-600" /> : <Rocket className="w-4 h-4 text-blue-600" />}
           </div>
           <div>
             <h4 className="font-bold text-gray-900 leading-tight">{title}</h4>
             {subtitle && <p className="text-xs text-blue-600 font-bold uppercase tracking-tight">{subtitle}</p>}
           </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{description}</p>
      </div>

      {/* Media (Carrusel) */}
      {images?.length > 0 && (
        <div className="relative group bg-gray-900 flex items-center justify-center max-h-[500px] overflow-hidden aspect-[1.91/1]">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImg}
              src={images[currentImg]} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-h-[500px] w-full object-contain"
              alt="Preview"
            />
          </AnimatePresence>
          
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-[10px] font-bold">
                {currentImg + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Actions (Aesthetic) */}
      <div className="px-4 py-1 border-t border-gray-100 flex items-center justify-between mt-2">
         <div className="flex items-center gap-1 text-gray-500 text-xs">
           <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white text-[8px]"><ThumbsUp fill="white" className="w-2.5 h-2.5" /></div>
           <span className="font-medium">12 likes</span>
         </div>
      </div>

      <div className="px-4 py-1 border-t border-gray-100 flex items-center gap-1 mb-1 mx-2">
        <button 
          onClick={() => setLiked(!liked)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-colors ${liked ? 'text-sky-500' : 'text-gray-600'}`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-sky-500' : ''}`} />
          <span className="text-sm font-bold">Me gusta</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-bold">Comentar</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-bold">Compartir</span>
        </button>
      </div>
    </motion.div>
  );
}
