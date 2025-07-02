import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import FichaEstudiante from "@/components/FichaEstudiante";
import SeleccionDiagnostico from "@/components/diagnostico-primario-secundario";
import TitleCard from "@/components/TitleCard";
import { File } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DiagnosticoMedicinaGeneral: React.FC = () => {

  const { theme } = useTheme();
  const navigate = useNavigate(); 
  const handlePacientesPendientes = (e: React.FormEvent) => {
          e.preventDefault();
          navigate("/pacientes-nuevos");
      }
  return (
    <div className="w-full">
      {/* Titulo principal */}
      {/* Main ajustado */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        {/* Contenedor principal */}
        <div className="w-full max-w-full">
          <TitleCard 
            title="Medicina General" 
            icon={<File className="h-8 w-8" />} 
          />
        </div>
      </main>

      {/* Contenido */}
      <div className="w-full px-8">
        <div className={`w-full max-w-6xl border rounded-xl shadow-sm p-6 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}>
          <FichaEstudiante />

          {/* Evaluaciones */}
          <Card className="p-6 mb-6">
          <div className="grid gap-4">
            {["Evaluación General ", "Diagnóstico General ", "Observaciones"].map((titulo, idx) => (
              <Card key={idx} className={`p-4 border rounded-md shadow-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-slate-300'
                }`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <p className={`font-semibold text-lg ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                  }`}>{titulo}</p>
                  <Input
                    type="text"
                    placeholder="Completar aquí"
                    className={`flex-1 border-none outline-none ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-transparent text-gray-700 placeholder-gray-400'
                    }`}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Diagnóstico */}
          <SeleccionDiagnostico />

          </Card>
          {/* Botones de acción */}
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePacientesPendientes}
              className={`${
                theme === 'dark' 
                 ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Cancelar
             </Button>
            <Button 
              type="submit"
              className={`${
                theme === 'dark' 
                   ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
               }`}
             >
              Guardar Diagnóstico
             </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoMedicinaGeneral;