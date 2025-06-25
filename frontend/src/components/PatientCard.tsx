import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
  onAtenderPaciente?: (specialty: string) => void;
  onSiguientePaciente?: () => void;
}

const specialties = [
  { value: "trabajo-social", label: "Trabajo Social" },
  { value: "nutricion", label: "Nutrición" },
  { value: "psicologia", label: "Psicología" },
  { value: "oftalmologia", label: "Oftalmología" },
  { value: "odontologia", label: "Odontología" },
  { value: "medicina-general", label: "Medicina General" },
];

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onAtenderPaciente
}) => {
  const { theme } = useTheme();
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<string>("");

  const handleAtenderPaciente = () => {
    if (selectedSpecialty && onAtenderPaciente) {
      onAtenderPaciente(selectedSpecialty);
    }
  };

  return (
    <div className="w-full py-4">
      <Card className={`shadow-md rounded-2xl overflow-hidden w-full py-0 ${
        theme === 'dark' 
          ? 'border-gray-600 bg-gray-800' 
          : 'border-white bg-white'
      }`}>
        <CardContent className="p-0">
          <div className={`text-center text-xl font-semibold border-b px-8 py-5 ${
            theme === 'dark' 
              ? 'bg-gray-700 text-gray-100 border-gray-600' 
              : 'bg-white text-gray-800 border-white'
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

            <div className={`flex flex-col gap-4 px-8 py-6 border-t ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-white'
          }`}>
            <div className="w-full max-w-md mx-auto">
              <Select 
                value={selectedSpecialty} 
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className={`w-full ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}>
                  <SelectValue placeholder="Seleccione una especialidad" />
                </SelectTrigger>
                
                <SelectContent 
                  position="popper"
                  side="top"
                  className={`
                    ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}
                    w-[calc(var(--radix-select-trigger-width)+2px)]
                    border
                    mb-1
                    rounded-md
                    shadow-lg
                  `}
                >
                  {specialties.map((specialty) => (
                    <SelectItem 
                      key={specialty.value} 
                      value={specialty.value}
                      className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                        w-full text-left px-4 py-2`}
                    >
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center">
              <Button
                className={`text-white text-md px-6 py-3 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-blue-700 hover:bg-blue-600'
                    : 'bg-blue-900 hover:bg-blue-700'
                }`}
                onClick={handleAtenderPaciente}
                disabled={!selectedSpecialty}
              >
                Atender Paciente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientCard;