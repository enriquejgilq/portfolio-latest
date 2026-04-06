import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { UserCircle, LayoutDashboard, Briefcase, FolderKanban, LogOut } from "lucide-react";
import ProfileView from "./views/ProfileView";
import StatsView from "./views/StatsView";
import JobsView from "./views/JobsView";
import ProjectsView from "./views/ProjectsView";

export default function Dashboard() {
  const location = useLocation();

  // Para esta demostración, asumimos que estamos autenticados.
  // En producción real, verificaríamos una cookie o token aquí.
  // if (!isAuthenticated) return <Navigate to="/login" replace />;

  const navItems = [
    { name: "Perfil", path: "/dashboard/profile", icon: UserCircle },
    { name: "Estadísticas", path: "/dashboard/stats", icon: LayoutDashboard },
    { name: "Trabajos", path: "/dashboard/jobs", icon: Briefcase },
    { name: "Proyectos", path: "/dashboard/projects", icon: FolderKanban },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar Drawer Menu */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tight text-blue-600">SaaS<span className="text-gray-800">Admin</span></h1>
          <p className="text-xs text-gray-500 font-medium">Panel de Control</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path) || (location.pathname === "/dashboard" && item.path === "/dashboard/stats");
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                  ? "bg-blue-50 text-blue-700 font-semibold" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5 opacity-70" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-auto h-screen">
        <div className="bg-white rounded-3xl min-h-[calc(100vh-4rem)] p-8 shadow-sm border border-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to="stats" replace />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="stats" element={<StatsView />} />
            <Route path="jobs" element={<JobsView />} />
            <Route path="projects" element={<ProjectsView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
