import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { DiagnosticoService } from "@/services/diagnosticoService";
import { PatientService } from "@/services/patientService";
import type { Patient } from "@/types/patientTypes";
import { Card } from "@/components/ui/card";

// Tipos específicos para odontología
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

interface DatosOdontologicos {
  condiciones: Record<number, DienteEstado>;
  tratamientos: Tratamiento[];
}

interface PatientWithDentalData extends Patient {
  datosOdontologicos?: DatosOdontologicos;
}

const Odontograma: React.FC = () => {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setPacienteData] = useState<PatientWithDentalData | null>(null);

  // Estados para el diagnóstico
  const [diagnosticoPrincipal, setDiagnosticoPrincipal] = useState("");
  const [diagnosticosSecundarios, setDiagnosticosSecundarios] = useState<string[]>([]);

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

  // Cargar datos del paciente al montar el componente
  useEffect(() => {
    const cargarDatosPaciente = async () => {
      if (!pacienteId) return;

      try {
        // En desarrollo usar datos mock
        if (process.env.NODE_ENV === "development") {
          const mockPaciente = {
          id: Number(pacienteId),
          documentType: "DNI",
          documentNumber: "12345678",
          firstName: "Paciente",
          lastName: "Ejemplo",
          birthDate: new Date("1990-01-01"),
          gender: "M",
          bloodType: "O+",
          allergies: "Ninguna",
          vitalSigns: {
            bloodPressure: "120/80",
            temperature: 36.5,
            heartRate: 75,
            respiratoryRate: 18,
            oxygenSaturation: 98,
            weight: 70,
            height: 1.75,
            bmi: 22.9,
            registrationDate: new Date()
          },
          datosOdontologicos: undefined
        } as PatientWithDentalData;

          setPacienteData(mockPaciente);
          return;
        }

        // En producción usar el servicio real
        // Modificado para usar getNewPatient ya que getPatientById no existe
        const paciente = await PatientService.getNewPatient();
        if (!paciente) {
          console.warn("No se encontraron datos del paciente");
          return;
        }

        // Hacer type assertion para incluir datos odontológicos
        const pacienteConDatos = paciente as PatientWithDentalData;
        setPacienteData(pacienteConDatos);

        // Cargar datos odontológicos previos si existen
        if (pacienteConDatos.datosOdontologicos) {
          setCondiciones(pacienteConDatos.datosOdontologicos.condiciones || {});
          setTratamientos(pacienteConDatos.datosOdontologicos.tratamientos || []);
        }
      } catch (error) {
        console.error("Error cargando datos del paciente:", error);
      }
    };

    cargarDatosPaciente();
  }, [pacienteId]);

  // Función para datos mock en desarrollo

  // Manejar selección de diente
  const manejarClickDiente = (diente: number) => {
    setDienteSeleccionado(diente);
    setDienteInput(diente.toString());
    
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

  // Función para enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!pacienteId) throw new Error("ID de paciente no definido");

      const datosParaBackend = {
        pacienteId: parseInt(pacienteId),
        evaluaciones: {
          "Odontograma": generarResumenOdontograma(),
          "Tratamientos realizados": generarResumenTratamientos(),
          "Observaciones dentales": "Ver odontograma completo"
        },
        diagnosticos: {
          principal: diagnosticoPrincipal,
          secundarios: diagnosticosSecundarios
        },
        especialidad: "odontologia",
        datosOdontologicos: {
          condiciones,
          tratamientos
        }
      };

      const response = await DiagnosticoService.saveDiagnostico(datosParaBackend);

      if (response.success) {
        alert("Diagnóstico odontológico guardado correctamente");
        navigate("/pacientes-nuevos");
      }
    } catch (error) {
      console.error("Error al guardar el diagnóstico:", error);
      alert("Error al guardar el diagnóstico odontológico");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función auxiliar para generar resumen del odontograma
  const generarResumenOdontograma = (): string => {
    const dientesConProblemas = Object.values(condiciones)
      .filter(d => d.condicion !== "sano")
      .map(d => `Diente ${d.numero}: ${d.condicion} (${d.observaciones || 'sin observaciones'})`);
    
    return dientesConProblemas.length > 0 
      ? dientesConProblemas.join("; ") 
      : "Todos los dientes están sanos";
  };

  // Función auxiliar para generar resumen de tratamientos
  const generarResumenTratamientos = (): string => {
    return tratamientos.length > 0
      ? tratamientos.map(t => 
          `${t.fecha} - D${t.diente}: ${t.procedimiento} (${t.observaciones || 'sin observaciones'})`
        ).join("; ")
      : "No se realizaron tratamientos";
  };

  // Renderizar el odontograma
  const renderOdontograma = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Odontograma</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cuadrantes.map((cuadrante) => (
            <Card key={cuadrante.id} className="p-4">
              <h3 className="text-lg font-semibold text-center mb-4 pb-2 border-b">
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
                      dienteSeleccionado === diente ? "ring-2 ring-indigo-500" : ""
                    }`}
                  >
                    <span className="font-bold">{diente}</span>
                    {condiciones[diente] && (
                      <span className="text-xs mt-1">
                        {getIconoCondicion(condiciones[diente].condicion)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Leyenda */}
        <Card className="mt-6 p-4">
          <h3 className="font-semibold text-center mb-3">Leyenda</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(coloresCondiciones).map(([key, colorClass]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-sm ${
                  colorClass.replace("100", "300").replace("border", "bg")
                }`}></div>
                <span className="capitalize text-sm">{key}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Registro de condiciones dentales */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {dienteSeleccionado 
            ? `Registro para diente ${dienteSeleccionado}` 
            : "Registro de Condiciones Dentales"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-md shadow-sm bg-gray-50">
            <p className="font-semibold mb-2">Diente afectado</p>
            <input
              type="number"
              placeholder="Número FDI (ej. 11, 36)"
              value={dienteInput}
              onChange={(e) => setDienteInput(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="p-4 rounded-md shadow-sm bg-gray-50">
            <p className="font-semibold mb-2">Condición</p>
            <select 
              value={condicionInput}
              onChange={(e) => setCondicionInput(e.target.value as DienteCondicion)}
              className="w-full p-2 rounded border"
            >
              {Object.keys(coloresCondiciones).map((condicion) => (
                <option key={condicion} value={condicion}>
                  {condicion.charAt(0).toUpperCase() + condicion.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 rounded-md shadow-sm bg-gray-50 mb-4">
          <p className="font-semibold mb-2">Observaciones</p>
          <textarea
            placeholder="Detalles de la condición..."
            value={observacionesInput}
            onChange={(e) => setObservacionesInput(e.target.value)}
            className="w-full p-2 rounded border"
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={agregarCondicion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={!dienteInput}
          >
            {dienteSeleccionado ? "Actualizar Diente" : "Agregar Condición"}
          </button>
        </div>
      </Card>

      {/* Historial de tratamientos */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Historial de Tratamientos</h3>
        
        {tratamientos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Fecha</th>
                  <th className="p-2 text-left">Diente</th>
                  <th className="p-2 text-left">Procedimiento</th>
                  <th className="p-2 text-left">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {tratamientos.map((tratamiento, index) => (
                  <tr key={index} className="border-b">
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
          <p className="text-center py-4 text-gray-500">No hay tratamientos registrados</p>
        )}
      </Card>
    </div>
  );

  // Obtener icono para condición
  const getIconoCondicion = (condicion: DienteCondicion): string => {
    const iconos: Record<DienteCondicion, string> = {
      sano: "✓",
      caries: "🦷",
      restauracion: "🛠️",
      ausente: "✖",
      sellante: "🔒",
      corona: "👑",
      movilidad: "↔️",
      fractura: "⚡"
    };
    return iconos[condicion];
  };

  return (
    <DiagnosticoBase 
      tituloEspecialidad="Odontología"
      camposEvaluacion={["Odontograma"]}
      onSubmit={handleSubmit}
      onDiagnosticoPrincipalChange={setDiagnosticoPrincipal}
      onDiagnosticosSecundariosChange={setDiagnosticosSecundarios}
      isSubmitting={isSubmitting}
      onCampoChange={() => {}}
      rutaCancelar="/pacientes-nuevos"
    >
      {renderOdontograma()}
    </DiagnosticoBase>
  );
};

export default Odontograma;