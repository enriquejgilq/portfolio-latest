import { Search, Home, Users, Monitor, Bell, MessageCircle, Menu } from "lucide-react";

export default function FacebookHeader({ profile, searchQuery, setSearchQuery }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
      {/* Brand & Search */}
      <div className="flex items-center gap-2 flex-1">
        <div className="w-10 h-10 bg-[#0866FF] rounded-full flex items-center justify-center text-white font-bold text-2xl">
          {profile?.username.charAt(0).toUpperCase() || "P"}
        </div>
        <div className="relative max-w-[240px] w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar en el portafolio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Navigation (Aesthetic) */}
      <nav className="hidden lg:flex items-center justify-center gap-2 flex-1 h-full">
        <div className="h-full border-b-[3px] border-[#0866FF] px-10 flex items-center cursor-pointer">
          <Home className="w-6 h-6 text-[#0866FF]" />
        </div>
        <div className="h-full px-10 flex items-center cursor-pointer hover:bg-gray-100 rounded-lg">
          <Monitor className="w-6 h-6 text-gray-500" />
        </div>
        <div className="h-full px-10 flex items-center cursor-pointer hover:bg-gray-100 rounded-lg">
          <Users className="w-6 h-6 text-gray-500" />
        </div>
      </nav>

      {/* User Controls */}
      <div className="flex items-center justify-end gap-2 flex-1">
        <div className="hidden sm:flex items-center gap-1 hover:bg-gray-100 p-1 pr-3 rounded-full cursor-pointer">
          <img 
            src={profile?.imgLogo || "https://ui-avatars.com/api/?name=" + profile?.username} 
            className="w-7 h-7 rounded-full object-cover"
            alt="User"
          />
          <span className="text-sm font-semibold text-gray-700">{profile?.name?.split(' ')[0]}</span>
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
          <Bell className="w-5 h-5" />
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
          <Menu className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
