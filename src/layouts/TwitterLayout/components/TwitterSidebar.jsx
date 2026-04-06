import React from "react";
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User, 
  CircleEllipsis, 
  Feather,
  Hash
} from "lucide-react";

export default function TwitterSidebar({ profile }) {
  const menuItems = [
    { icon: <Home className="w-7 h-7" />, label: "Inicio", active: true },
    { icon: <Hash className="w-7 h-7" />, label: "Explorar" },
    { icon: <Bell className="w-7 h-7" />, label: "Notificaciones" },
    { icon: <Mail className="w-7 h-7" />, label: "Mensajes" },
    { icon: <User className="w-7 h-7" />, label: "Perfil" },
    { icon: <CircleEllipsis className="w-7 h-7" />, label: "Más opciones" },
  ];

  return (
    <div className="flex flex-col h-screen sticky top-0 py-2 px-4 w-full max-w-[275px] items-end xl:items-start ml-auto">
      {/* Twitter/Project Logo */}
      <div className="p-3 hover:bg-gray-100 rounded-full w-fit cursor-pointer transition-colors mb-2">
         <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xl">
           {profile?.username?.charAt(0).toUpperCase() || "P"}
         </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-4 w-full">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-full w-fit transition-colors cursor-pointer group"
          >
            <div className={item.active ? "text-black" : "text-gray-900"}>
              {item.icon}
            </div>
            <span className={`text-xl hidden xl:block ${item.active ? "font-bold" : "font-medium"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Post Button (Aesthetic) */}
      <button className="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold py-4 px-8 rounded-full w-[50px] h-[50px] xl:w-full flex items-center justify-center transition-colors shadow-sm">
        <span className="hidden xl:block text-[17px]">Postear</span>
        <Feather className="w-6 h-6 xl:hidden" />
      </button>

      {/* Profile Mini Card */}
      <div className="mt-auto mb-4 p-3 hover:bg-gray-100 rounded-full flex items-center justify-between cursor-pointer transition-colors w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img 
              src={profile?.imgLogo || `https://ui-avatars.com/api/?name=${profile?.username}`} 
              className="w-full h-full object-cover" 
              alt="Avatar" 
            />
          </div>
          <div className="hidden xl:block">
            <p className="font-bold text-[15px] leading-tight line-clamp-1">{profile?.name}</p>
            <p className="text-gray-500 text-[15px]">@{profile?.username}</p>
          </div>
        </div>
        <CircleEllipsis className="w-5 h-5 hidden xl:block text-gray-700" />
      </div>
    </div>
  );
}
