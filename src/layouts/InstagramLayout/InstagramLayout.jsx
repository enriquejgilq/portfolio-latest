import React, { useState, useEffect } from "react";
import { usePublicPortfolio } from "../../hooks/usePublicPortfolio";
import InstagramHeader from "./components/InstagramHeader";
import InstagramFeed from "./components/InstagramFeed";
import { 
  Instagram, 
  Search, 
  Heart, 
  PlusSquare, 
  Compass, 
  Home 
} from "lucide-react";

export default function InstagramLayout({ username }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { profile, projects, jobs, loading, error } = usePublicPortfolio(username, debouncedQuery);
  const [activeTab, setActiveTab] = useState("Publicaciones");

  // Debounce logic for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Usuario @{username} no disponible</h2>
        <p className="text-gray-500">Este perfil de Instagram no existe o es privado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-100 selection:text-pink-600">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[975px] mx-auto px-4 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-1 cursor-pointer">
            <Instagram className="w-6 h-6 text-gray-900" />
            <span className="hidden sm:block font-black italic text-xl tracking-tighter">Portafolio</span>
          </div>

          <div className="hidden sm:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-light" />
            <input 
              type="text" 
              placeholder="Buscar" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#EFEFEF] focus:outline-none rounded-lg py-2 pl-10 pr-4 text-sm w-[268px]"
            />
          </div>

          <div className="flex items-center gap-5">
            <Home className="w-6 h-6 text-gray-900 cursor-pointer" />
            <PlusSquare className="w-6 h-6 text-gray-900 cursor-pointer" />
            <Compass className="w-6 h-6 text-gray-900 cursor-pointer" />
            <Heart className="w-6 h-6 text-gray-900 cursor-pointer" />
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 cursor-pointer">
               <img src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" alt="Me" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[935px] mx-auto px-4 pt-8">
        <InstagramHeader 
           profile={profile} 
           projects={projects} 
           jobs={jobs} 
        />
        
        <InstagramFeed 
           projects={projects} 
           jobs={jobs} 
           profile={profile}
           searchQuery={searchQuery}
           activeTab={activeTab}
           setActiveTab={setActiveTab}
        />
      </main>

    </div>
  );
}
