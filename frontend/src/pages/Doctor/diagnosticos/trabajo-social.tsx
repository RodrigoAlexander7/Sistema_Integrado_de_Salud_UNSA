import React, { useState } from "react";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { useNavigate } from "react-router-dom";
import { DiagnosticoService } from "@/services/diagnosticoService";

const DiagnosticoTrabSoc: React.FC = () => {
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
  const navigate = useNavigate();

  const handleChangeCampo = (campo: string, valor: string) => {
    setValoresCampos(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ID del paciente (en producción vendría de los parámetros o estado global)
      const pacienteId = 1; 
      
      const response = await DiagnosticoService.saveDiagnostico({
        pacienteId,
        evaluaciones: valoresCampos,
        diagnosticos: {
          principal: diagnosticoPrincipal,
          secundarios: diagnosticosSecundarios
        },
        especialidad: "trabajo_social", // Identificador para el backend
      });

      if (response.success) {
        alert("Informe de Trabajo Social guardado correctamente");
        console.log("Diagnóstico guardado:", response);
        navigate("/pacientes-pendientes"); // Redirige a la ruta especificada
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
      rutaCancelar="/pacientes-pendientes" // Mantenemos la ruta personalizada
    />
  );
};

export default DiagnosticoTrabSoc;