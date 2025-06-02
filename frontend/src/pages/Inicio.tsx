import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "../components/barra-opciones";

interface PatientData {
    name: string;
    bloodPressure: string;
    temperature: string;
    heartRate: string;
    respiratoryRate: string;
    oxygenSaturation: string;
    weight: string;
    height: string;
    bmi: string;
}

const patientInfo: PatientData = {
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

const PatientCard: React.FC<{ data: PatientData; showVitals?: boolean }> = ({ data, showVitals = true }) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-2">
      <Card className="border border-gray-300 shadow-sm rounded-md overflow-hidden">
        <CardContent className="p-0">

          {/* Encabezado */}
          <div className="text-center text-xl font-bold text-gray-800 border-b px-6 py-2">
            Nombre: <span className="font-semibold">{data.name}</span>
          </div>

          {/* Contenido en dos columnas */}
          <div className="grid grid-cols-2 divide-x border-t text-sm">
            {/* Columna izquierda */}
            <div className="grid grid-cols-[160px_1fr] gap-y-2 px-4 py-3">
              <div className="font-semibold">Presión Arterial:</div><div>{data.bloodPressure}</div>
              <div className="font-semibold">Temperatura:</div><div>{data.temperature}</div>
              {showVitals && (
                <>
                  <div className="font-semibold">Frecuencia Cardíaca:</div><div>{data.heartRate}</div>
                  <div className="font-semibold">Frecuencia Respiratoria:</div><div>{data.respiratoryRate}</div>
                </>
              )}
            </div>

            {/* Columna derecha */}
            <div className="grid grid-cols-[160px_1fr] gap-y-2 px-4 py-3">
              <div className="font-semibold">Saturación Oxígeno:</div><div>{data.oxygenSaturation}</div>
              <div className="font-semibold">Peso:</div><div>{data.weight}</div>
              {showVitals && (
                <>
                  <div className="font-semibold">Altura:</div><div>{data.height}</div>
                  <div className="font-semibold">IMC:</div><div>{data.bmi}</div>
                </>
              )}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};


const Inicio: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <BarraOpciones />
            <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
                Nuevo Paciente
            </h1>
            <PatientCard data={patientInfo} />
            <PatientCard data={patientInfo} showVitals={false} />
        </div>
    );
};

export default Inicio;