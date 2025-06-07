import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export function LayoutWithSidebar() {
  return (
    <div className="flex">
      {/* Sidebar Fijo */}
      <div className="fixed h-screen w-64 border-r bg-white z-10">
        <Sidebar />
      </div>
      
      {/* Contenido Principal */}
      <div className="flex-1 ml-64 min-h-screen">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}