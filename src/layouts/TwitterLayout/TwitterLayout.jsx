import React, { useState, useEffect } from "react";
import { usePublicPortfolio } from "../../hooks/usePublicPortfolio";
import TwitterSidebar from "./components/TwitterSidebar";
import TwitterFeed from "./components/TwitterFeed";
import TwitterWidgets from "./components/TwitterWidgets";

export default function TwitterLayout({ username }) {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D9BF0]"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Este @{username} no existe</h2>
        <p className="text-gray-500">Prueba a buscar otro usuario.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#1D9BF0] selection:text-white">
      <div className="max-w-[1250px] mx-auto flex justify-center">
        {/* Left Column (Sidebar) */}
        <TwitterSidebar profile={profile} />

        {/* Center Column (Feed) */}
        <TwitterFeed 
           projects={projects} 
           jobs={jobs} 
           profile={profile} 
           searchQuery={searchQuery}
           activeTab={activeTab}
           setActiveTab={setActiveTab}
        />

        {/* Right Column (Widgets) */}
        <TwitterWidgets 
           profile={profile} 
           projects={projects}
           searchQuery={searchQuery}
           setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}
