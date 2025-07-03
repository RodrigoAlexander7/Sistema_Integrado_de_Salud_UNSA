import React, { useState } from "react";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { useNavigate } from "react-router-dom";
import { DiagnosticoService } from "@/services/diagnosticoService";

const DiagnosticoMedicinaGeneral: React.FC = () => {
  const camposEvaluacion = [
    "Evaluación General",
    "Diagnóstico General", 
    "Observaciones"
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
      // Simulamos un pacienteId - en una app real esto vendría del estado o params
      const pacienteId = 1; 
      
      const response = await DiagnosticoService.saveDiagnostico({
        pacienteId,
        evaluaciones: valoresCampos,
        diagnosticos: {
          principal: diagnosticoPrincipal,
          secundarios: diagnosticosSecundarios
        },
        especialidad: "medicina general"
      });

      if (response.success) {
        alert("Diagnóstico guardado correctamente"); // Opción 1: alert básico
        console.log("Diagnóstico guardado:", response); // Opción 2: log para desarrollo
        navigate(`/pacientes/${pacienteId}`);
      }
    } catch (error) {
      alert("Error al guardar el diagnóstico"); // Opción 1
      console.error("Error al guardar:", error); // Opción 2
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