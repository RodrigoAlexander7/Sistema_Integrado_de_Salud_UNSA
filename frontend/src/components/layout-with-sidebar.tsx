// src/components/layout-with-sidebar.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useTheme } from "@/context/ThemeContext";

export function LayoutWithSidebar() {
  const { theme } = useTheme();

  return (
    <div className={`flex ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar Fijo */}
      <div className="fixed h-screen w-64 z-10">
        <Sidebar />
      </div>
      
      {/* Contenido Principal */}
      <div className={`flex-1 ml-64 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}