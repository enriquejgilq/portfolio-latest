import React from "react";
import { 
  Settings, 
  Grid, 
  Tv, 
  Bookmark, 
  UserSquare2,
  ExternalLink,
  ChevronDown
} from "lucide-react";

export default function InstagramHeader({ profile, projects, jobs }) {
  const stats = [
    { label: "Publicaciones", value: projects?.length || 0 },
    { label: "Proyectos", value: projects?.length || 0 },
    { label: "Trabajos", value: jobs?.length || 0 }
  ];

  return (
    <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-20 mb-12 py-4">
      {/* Avatar Section */}
      <div className="shrink-0">
        <div className="w-[150px] h-[150px] rounded-full p-1 border-2 border-gray-200 cursor-pointer overflow-hidden bg-gray-50 flex items-center justify-center">
          <img 
            src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} 
            className="w-full h-full rounded-full object-cover border-[3px] border-white" 
            alt="Avatar" 
          />
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="flex-1 flex flex-col items-center md:items-start gap-5">
        
        {/* Row 1: Username & Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h2 className="text-xl font-normal text-gray-800 tracking-tight">{profile?.username}</h2>
          <div className="flex gap-2">
            <button className="bg-[#EFEFEF] hover:bg-[#DBDBDB] text-black font-semibold px-4 py-1.5 rounded-lg text-sm transition-colors">
              Editar perfil
            </button>
            <button className="bg-[#EFEFEF] hover:bg-[#DBDBDB] text-black font-semibold px-4 py-1.5 rounded-lg text-sm transition-colors">
              Ver archivo
            </button>
            <Settings className="w-6 h-6 text-gray-800 cursor-pointer p-1" />
          </div>
        </div>

        {/* Row 2: Stats */}
        <div className="flex gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex gap-1 text-[16px]">
              <span className="font-bold">{stat.value}</span>
              <span className="font-normal text-gray-900">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Row 3: Bio */}
        <div className="text-[14px] flex flex-col gap-1 items-center md:items-start">
          <h1 className="font-bold text-gray-900">{profile?.name}</h1>
          <p className="text-gray-900 font-normal leading-relaxed whitespace-pre-wrap">{profile?.bio}</p>
          {jobs && jobs.length > 0 && (() => {
            const latestJob = [...jobs].sort((a, b) => {
              if (a.endDate === null && b.endDate !== null) return -1;
              if (a.endDate !== null && b.endDate === null) return 1;
              return new Date(b.startDate) - new Date(a.startDate);
            })[0];
            return (
              <div className="flex items-center gap-1 text-[#00376B] font-bold">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{latestJob.company} - {latestJob.position}</span>
              </div>
            );
          })()}
        </div>
      </div>
    </header>
  );
}
