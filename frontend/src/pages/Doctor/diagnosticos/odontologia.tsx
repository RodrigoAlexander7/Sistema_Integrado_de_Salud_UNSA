import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import FichaEstudiante from "@/components/FichaEstudiante";
import SeleccionDiagnostico from "@/components/diagnostico-primario-secundario";
import TitleCard from "@/components/TitleCard";
import { File } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Tipos para el odontograma
type DienteCondicion = 
  | "sano" 
  | "caries" 
  | "restauracion" 
  | "ausente" 
  | "sellante" 
  | "corona" 
  | "movilidad" 
  | "fractura";

interface DienteEstado {
  numero: number;
  condicion: DienteCondicion;
  observaciones: string;
}

interface Tratamiento {
  fecha: string;
  diente: number;
  procedimiento: string;
  observaciones: string;
}

const Odontograma: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Estados para el odontograma
  const [dienteSeleccionado, setDienteSeleccionado] = useState<number | null>(null);
  const [condiciones, setCondiciones] = useState<Record<number, DienteEstado>>({});
  const [dienteInput, setDienteInput] = useState<string>("");
  const [condicionInput, setCondicionInput] = useState<DienteCondicion>("sano");
  const [observacionesInput, setObservacionesInput] = useState<string>("");
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);

  // Datos del odontograma (numeración FDI)
  const cuadrantes = [
    {
      id: 1,
      nombre: "Cuadrante Superior Derecho",
      dientes: [18, 17, 16, 15, 14, 13, 12, 11],
      clase: "flex-row-reverse"
    },
    {
      id: 2,
      nombre: "Cuadrante Superior Izquierdo",
      dientes: [21, 22, 23, 24, 25, 26, 27, 28],
      clase: "flex-row"
    },
    {
      id: 3,
      nombre: "Cuadrante Inferior Izquierdo",
      dientes: [31, 32, 33, 34, 35, 36, 37, 38],
      clase: "flex-row"
    },
    {
      id: 4,
      nombre: "Cuadrante Inferior Derecho",
      dientes: [48, 47, 46, 45, 44, 43, 42, 41],
      clase: "flex-row-reverse"
    }
  ];

  // Colores para diferentes condiciones
  const coloresCondiciones: Record<DienteCondicion, string> = {
    sano: "bg-green-100 border-green-400",
    caries: "bg-red-100 border-red-400",
    restauracion: "bg-blue-100 border-blue-400",
    ausente: "bg-gray-200 border-gray-400",
    sellante: "bg-yellow-100 border-yellow-400",
    corona: "bg-purple-100 border-purple-400",
    movilidad: "bg-orange-100 border-orange-400",
    fractura: "bg-pink-100 border-pink-400"
  };

  // Iconos para condiciones
  const iconosCondiciones: Record<DienteCondicion, string> = {
    sano: "✓",
    caries: "🦷",
    restauracion: "🛠️",
    ausente: "✖",
    sellante: "🔒",
    corona: "👑",
    movilidad: "↔️",
    fractura: "⚡"
  };

  // Manejar selección de diente
  const manejarClickDiente = (diente: number) => {
    setDienteSeleccionado(diente);
    setDienteInput(diente.toString());
    
    // Si ya existe información del diente, cargarla en los inputs
    if (condiciones[diente]) {
      setCondicionInput(condiciones[diente].condicion);
      setObservacionesInput(condiciones[diente].observaciones);
    } else {
      setCondicionInput("sano");
      setObservacionesInput("");
    }
  };

  // Agregar condición al diente
  const agregarCondicion = () => {
    if (!dienteInput) return;
    
    const numeroDiente = parseInt(dienteInput);
    if (isNaN(numeroDiente) || numeroDiente < 11 || numeroDiente > 48) return;

    const nuevaCondicion: DienteEstado = {
      numero: numeroDiente,
      condicion: condicionInput,
      observaciones: observacionesInput
    };

    setCondiciones(prev => ({
      ...prev,
      [numeroDiente]: nuevaCondicion
    }));

    // Agregar al historial de tratamientos si no es "sano"
    if (condicionInput !== "sano") {
      const nuevoTratamiento: Tratamiento = {
        fecha: new Date().toLocaleDateString(),
        diente: numeroDiente,
        procedimiento: condicionInput,
        observaciones: observacionesInput
      };
      
      setTratamientos(prev => [...prev, nuevoTratamiento]);
    }

    // Limpiar inputs
    setDienteInput("");
    setCondicionInput("sano");
    setObservacionesInput("");
    setDienteSeleccionado(null);
  };

  // Manejar navegación
  const handlePacientesPendientes = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/pacientes-nuevos");
  };

  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <TitleCard 
          title="Odontología" 
          icon={<File className="h-8 w-8" />} 
        />
      </main>

      <div className="w-full px-8">
        <div className={`w-full max-w-6xl border rounded-xl shadow-sm p-6 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}>
          <FichaEstudiante />

          {/* Odontograma */}
          <div className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
            }`}>Odontograma</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cuadrantes.map((cuadrante) => (
                <div
                  key={cuadrante.id}
                  className={`p-4 rounded-xl shadow-sm border ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`text-lg font-semibold text-center mb-4 pb-2 border-b ${
                    theme === 'dark' ? 'border-gray-600 text-blue-400' : 'border-gray-200 text-blue-900'
                  }`}>
                    {cuadrante.nombre}
                  </h3>
                  <div className={`flex ${cuadrante.clase} flex-wrap gap-3 justify-center`}>
                    {cuadrante.dientes.map((diente) => (
                      <div
                        key={diente}
                        onClick={() => manejarClickDiente(diente)}
                        className={`w-12 h-16 flex flex-col items-center justify-center rounded-md border-2 cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 ${
                          condiciones[diente] 
                            ? coloresCondiciones[condiciones[diente].condicion] 
                            : "bg-white border-gray-300"
                        } ${
                          dienteSeleccionado === diente 
                            ? "ring-2 ring-indigo-500" 
                            : ""
                        }`}
                      >
                        <span className={`font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-700'
                        }`}>{diente}</span>
                        {condiciones[diente] && (
                          <span className="text-xs mt-1">
                            {iconosCondiciones[condiciones[diente].condicion]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Leyenda */}
            <div className={`mt-6 p-4 rounded-lg shadow-sm border ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-semibold text-center mb-3 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
              }`}>Leyenda</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {Object.entries(coloresCondiciones).map(([key, colorClass]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-sm ${
                      colorClass.replace("100", "300").replace("border", "bg")
                    }`}></div>
                    <span className={`capitalize text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registro de condiciones dentales */}
          <Card className={`p-6 mb-6 border ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
            }`}>
              {dienteSeleccionado 
                ? `Registro para diente ${dienteSeleccionado}` 
                : "Registro de Condiciones Dentales"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className={`p-4 rounded-md shadow-sm border ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                }`}>Diente afectado</p>
                <Input
                  type="number"
                  placeholder="Número FDI (ej. 11, 36)"
                  value={dienteInput}
                  onChange={(e) => setDienteInput(e.target.value)}
                  className={`border-none outline-none ${
                    theme === 'dark' 
                      ? 'bg-gray-600 text-white placeholder-gray-400' 
                      : 'bg-transparent text-gray-700 placeholder-gray-400'
                  }`}
                />
              </div>

              <div className={`p-4 rounded-md shadow-sm border ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
                }`}>Condición</p>
                <select 
                  value={condicionInput}
                  onChange={(e) => setCondicionInput(e.target.value as DienteCondicion)}
                  className={`w-full p-2 rounded ${
                    theme === 'dark' 
                      ? 'bg-gray-500 text-white border-gray-400' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <option value="sano">Sano</option>
                  <option value="caries">Caries</option>
                  <option value="restauracion">Restauración</option>
                  <option value="ausente">Ausente</option>
                  <option value="sellante">Sellante</option>
                  <option value="corona">Corona</option>
                  <option value="movilidad">Movilidad</option>
                  <option value="fractura">Fractura</option>
                </select>
              </div>
            </div>

            <div className={`p-4 rounded-md shadow-sm border mb-4 ${
              theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
              }`}>Observaciones</p>
              <textarea
                placeholder="Detalles de la condición..."
                value={observacionesInput}
                onChange={(e) => setObservacionesInput(e.target.value)}
                className={`w-full p-2 rounded border ${
                  theme === 'dark' 
                    ? 'bg-gray-500 text-white border-gray-400' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={agregarCondicion}
                className={`${
                  theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={!dienteInput}
              >
                {dienteSeleccionado ? "Actualizar Diente" : "Agregar Condición"}
              </Button>
            </div>
          </Card>

          {/* Historial de tratamientos */}
          <Card className={`p-6 mb-6 border ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
            }`}>Historial de Tratamientos</h3>
            
            {tratamientos.length > 0 ? (
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
                    {tratamientos.map((tratamiento, index) => (
                      <tr key={index} className={`border-b ${
                        theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                      }`}>
                        <td className="p-2">{tratamiento.fecha}</td>
                        <td className="p-2">{tratamiento.diente}</td>
                        <td className="p-2 capitalize">{tratamiento.procedimiento}</td>
                        <td className="p-2">{tratamiento.observaciones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={`text-center py-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>No hay tratamientos registrados</p>
            )}
          </Card>

          {/* Diagnóstico */}
          <SeleccionDiagnostico />

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
              type="button"
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