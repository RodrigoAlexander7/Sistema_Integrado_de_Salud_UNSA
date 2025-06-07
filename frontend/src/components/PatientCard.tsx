import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PatientInfo {
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

interface PatientCardProps {
  patient: PatientInfo;
  onAtenderPaciente?: () => void;
  onSiguientePaciente?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onAtenderPaciente,
  onSiguientePaciente,
}) => {
  return (
    <div className="w-full py-4">
      <Card className="border border-gray-300 shadow-md rounded-2xl overflow-hidden w-full py-0">
        <CardContent className="p-0">
          <div className="text-center text-xl font-semibold text-gray-800 border-b px-8 py-5 bg-white">
            Nombre: <span className="font-bold">{patient.name}</span>
          </div>

          <div className="grid grid-cols-2 divide-x border-t text-base bg-white">
            <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
              <div className="font-semibold">Presión Arterial:</div>
              <div>{patient.bloodPressure}</div>
              <div className="font-semibold">Temperatura:</div>
              <div>{patient.temperature}</div>
              <div className="font-semibold">Frecuencia Cardíaca:</div>
              <div>{patient.heartRate}</div>
              <div className="font-semibold">Frecuencia Respiratoria:</div>
              <div>{patient.respiratoryRate}</div>
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
              <div className="font-semibold">Saturación Oxígeno:</div>
              <div>{patient.oxygenSaturation}</div>
              <div className="font-semibold">Peso:</div>
              <div>{patient.weight} kg</div>
              <div className="font-semibold">Altura:</div>
              <div>{patient.height} m</div>
              <div className="font-semibold">IMC:</div>
              <div>{patient.bmi}</div>
            </div>
          </div>

          <div className="flex justify-center gap-8 px-8 py-6 bg-white border-t">
            <Button
              className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg"
              onClick={onAtenderPaciente}
            >
              Atender Paciente
            </Button>
            <Button
              className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg"
              onClick={onSiguientePaciente}
            >
              Siguiente Paciente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientCard;
