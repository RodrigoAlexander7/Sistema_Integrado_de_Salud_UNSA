import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DoctorCard from "@/components/DoctorCard";

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
              
          {/* Título principal */}
          <div className="w-full mb-8">
            <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg rounded-xl border-none">
              <CardContent className="w-full flex flex-col items-center gap-4 py-6 px-0">
                <CardTitle className="text-4xl font-bold text-center text-blue-950">
                  Perfil de Usuario
                </CardTitle>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Información del doctor en modo informativo */}
        <DoctorCard doctor={doctorData} />
      </main>
    </div>
  );
};

export default Perfil;
