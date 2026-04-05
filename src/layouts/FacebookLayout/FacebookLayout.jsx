import { useState, useEffect } from "react";
import { usePublicPortfolio } from "../../hooks/usePublicPortfolio";
import FacebookHeader from "./components/FacebookHeader";
import FacebookSidebar from "./components/FacebookSidebar";
import FacebookFeed from "./components/FacebookFeed";
import { Camera, MapPin, Briefcase, Globe, UserPlus, MessageCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function FacebookLayout({ username }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { profile, projects, jobs, loading, error } = usePublicPortfolio(username, debouncedQuery);
  const [activeTab, setActiveTab] = useState("Publicaciones");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-gray-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
             <span className="text-4xl text-red-500">?</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil No Encontrado</h2>
          <p className="text-gray-500 mb-6 font-medium">El usuario "{username}" no existe o su perfil es privado.</p>
          <a href="/login" className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Ir al Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-10 font-sans">
      <FacebookHeader profile={profile} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="pt-14 max-w-[1250px] mx-auto">
        {/* Cover Section */}
        <section className="bg-white shadow-sm rounded-b-xl overflow-hidden mb-4">
          <div className="h-[250px] md:h-[400px] w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-500 relative">
            <button className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md hover:bg-white transition-colors">
              <Camera className="w-4 h-4" /> Editar Portada
            </button>
          </div>
          
          <div className="px-10 pb-6">
            <div className="flex flex-col md:flex-row items-end -mt-10 md:-mt-24 mb-6 gap-4">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[5px] border-white shadow-lg overflow-hidden bg-gray-50 shrink-0 relative group">
                 <img src={profile.imgLogo || "https://ui-avatars.com/api/?name=" + profile.username} className="w-full h-full object-cover" alt="Profile" />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                 </div>
              </div>
              <div className="flex-1 pb-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{profile.name}</h1>
                <p className="text-gray-500 font-bold mt-1 text-sm md:text-base">{profile.name} • @{profile.username}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-500 text-sm font-medium">
                   <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location || "Remoto"}</div>
                   <div className="flex items-center gap-1 font-bold text-blue-600 hover:underline cursor-pointer"><Globe className="w-4 h-4" /> misitio.com</div>
                </div>
              </div>
              <div className="flex items-center gap-2 pb-4">
                <button className="bg-blue-600 px-4 py-2 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                  <UserPlus className="w-4 h-4" /> Agregar Contacto
                </button>
                <button className="bg-gray-100 px-4 py-2 text-gray-800 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-4 h-4" /> Mensaje
                </button>
                <button className="bg-gray-100 p-2 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="h-[1px] bg-gray-200 mb-2"></div>
            
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
               {['Publicaciones', 'Proyectos', 'Trabajos', 'Fotos', 'Información'].map((tab, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 font-bold text-sm tracking-tight border-b-[3px] transition-all ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:bg-gray-100 rounded-lg"}`}
                  >
                    {tab}
                  </button>
               ))}
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4 lg:px-0">
           <FacebookSidebar profile={profile} projects={projects} />
           <FacebookFeed 
              projects={projects} 
              jobs={jobs} 
              profile={profile} 
              searchQuery={searchQuery} 
              activeTab={activeTab} 
           />
        </div>
      </main>
    </div>
  );
}
