import React, { useState, useEffect } from "react";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { useNavigate, useParams } from "react-router-dom";
import { DiagnosticoService } from "@/services/diagnosticoService";

const DiagnosticoMedicinaGeneral: React.FC = () => {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const camposEvaluacion = [
    "Evaluación General",
    "Diagnóstico General", 
    "Observaciones"
  ];

  const [valoresCampos, setValoresCampos] = useState<Record<string, string>>({});
  const [diagnosticoPrincipal, setDiagnosticoPrincipal] = useState("");
  const [diagnosticosSecundarios, setDiagnosticosSecundarios] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setPacienteData] = useState<any>(null);
  const navigate = useNavigate();

  // Efecto para cargar datos del paciente al montar el componente
  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        // Simulación de fetch de datos del paciente
        // En una implementación real, usarías un servicio como PacienteService.getById(pacienteId)
        const mockData = {
          id: pacienteId,
          nombre: "Juan Pérez",
          cui: "1234567890123",
          fechaNacimiento: "1990-01-01"
        };
        setPacienteData(mockData);
      } catch (error) {
        console.error("Error cargando datos del paciente:", error);
      }
    };

    if (pacienteId) {
      fetchPacienteData();
    }
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
        especialidad: "medicina general"
      });

      if (response.success) {
        alert("Diagnóstico guardado correctamente");
        navigate(`/pacientes/${pacienteId}`);
      }
    } catch (error) {
      alert("Error al guardar el diagnóstico");
      console.error("Error al guardar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DiagnosticoBase 
      tituloEspecialidad="Medicina General"
      camposEvaluacion={camposEvaluacion}
      onSubmit={handleSubmit}
      onDiagnosticoPrincipalChange={setDiagnosticoPrincipal}
      onDiagnosticosSecundariosChange={setDiagnosticosSecundarios}
      onCampoChange={handleChangeCampo}
      isSubmitting={isSubmitting}
    />
  );
};

export default DiagnosticoMedicinaGeneral;