import React from "react";
import DoctorCard from "@/components/DoctorCard";
import TitleCard from "@/components/TitleCard";
import { User } from "lucide-react";

// Datos Prueba
const doctorData = {
  name: "Veronika Elizabeth Rios Cuadros",
  specialty: "Odontología",
  email: "vrioscua@unsa.edu.pe",
  location: "Ingenierías",
};

const Perfil: React.FC = () => {
  return (
    <div className="w-full"> 
    
      {/* Main ajustado */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        {/* Contenedor principal */}
        <div className="w-full max-w-full">
          <TitleCard 
            title="Perfil de Usuario" 
            icon={<User className="h-8 w-8" />} 
          />
        </div>
        {/* Información del doctor en modo informativo */}
        <DoctorCard doctor={doctorData} />
      </main>
    </div>
  );
};

export default Perfil;
