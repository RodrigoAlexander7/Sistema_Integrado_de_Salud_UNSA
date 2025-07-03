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

interface DiagnosticoBaseProps {
  tituloEspecialidad: string;
  camposEvaluacion?: string[]; // Hacerlo opcional
  rutaCancelar?: string;
  children?: React.ReactNode;
  icono?: React.ReactNode; // Nuevo prop para personalizar el icono
  onDiagnosticoPrincipalChange: (diagnostico: string) => void;
  onDiagnosticosSecundariosChange: (diagnosticos: string[]) => void;
  onCampoChange: (campo: string, valor: string) => void;
  onSubmit?: (e: React.FormEvent) => void; // Nuevo prop para manejar submit
  isSubmitting?: boolean;
}

const DiagnosticoBase: React.FC<DiagnosticoBaseProps> = ({
  tituloEspecialidad,
  camposEvaluacion,
  rutaCancelar = "/pacientes-nuevos",
  children,
  icono = <File className="h-8 w-8" />, // Valor por defecto
  onDiagnosticoPrincipalChange,
  onDiagnosticosSecundariosChange,
  onCampoChange,
  onSubmit,
  isSubmitting
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handlePacientesPendientes = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(rutaCancelar);
  };

  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <TitleCard 
            title={tituloEspecialidad} 
            icon={icono} // Usar el icono personalizado
          />
        </div>
      </main>

      <div className="w-full px-8">
        <form onSubmit={onSubmit}> {/* Envolver en form y manejar onSubmit */}
          <div className={`w-full max-w-6xl border rounded-xl shadow-sm p-6 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-300'
          }`}>
            <FichaEstudiante />

            <Card className="p-6 mb-6">
              {/* Renderizar camposEvaluacion solo si existe */}
              {camposEvaluacion && (
                <div className="grid gap-4 mb-6">
                  {camposEvaluacion.map((titulo, idx) => (
                    <Card 
                      key={idx} 
                      className={`p-4 border rounded-md shadow-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <p className={`font-semibold text-lg ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                        }`}>
                          {titulo}
                        </p>
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
              )}
              
              <SeleccionDiagnostico />
              {children}
            </Card>

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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar Diagnóstico"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosticoBase;