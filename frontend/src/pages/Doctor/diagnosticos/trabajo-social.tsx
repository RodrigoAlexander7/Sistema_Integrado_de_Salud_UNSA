import React, { useState, useEffect } from "react";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { useNavigate, useParams } from "react-router-dom";
import { DiagnosticoService } from "@/services/diagnosticoService";

const DiagnosticoTrabSoc: React.FC = () => {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const camposEvaluacion = [
    "Evaluación Socioeconómica",
    "Dinámica Familiar", 
    "Redes de Apoyo",
    "Intervención y seguimiento de caso"
  ];

  const [valoresCampos, setValoresCampos] = useState<Record<string, string>>({});
  const [diagnosticoPrincipal, setDiagnosticoPrincipal] = useState("");
  const [diagnosticosSecundarios, setDiagnosticosSecundarios] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setPacienteData] = useState<any>(null);
  const navigate = useNavigate();

  // Cargar datos del paciente al montar el componente
  useEffect(() => {
    const loadPacienteData = async () => {
      if (pacienteId) {
        try {
          // Simulación de datos - reemplazar con llamada real al servicio
          const mockData = {
            id: pacienteId,
            nombre: "Paciente Ejemplo",
            cui: "1234567890123",
            fechaNacimiento: "1990-01-01",
            // Datos específicos para trabajo social
            situacionEconomica: "",
            composicionFamiliar: ""
          };
          setPacienteData(mockData);
        } catch (error) {
          console.error("Error cargando datos del paciente:", error);
        }
      }
    };

    loadPacienteData();
  }, [pacienteId]);

  const handleChangeCampo = (campo: string, valor: string) => {
    setValoresCampos(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!pacienteId) {
        throw new Error("ID de paciente no definido");
      }
      
      const response = await DiagnosticoService.saveDiagnostico({
        pacienteId: parseInt(pacienteId),
        evaluaciones: valoresCampos,
        diagnosticos: {
          principal: diagnosticoPrincipal,
          secundarios: diagnosticosSecundarios
        },
        especialidad: "trabajo_social",
      });

      if (response.success) {
        alert("Informe de Trabajo Social guardado correctamente");
        navigate("/pacientes-pendientes"); // Mantiene la redirección personalizada
      }
    } catch (error) {
      alert("Error al guardar el informe de Trabajo Social");
      console.error("Error al guardar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DiagnosticoBase 
      tituloEspecialidad="Trabajo Social"
      camposEvaluacion={camposEvaluacion}
      onSubmit={handleSubmit}
      onDiagnosticoPrincipalChange={setDiagnosticoPrincipal}
      onDiagnosticosSecundariosChange={setDiagnosticosSecundarios}
      onCampoChange={handleChangeCampo}
      isSubmitting={isSubmitting}
      rutaCancelar="/pacientes-pendientes" // Mantiene la ruta personalizada
    />
  );
};

export default DiagnosticoTrabSoc;