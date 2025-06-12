import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "../../components/barra-opciones-doctor";
import { Button } from "@/components/ui/button";
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
    <div className="w-full min-h-screen flex flex-col">
      <BarraOpciones />
      <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
        <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
          Nuevo Paciente
        </h1>
      </Card>

      <div className="w-full max-w-4xl mx-auto my-2">
        <Card className="border border-gray-300 shadow-sm rounded-md overflow-hidden scale-110">
          <CardContent className="p-0">
            {/* Encabezado */}
            <div className="text-center text-xl font-bold text-gray-800 border-b px-6 py-2">
              Nombre:{" "}
              <span className="font-semibold">{patientInfo.name}</span>
            </div>

            {/* Contenido en dos columnas */}
            <div className="grid grid-cols-2 divide-x border-t text-sm">
              {/* Columna izquierda */}
              <div className="grid grid-cols-[160px_1fr] gap-y-2 px-4 py-3">
                <div className="font-semibold">Presión Arterial:</div>
                <div>{patientInfo.bloodPressure}</div>
                <div className="font-semibold">Temperatura:</div>
                <div>{patientInfo.temperature}</div>
                <div className="font-semibold">Frecuencia Cardíaca:</div>
                <div>{patientInfo.heartRate}</div>
                <div className="font-semibold">Frecuencia Respiratoria:</div>
                <div>{patientInfo.respiratoryRate}</div>
              </div>

              {/* Columna derecha */}
              <div className="grid grid-cols-[160px_1fr] gap-y-2 px-4 py-3">
                <div className="font-semibold">Saturación Oxígeno:</div>
                <div>{patientInfo.oxygenSaturation}</div>
                <div className="font-semibold">Peso:</div>
                <div>{patientInfo.weight}</div>
                <div className="font-semibold">Altura:</div>
                <div>{patientInfo.height}</div>
                <div className="font-semibold">IMC:</div>
                <div>{patientInfo.bmi}</div>
              </div>
            </div>

            <div className="w-full bg-gradient-to-brtext-gray-800 shadow-lg space-x-12 p-4">
              <Button
                className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg"
                onClick={handleTrabajoSocial}
              >
                Atender Paciente
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg">
                Siguiente Paciente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pacientes_pendientes;
