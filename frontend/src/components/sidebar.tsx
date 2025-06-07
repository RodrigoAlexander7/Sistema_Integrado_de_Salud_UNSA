import React from "react";
import {
  Home,
  Search,
  FilePlus,
  LogOut,
  KeyRound,
  Clock,
  Settings,
  User,
  Book,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Inicio", icon: <Home size={22} />, path: "/inicio" },
    { label: "Información Personal", icon: <User size={22} />, path: "/perfil" },
    { label: "Búsqueda", icon: <Search size={22} />, path: "/busqueda" },
    { label: "Directorio", icon: <Book size={22} />, path: "/directorio" },
    { label: "Crear Historia", icon: <FilePlus size={22} />, path: "/crear-historia" },
    { label: "Pendientes", icon: <Clock size={22} />, path: "/pendientes" },
    { label: "Configuración", icon: <Settings size={22} />, path: "/configuracion" },
    { label: "Cambiar Contraseña", icon: <KeyRound size={22} />, path: "/cambiar-contrasena" },
    { label: "Cerrar Sesión", icon: <LogOut size={22} />, path: "/logout" },
  ];

  return (
    <aside className="w-64 min-h-screen text-gray-800 border-r bg-white fixed left-0 top-0 flex flex-col px-4 py-6 shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-start px-3 mb-10">
        <img src="/LOGO_UNSA.png" alt="Logo UNSA" className="h-12" />
      </div>

      {/* Menú */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="justify-start gap-4 px-5 py-2.5 text-base font-medium text-blue-950 hover:bg-blue-100 hover:text-blue-900 rounded-lg transition-all"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
