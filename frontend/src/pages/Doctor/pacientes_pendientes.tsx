import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PatientCard from "@/components/PatientCard";
import { useNavigate } from "react-router-dom";

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
    navigate("/oftalmologia-diagnostico");
    //navigate("/odontologia-diagnostico");
  };

  return (
    <div className="w-full"> 

      {/* Main ajustado */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4"> {/* Cambios clave aquí */}
        {/* Contenedor principal */}
        <div className="w-full max-w-full"> {/* Aseguramos ancho completo */}
          
          {/* Título principal */}
          <div className="w-full mb-8">
            <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg rounded-xl border-none">
              <CardContent className="w-full flex flex-col items-center gap-4 py-6 px-0">
                <CardTitle className="text-4xl font-bold text-center text-blue-950">
                  Nuevo Paciente
                </CardTitle>
              </CardContent>
            </Card>
          </div>

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
