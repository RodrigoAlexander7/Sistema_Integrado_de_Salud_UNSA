import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import FichaEstudiante from "@/components/FichaEstudiante";
import SeleccionDiagnostico from "@/components/diagnostico-primario-secundario";
import TitleCard from "@/components/TitleCard";
import { Square, File } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Odontograma: React.FC = () => {
  const { theme } = useTheme();

  // Datos para el odontograma según la nomenclatura FDI
  const dientesPermanentes = [
    { numero: 18, nombre: "3er Molar" }, { numero: 17, nombre: "2do Molar" },
    { numero: 16, nombre: "1er Molar" }, { numero: 15, nombre: "2da Premolar" },
    { numero: 14, nombre: "1ra Premolar" }, { numero: 13, nombre: "Canino" },
    { numero: 12, nombre: "Incisivo Lateral" }, { numero: 11, nombre: "Incisivo Central" },
    { numero: 21, nombre: "Incisivo Central" }, { numero: 22, nombre: "Incisivo Lateral" },
    { numero: 23, nombre: "Canino" }, { numero: 24, nombre: "1ra Premolar" },
    { numero: 25, nombre: "2da Premolar" }, { numero: 26, nombre: "1er Molar" },
    { numero: 27, nombre: "2do Molar" }, { numero: 28, nombre: "3er Molar" },
    { numero: 48, nombre: "3er Molar" }, { numero: 47, nombre: "2do Molar" },
    { numero: 46, nombre: "1er Molar" }, { numero: 45, nombre: "2da Premolar" },
    { numero: 44, nombre: "1ra Premolar" }, { numero: 43, nombre: "Canino" },
    { numero: 42, nombre: "Incisivo Lateral" }, { numero: 41, nombre: "Incisivo Central" },
    { numero: 31, nombre: "Incisivo Central" }, { numero: 32, nombre: "Incisivo Lateral" },
    { numero: 33, nombre: "Canino" }, { numero: 34, nombre: "1ra Premolar" },
    { numero: 35, nombre: "2da Premolar" }, { numero: 36, nombre: "1er Molar" },
    { numero: 37, nombre: "2do Molar" }, { numero: 38, nombre: "3er Molar" }
  ];

  const navigate = useNavigate(); 

    const handlePacientesPendientes = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("abriendo Historia Clinica Ingreso") 
        navigate("/pacientes-nuevos");
    } 
  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
          <TitleCard 
              title="Bienvenido" 
              icon={<UserPlus className="h-8 w-8" />} 
          />
      </main>

      <div className="w-full px-8">
        <div className={`w-full max-w-6xl border rounded-xl shadow-sm p-6 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}>
          <FichaEstudiante />

          <Card className="p-6 mb-6">
            {/* Odontograma visual */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
              }`}>Diagrama Dental</h3>
              
              <div className={`grid grid-cols-16 gap-1 p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {/* Arriba - Maxilar */}
                {dientesPermanentes.slice(0, 16).map(diente => (
                  <div key={diente.numero} className={`flex flex-col items-center p-2 rounded ${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-200'
                  }`}>
                    <span className="text-xs">{diente.numero}</span>
                    <Square className="h-6 w-6" />
                  </div>
                ))}
                
                {/* Abajo - Mandibular */}
                {dientesPermanentes.slice(16).map(diente => (
                  <div key={diente.numero} className={`flex flex-col items-center p-2 rounded ${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-200'
                  }`}>
                    <Square className="h-6 w-6" />
                    <span className="text-xs">{diente.numero}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Registro de condiciones dentales */}
            <div className="grid gap-4 mb-6">
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
              }`}>Registro de Condiciones Dentales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`p-4 border rounded-md shadow-sm ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-slate-300'
                }`}>
                  <p className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                  }`}>Diente afectado</p>
                  <Input
                    type="number"
                    placeholder="Número FDI (ej. 11, 36)"
                    className={`border-none outline-none ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-transparent text-gray-700 placeholder-gray-400'
                    }`}
                  />
                </Card>

                <Card className={`p-4 border rounded-md shadow-sm ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-slate-300'
                }`}>
                  <p className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                  }`}>Condición</p>
                  <select className={`w-full p-2 rounded ${
                    theme === 'dark' 
                      ? 'bg-gray-600 text-white border-gray-500' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}>
                    <option value="">Seleccione una condición</option>
                    <option value="caries">Caries</option>
                    <option value="restauracion">Restauración</option>
                    <option value="ausente">Ausente</option>
                    <option value="sellante">Sellante</option>
                    <option value="corona">Corona</option>
                    <option value="movilidad">Movilidad</option>
                    <option value="fractura">Fractura</option>
                  </select>
                </Card>
              </div>

              <Card className={`p-4 border rounded-md shadow-sm ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-slate-300'
              }`}>
                <p className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                }`}>Observaciones</p>
                <textarea
                  placeholder="Detalles de la condición..."
                  className={`w-full p-2 rounded border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 text-white border-gray-500' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                  rows={3}
                />
              </Card>
            </div>

            {/* Historial de tratamientos */}
            <Card className={`p-4 border rounded-md shadow-sm mb-6 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-slate-300'
            }`}>
              <p className={`font-semibold text-lg mb-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
              }`}>Historial de Tratamientos</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                    }`}>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Diente</th>
                      <th className="p-2 text-left">Procedimiento</th>
                      <th className="p-2 text-left">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`border-b ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                    }`}>
                      <td className="p-2">-</td>
                      <td className="p-2">-</td>
                      <td className="p-2">-</td>
                      <td className="p-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

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
              Guardar Odontograma
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odontograma;