import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { X } from "lucide-react";

interface SeleccionDiagnosticoProps {
  onDPrincipalChange: (diagnostico: string) => void;
  onSecundariosChange: (diagnosticos: string[]) => void;
}

const SeleccionDiagnostico: React.FC<SeleccionDiagnosticoProps> = ({
  onDPrincipalChange,
  onSecundariosChange
}) => {
  const [diagnosticoPrincipal, setDiagnosticoPrincipal] = useState<string>("");
  const [diagnosticoSecundario, setDiagnosticoSecundario] = useState<string>("");
  const [diagnosticosSecundarios, setDiagnosticosSecundarios] = useState<string[]>([]);
  const { theme } = useTheme();

  const agregarDiagnosticoSecundario = () => {
    if (diagnosticoSecundario && !diagnosticosSecundarios.includes(diagnosticoSecundario)) {
      setDiagnosticosSecundarios([...diagnosticosSecundarios, diagnosticoSecundario]);
      setDiagnosticoSecundario("");
    }
  };

  const eliminarDiagnosticoSecundario = (index: number) => {
    const nuevosDiagnosticos = [...diagnosticosSecundarios];
    nuevosDiagnosticos.splice(index, 1);
    setDiagnosticosSecundarios(nuevosDiagnosticos);
  };

  useEffect(() => {
    onDPrincipalChange(diagnosticoPrincipal);
  }, [diagnosticoPrincipal]);

  useEffect(() => {
    onSecundariosChange(diagnosticosSecundarios);
  }, [diagnosticosSecundarios]);

  return (
    <div className="mt-6">
      <div className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda - Diagnóstico Principal */}
          <div>
            <div className="mb-4">
              <h3 className={`font-semibold text-lg mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                Diagnóstico Principal
              </h3>
              <Select 
                value={diagnosticoPrincipal} 
                onValueChange={(value) => setDiagnosticoPrincipal(value)}
              >
                <SelectTrigger className={`w-full ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Seleccione un diagnóstico principal" />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                  <SelectItem value="Enteritis por Salmonella" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                    Enteritis por Salmonella
                  </SelectItem>
                  <SelectItem value="Infección localizada por salmonella" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                    Infección localizada por salmonella
                  </SelectItem>
                  <SelectItem value="Infección no localizada por salmonella" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                    Infección no localizada por salmonella
                  </SelectItem>
                  <SelectItem value="Sepsis debida a Salmonella" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                    Sepsis debida a Salmonella
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className={`font-semibold text-lg mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                Diagnóstico Principal
              </h3>
              <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <p className={`mt-1 text-lg text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {diagnosticoPrincipal || "Ninguno seleccionado"}
                  </p>
                  {diagnosticoPrincipal && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDiagnosticoPrincipal("")}
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Columna derecha - Diagnósticos Secundarios */}
          <div>
            <div className="mb-4">
              <h3 className={`font-semibold text-lg mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                Diagnóstico Secundario
              </h3>
              <div className="flex gap-2">
                <Select 
                  value={diagnosticoSecundario} 
                  onValueChange={(value) => setDiagnosticoSecundario(value)}
                >
                  <SelectTrigger className={`flex-1 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300'}`}>
                    <SelectValue placeholder="Seleccione un diagnóstico secundario" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <SelectItem value="Fiebre tifoidea" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                      Fiebre tifoidea
                    </SelectItem>
                    <SelectItem value="Infección urinaria" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                      Infección urinaria
                    </SelectItem>
                    <SelectItem value="Neumonía" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                      Neumonía
                    </SelectItem>
                    <SelectItem value="Deshidratación" className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                      Deshidratación
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={agregarDiagnosticoSecundario}
                  disabled={!diagnosticoSecundario}
                  className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  Agregar
                </Button>
              </div>
            </div>

            <div>
              <h3 className={`font-semibold text-lg mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                Lista de Diagnósticos Secundarios
              </h3>
              {diagnosticosSecundarios.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {diagnosticosSecundarios.map((diagnostico, index) => (
                    <Card 
                      key={index} 
                      className={`p-3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{diagnostico}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => eliminarDiagnosticoSecundario(index)}
                          className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className={`p-4 text-left ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                  No hay diagnósticos secundarios agregados
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeleccionDiagnostico;
