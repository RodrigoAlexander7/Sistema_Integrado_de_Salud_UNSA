import React from "react";
import {
  Home,
  Search,
  LogOut,
  KeyRound,
  Settings,
  User,
  Book,
  Sun,
  Moon,
  UserPlus,
  Stethoscope,
  ClipboardList,
  Users,
  FilePlus,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  roles?: string[]; // Roles que pueden ver este item
}

interface SidebarProps {
  userRole?: string; // 'doctor', 'enfermeria', 'admin'
}

const Sidebar: React.FC<SidebarProps> = ({ userRole = 'doctor' }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Menú base común a todos los roles
  const commonMenuItems: MenuItem[] = [
    { label: "Perfil de Usuario", icon: <User size={22} />, path: "/perfil" },
    { label: "Búsqueda", icon: <Search size={22} />, path: "/busqueda" },
    { label: "Configuración", icon: <Settings size={22} />, path: "/configuracion" },
    { label: "Cambiar Contraseña", icon: <KeyRound size={22} />, path: "/cambiar-contrasena" },
    { label: "Cerrar Sesión", icon: <LogOut size={22} />, path: "/" },
  ];

  // Menú específico para doctores
  const doctorMenuItems: MenuItem[] = [
    { label: "Inicio", icon: <Home size={22}/>, path: "/inicio-doctor"},
    { label: "Pacientes Nuevos", icon: <UserPlus size={22} />, path: "/pacientes-nuevos" },
    { label: "Pacientes Pendientes", icon: <ClipboardList size={22} />, path: "/pacientes-pendientes" },
    { label: "Directorio", icon: <Book size={22} />, path: "/directorio" },
  ];

  // Menú específico para enfermería
  const enfermeriaMenuItems: MenuItem[] = [
    { label: "Inicio", icon: <Home size={22}/>, path: "/inicio-enfermeria"},
    { label: "Nuevo Paciente", icon: <FilePlus size={22} />, path: "/ingreso-historia-clinica" },
    { label: "Pacientes en Espera", icon: <Users size={22} />, path: "/pacientes-espera" },
    { label: "Realizar Triaje", icon: <FileText size={22} />, path: "/triaje" },
  ];

  // Menú específico para administradores
  const adminMenuItems: MenuItem[] = [
    { label: "Inicio", icon: <Home size={22}/>, path: "/inicio-admin"},
    { label: "Registrar Doctor", icon: <Stethoscope size={22} />, path: "/ingresar-nuevo-doctor" },
    { label: "Registrar Enfermera", icon: <UserPlus size={22} />, path: "/ingresar-nueva-enfermera" },
    { label: "Directorio", icon: <Book size={22} />, path: "/directorio" },
  ];

  // Combinar menús según el rol
  const getMenuItems = (): MenuItem[] => {
    switch(userRole) {
      case 'doctor':
        return [...doctorMenuItems, ...commonMenuItems];
      case 'enfermeria':
        return [...enfermeriaMenuItems, ...commonMenuItems];
      case 'admin':
        return [...adminMenuItems, ...commonMenuItems];
      default:
        return [...doctorMenuItems, ...commonMenuItems];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`w-64 min-h-screen border-r fixed left-0 top-0 flex flex-col px-4 py-6 shadow-sm transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100 border-gray-700' 
        : 'bg-white text-gray-800 border-gray-200'
    }`}>
      {/* Logo */}
      <div className="flex items-center justify-start px-3 mb-10">
        <img 
          src="/LOGO_UNSA.png" 
          alt="Logo UNSA" 
          className="h-12"
        />
      </div>

      {/* Menú */}
      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`justify-start gap-4 px-5 py-2.5 text-base font-medium rounded-lg transition-all ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-100 hover:text-white'
                : 'hover:bg-blue-100 text-blue-950 hover:text-blue-900'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Selector de tema */}
      <div className="mt-auto pt-4">
        <Button
          onClick={toggleTheme}
          variant="outline"
          className={`w-full justify-start gap-4 ${
            theme === 'dark' 
              ? 'border-gray-600 hover:bg-gray-800' 
              : 'border-gray-300 hover:bg-blue-50'
          }`}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={20} />
              <span>Tema Claro</span>
            </>
          ) : (
            <>
              <Moon size={20} />
              <span>Tema Oscuro</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;