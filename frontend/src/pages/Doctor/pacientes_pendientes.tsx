import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <div className="w-full"> 

      {/* Main ajustado */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4"> {/* Cambios clave aquí */}
        {/* Contenedor principal */}
        <div className="w-full max-w-full"> {/* Aseguramos ancho completo */}
          
          {/* Título principal */}
          <div className="w-full mb-8">
            <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg rounded-xl border-none">
              <CardContent className="w-full flex flex-col items-center gap-4 py-10 px-0">
                <CardTitle className="text-4xl font-bold text-center text-blue-950">
                  Nuevo Paciente
                </CardTitle>
              </CardContent>
            </Card>
          </div>

          {/* Card de información del paciente */}
          <div className="w-full py-4">
            <Card className="border border-gray-300 shadow-md rounded-2xl overflow-hidden w-full">
              <CardContent className="p-0">
                <div className="text-center text-xl font-semibold text-gray-800 border-b px-8 py-5 bg-white">
                  Nombre: <span className="font-bold">{patientInfo.name}</span>
                </div>

                <div className="grid grid-cols-2 divide-x border-t text-base bg-white">
                  <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
                    <div className="font-semibold">Presión Arterial:</div>
                    <div>{patientInfo.bloodPressure}</div>
                    <div className="font-semibold">Temperatura:</div>
                    <div>{patientInfo.temperature}</div>
                    <div className="font-semibold">Frecuencia Cardíaca:</div>
                    <div>{patientInfo.heartRate}</div>
                    <div className="font-semibold">Frecuencia Respiratoria:</div>
                    <div>{patientInfo.respiratoryRate}</div>
                  </div>

                  <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
                    <div className="font-semibold">Saturación Oxígeno:</div>
                    <div>{patientInfo.oxygenSaturation}</div>
                    <div className="font-semibold">Peso:</div>
                    <div>{patientInfo.weight} kg</div>
                    <div className="font-semibold">Altura:</div>
                    <div>{patientInfo.height} m</div>
                    <div className="font-semibold">IMC:</div>
                    <div>{patientInfo.bmi}</div>
                  </div>
                </div>

                <div className="flex justify-center gap-8 px-8 py-6 bg-white border-t">
                  <Button
                    className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg"
                    onClick={handleTrabajoSocial}
                  >
                    Atender Paciente
                  </Button>
                  <Button className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg">
                    Siguiente Paciente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Card de información del paciente */}
          <div className="w-full py-4">
            <Card className="border border-gray-300 shadow-md rounded-2xl overflow-hidden w-full">
              <CardContent className="p-0">
                <div className="text-center text-xl font-semibold text-gray-800 border-b px-8 py-5 bg-white">
                  Nombre: <span className="font-bold">{patientInfo.name}</span>
                </div>

                <div className="grid grid-cols-2 divide-x border-t text-base bg-white">
                  <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
                    <div className="font-semibold">Presión Arterial:</div>
                    <div>{patientInfo.bloodPressure}</div>
                    <div className="font-semibold">Temperatura:</div>
                    <div>{patientInfo.temperature}</div>
                    <div className="font-semibold">Frecuencia Cardíaca:</div>
                    <div>{patientInfo.heartRate}</div>
                    <div className="font-semibold">Frecuencia Respiratoria:</div>
                    <div>{patientInfo.respiratoryRate}</div>
                  </div>

                  <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
                    <div className="font-semibold">Saturación Oxígeno:</div>
                    <div>{patientInfo.oxygenSaturation}</div>
                    <div className="font-semibold">Peso:</div>
                    <div>{patientInfo.weight} kg</div>
                    <div className="font-semibold">Altura:</div>
                    <div>{patientInfo.height} m</div>
                    <div className="font-semibold">IMC:</div>
                    <div>{patientInfo.bmi}</div>
                  </div>
                </div>

                <div className="flex justify-center gap-8 px-8 py-6 bg-white border-t">
                  <Button
                    className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg"
                    onClick={handleTrabajoSocial}
                  >
                    Atender Paciente
                  </Button>
                  <Button className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg">
                    Siguiente Paciente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pacientes_pendientes;
