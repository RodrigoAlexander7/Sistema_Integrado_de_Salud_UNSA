import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiagnosticoBase from "@/components/DiagnosticoBase";
import { DiagnosticoService } from "@/services/diagnosticoService";
import { PatientService } from "@/services/patientService";
import RefraccionSection from "@/components/DiagnosticoOftalmologia/RefraccionSection";
import AgudezaVisualSection from "@/components/DiagnosticoOftalmologia/AgudezaVisualSection";
import ObservacionesSection from "@/components/DiagnosticoOftalmologia/Observaciones";
import PresionIntraocularSection from "@/components/DiagnosticoOftalmologia/PresionIntraOcularSection";
import MotilidadOcularSection from "@/components/DiagnosticoOftalmologia/MotilidadOcularSection";
import type { Patient } from "@/types/patientTypes";
import type { DatosOftalmologicos } from "@/types/patientTypes";

const [] = useState<Patient | undefined>(undefined);
const [] = useState<DatosOftalmologicos>({
  agudezaVisual: {
    sinCorreccion: { odLejos: "", odCerca: "", oiLejos: "", oiCerca: "" },
    conCorreccion: {
      odLejos: "", odCerca: "", oiLejos: "", oiCerca: "",
      lentesOd: "", lentesOi: ""
    }
  },
  refraccion: {
    odEsfera: "", odCilindro: "", odEje: "", odAv: "",
    oiEsfera: "", oiCilindro: "", oiEje: "", oiAv: ""
  },
  presionIntraocular: {
    odValor: "", odHora: "", odMetodo: "Tonómetro de aire",
    oiValor: "", oiHora: "", oiMetodo: "Tonómetro de aire"
  },
  motilidadOcular: {
    derechaOd: "Normal", derechaOi: "Normal",
    izquierdaOd: "Normal", izquierdaOi: "Normal",
    arribaOd: "Normal", arribaOi: "Normal",
    abajoOd: "Normal", abajoOi: "Normal"
  },
  observaciones: ""
});

const DiagnosticoOftalmologia: React.FC = () => {
  const navigate = useNavigate();
  const { pacienteId } = useParams<{ pacienteId: string }>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setPacienteData] = useState<any>(null);
  const [diagnosticoPrincipal, setDiagnosticoPrincipal] = useState("");
  const [diagnosticosSecundarios, setDiagnosticosSecundarios] = useState<string[]>([]);

  const [formData, setFormData] = useState<DatosOftalmologicos>({
  agudezaVisual: {
    sinCorreccion: { odLejos: "", odCerca: "", oiLejos: "", oiCerca: "" },
    conCorreccion: { odLejos: "", odCerca: "", oiLejos: "", oiCerca: "", lentesOd: "", lentesOi: "" }
  },
  refraccion: {
    odEsfera: "", odCilindro: "", odEje: "", odAv: "",
    oiEsfera: "", oiCilindro: "", oiEje: "", oiAv: ""
  },
  presionIntraocular: {
    odValor: "", odHora: "", odMetodo: "Tonómetro de aire",
    oiValor: "", oiHora: "", oiMetodo: "Tonómetro de aire"
  },
  motilidadOcular: {
    derechaOd: "Normal", derechaOi: "Normal",
    izquierdaOd: "Normal", izquierdaOi: "Normal",
    arribaOd: "Normal", arribaOi: "Normal",
    abajoOd: "Normal", abajoOi: "Normal"
  },
  observaciones: ""
});


  const camposEvaluacion = [
    "Agudeza Visual",
    "Refracción",
    "Presión Intraocular",
    "Motilidad Ocular",
    "Observaciones"
  ];

  useEffect(() => {
  const cargarDatosPaciente = async () => {
    if (!pacienteId) return;

    try {
      let paciente: Patient | null;

      if (process.env.NODE_ENV === "development") {
        paciente = {
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
          datosOftalmologicos: undefined // <- aquí puedes poner datos simulados si quieres
        };
      } else {
        paciente = await PatientService.getNewPatient();
      }

      if (!paciente) {
        console.warn("No se encontraron datos del paciente");
        return;
      }

      setPacienteData(paciente);

      if (paciente.datosOftalmologicos) {
        setFormData(paciente.datosOftalmologicos);
      }

    } catch (error) {
      console.error("Error cargando datos del paciente:", error);
    }
  };

  cargarDatosPaciente();
}, [pacienteId]);

const handleChange = <
  K extends keyof DatosOftalmologicos,
  F extends keyof DatosOftalmologicos[K]
>(
  section: K,
  field: F,
  value: DatosOftalmologicos[K][F]
) => {
  setFormData(prev => ({
    ...prev,
    [section]: {
      ...(prev[section] as any),
      [field]: value
    }
  }));
};


const handleNestedChange = <
  K extends keyof DatosOftalmologicos,
  S extends keyof DatosOftalmologicos[K],
  F extends keyof DatosOftalmologicos[K][S]
>(
  section: K,
  subSection: S,
  field: F,
  value: DatosOftalmologicos[K][S][F]
) => {
  setFormData(prev => ({
    ...prev,
    [section]: {
      ...(prev[section] as any),
      [subSection]: {
        ...(prev[section] as any)[subSection],
        [field]: value
      }
    }
  }));
};

  const handleSelectChange = (name: string, value: string) => {
  const keys = name.split(".");
  if (keys.length === 2) {
    setFormData(prev => ({
      ...prev,
      [keys[0]]: {
        ...(prev as any)[keys[0]],
        [keys[1]]: value
      }
    }));
  } else if (keys.length === 3) {
    setFormData(prev => ({
      ...prev,
      [keys[0]]: {
        ...(prev as any)[keys[0]],
        [keys[1]]: {
          ...(prev as any)[keys[0]][keys[1]],
          [keys[2]]: value
        }
      }
    }));
  }
};

const handleCampoChange = (_campo: string, valor: string) => {
  setFormData(prev => ({ ...prev, observaciones: valor }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!pacienteId) throw new Error("ID de paciente no definido");

      const datosParaBackend = {
        pacienteId: parseInt(pacienteId),
        evaluaciones: {
          "Agudeza Visual (sin corrección)": `OD: ${formData.agudezaVisual.sinCorreccion.odLejos}/${formData.agudezaVisual.sinCorreccion.odCerca} | OI: ${formData.agudezaVisual.sinCorreccion.oiLejos}/${formData.agudezaVisual.sinCorreccion.oiCerca}`,
          "Agudeza Visual (con corrección)": `OD: ${formData.agudezaVisual.conCorreccion.odLejos}/${formData.agudezaVisual.conCorreccion.odCerca} (${formData.agudezaVisual.conCorreccion.lentesOd}) | OI: ${formData.agudezaVisual.conCorreccion.oiLejos}/${formData.agudezaVisual.conCorreccion.oiCerca} (${formData.agudezaVisual.conCorreccion.lentesOi})`,
          "Refracción": `OD: ${formData.refraccion.odEsfera} ${formData.refraccion.odCilindro} x${formData.refraccion.odEje} (AV:${formData.refraccion.odAv}) | OI: ${formData.refraccion.oiEsfera} ${formData.refraccion.oiCilindro} x${formData.refraccion.oiEje} (AV:${formData.refraccion.oiAv})`,
          "Presión Intraocular": `OD: ${formData.presionIntraocular.odValor}mmHg (${formData.presionIntraocular.odMetodo}) | OI: ${formData.presionIntraocular.oiValor}mmHg (${formData.presionIntraocular.oiMetodo})`,
          "Motilidad Ocular": `Derecha: OD-${formData.motilidadOcular.derechaOd}/OI-${formData.motilidadOcular.derechaOi} | Izquierda: OD-${formData.motilidadOcular.izquierdaOd}/OI-${formData.motilidadOcular.izquierdaOi} | Arriba: OD-${formData.motilidadOcular.arribaOd}/OI-${formData.motilidadOcular.arribaOi} | Abajo: OD-${formData.motilidadOcular.abajoOd}/OI-${formData.motilidadOcular.abajoOi}`,
          Observaciones: formData.observaciones
        },
        diagnosticos: {
          principal: diagnosticoPrincipal,
          secundarios: diagnosticosSecundarios
        },
        especialidad: "oftalmologia",
        datosOftalmologicos: formData
      };

      const response = await DiagnosticoService.saveDiagnostico(datosParaBackend);

      if (response.success) {
        alert("Diagnóstico oftalmológico guardado correctamente");
        navigate("/pacientes-nuevos");
      }
    } catch (error) {
      console.error("Error al guardar el diagnóstico:", error);
      alert("Error al guardar el diagnóstico oftalmológico");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DiagnosticoBase 
      tituloEspecialidad="Oftalmología"
      camposEvaluacion={camposEvaluacion}
      onSubmit={handleSubmit}
      onDiagnosticoPrincipalChange={setDiagnosticoPrincipal}
      onDiagnosticosSecundariosChange={setDiagnosticosSecundarios}
      isSubmitting={isSubmitting}
      rutaCancelar="/pacientes-pendientes"
      onCampoChange={handleCampoChange}
    >
      <div className="space-y-6">
        <AgudezaVisualSection 
          formData={formData} 
          handleNestedChange={handleNestedChange} 
        />

        <RefraccionSection 
          formData={formData} 
          handleChange={handleChange} 
        />

        <PresionIntraocularSection 
          formData={formData} 
          handleChange={handleChange} 
          handleSelectChange={handleSelectChange} 
        />

        <MotilidadOcularSection 
          formData={formData} 
          handleSelectChange={handleSelectChange} 
        />

        <ObservacionesSection 
          value={formData.observaciones} 
          onChange={(value) => 
            setFormData(prev => ({ ...prev, observaciones: value }))
          }
        />
      </div>
    </DiagnosticoBase>
  );
}

export default DiagnosticoOftalmologia;
