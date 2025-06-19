import React from "react";
import PatientCard from "@/components/PatientCard";
import { useNavigate } from "react-router-dom";
import TitleCard from "@/components/TitleCard";
import { UserPlus } from "lucide-react";

const Pacientes_pendientes: React.FC = () => {
  const navigate = useNavigate();

  const patientInfo = {
    name: "Veronika Elizabeth, Rios Cuadros",
    bloodPressure: "120/80 mm Hg",
    temperature: "36.7 ºC",
    heartRate: "70 lpm",
    respiratoryRate: "17 rpm",
    oxygenSaturation: "97%",
    weight: "58",
    height: "1.65",
    bmi: "21 (Normal)",
  };

  const handleTrabajoSocial = (e: React.FormEvent) => {
    e.preventDefault();
    //navigate("/trabajo-social-diagnostico");
    //navigate("/psicologia-diagnostico");
    //navigate("/oftalmologia-diagnostico");
    navigate("/odontologia-diagnostico");
  };

  return (
    <div className="w-full"> 

      {/* Main ajustado */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        {/* Contenedor principal */}
        <div className="w-full max-w-full">
          
          <TitleCard 
            title="Nuevo Paciente" 
            icon={<UserPlus className="h-8 w-8" />} 
          />

          <PatientCard
            patient={patientInfo}
            onAtenderPaciente={handleTrabajoSocial}
          />
        </div>
      </main>
    </div>
  );
};

export default Pacientes_pendientes;
