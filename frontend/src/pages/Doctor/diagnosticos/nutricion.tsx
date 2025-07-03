import React, { useState } from "react";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { useNavigate } from "react-router-dom";
import { DiagnosticoService } from "@/services/diagnosticoService";

const DiagnosticoNutricion: React.FC = () => {
  const camposEvaluacion = [
    "Evaluación Nutricional",
    "Diagnóstico Nutricional", 
    "Plan Alimentario",
    "Seguimiento"
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
        // Podemos añadir datos específicos de nutrición si es necesario
        especialidad: "nutricion"
      });

      if (response.success) {
        alert("Diagnóstico nutricional guardado correctamente");
        console.log("Diagnóstico guardado:", response);
        navigate(`/pacientes/${pacienteId}`);
      }
    } catch (error) {
      alert("Error al guardar el diagnóstico nutricional");
      console.error("Error al guardar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DiagnosticoBase 
      tituloEspecialidad="Nutrición"
      camposEvaluacion={camposEvaluacion}
      onSubmit={handleSubmit}
      onDiagnosticoPrincipalChange={setDiagnosticoPrincipal}
      onDiagnosticosSecundariosChange={setDiagnosticosSecundarios}
      onCampoChange={handleChangeCampo}
      isSubmitting={isSubmitting}
    />
  );
};

export default DiagnosticoNutricion;