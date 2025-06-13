import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();

  return (
    <div className="w-full py-4">
      <Card className={`shadow-md rounded-2xl overflow-hidden w-full py-0 ${
        theme === 'dark' 
          ? 'border-gray-600 bg-gray-800' 
          : 'border-gray-300 bg-white'
      }`}>
        <CardContent className="p-0">
          <div className={`text-center text-xl font-semibold border-b px-8 py-5 ${
            theme === 'dark' 
              ? 'bg-gray-700 text-gray-100 border-gray-600' 
              : 'bg-white text-gray-800 border-gray-200'
          }`}>
            Nombre: <span className="font-bold">{patient.name}</span>
          </div>

          <div className={`grid grid-cols-2 divide-x border-t text-base ${
            theme === 'dark' 
              ? 'bg-gray-800 divide-gray-600 border-gray-600' 
              : 'bg-white divide-gray-200 border-gray-200'
          }`}>
            <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Presión Arterial:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.bloodPressure}
              </div>
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Temperatura:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.temperature}
              </div>
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Frecuencia Cardíaca:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.heartRate}
              </div>
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Frecuencia Respiratoria:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.respiratoryRate}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-y-3 px-8 py-5">
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Saturación Oxígeno:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.oxygenSaturation}
              </div>
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Peso:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.weight} kg
              </div>
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Altura:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.height} m
              </div>
              <div className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                IMC:
              </div>
              <div className={theme === 'dark' ? 'text-gray-100' : ''}>
                {patient.bmi}
              </div>
            </div>
          </div>

          <div className={`flex justify-center gap-8 px-8 py-6 border-t ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <Button
              className={`text-white text-md px-6 py-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-blue-700 hover:bg-blue-600'
                  : 'bg-blue-900 hover:bg-blue-700'
              }`}
              onClick={onAtenderPaciente}
            >
              Atender Paciente
            </Button>
            <Button
              className={`text-white text-md px-6 py-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-blue-700 hover:bg-blue-600'
                  : 'bg-blue-900 hover:bg-blue-700'
              }`}
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