import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

interface DoctorInfo {
  name: string;
  specialty: string;
  email: string;
  location: string;
  document?: string;
  license?: string;
  phone?: string;
}

interface DoctorCardProps {
  doctor?: DoctorInfo;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { theme } = useTheme();

  if (!doctor) return null;

  return (
    <div className="w-full py-4">
      <Card className={`shadow-md rounded-2xl overflow-hidden w-full py-0 ${
        theme === 'dark' 
          ? 'border-gray-600 bg-gray-800' 
          : 'border-gray-300 bg-white'
      }`}>
        <CardContent className="p-0">
          <div className={`text-center text-xl font-bold border-b px-8 py-5 ${
            theme === 'dark' 
              ? 'bg-gray-700 text-gray-100 border-gray-600' 
              : 'bg-white text-gray-800 border-gray-200'
          }`}>
            Información Personal
          </div>

          <div className={`grid grid-cols-2 gap-y-3 gap-x-8 px-8 py-5 text-base ${
            theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
          }`}>
            <div>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nombre:
              </span> {doctor.name}
            </div>
            <div>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Especialidad:
              </span> {doctor.specialty}
            </div>
            <div>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Correo:
              </span> {doctor.email}
            </div>
            <div>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Sede:
              </span> {doctor.location}
            </div>
            
            {/* Campos adicionales opcionales */}
            {doctor.document && (
              <div>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Documento:
                </span> {doctor.document}
              </div>
            )}
            
            {doctor.license && (
              <div>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Licencia:
                </span> {doctor.license}
              </div>
            )}
            
            {doctor.phone && (
              <div>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Teléfono:
                </span> {doctor.phone}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorCard;