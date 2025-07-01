import type { Patient, DiagnosisRequest, DiagnosisResponse } from "@/types/patientTypes";

const API_BASE_URL = "/api";

// Definición mejorada de AuthHeaders con firma de índice
interface AuthHeaders extends Record<string, string> {
  "Authorization": string;
  "Content-Type": string;
}

function getAuthHeaders(): AuthHeaders {
  const token = localStorage.getItem('token') || '';
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export const PatientService = {
  async getNewPatient(): Promise<Patient | null> {
    if (process.env.NODE_ENV === 'development') {
    return null; // Muestra EmptyCard
  }

    try {
      const response = await fetch(`${API_BASE_URL}/patients/new`, {
        headers: getAuthHeaders()
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validación básica de la respuesta
      if (!data.id || !data.nombres || !data.apellidos) {
        throw new Error("Datos del paciente incompletos");
      }

      return {
        id: data.id,
        documentType: data.tipoDocumento,
        documentNumber: data.numDocumento,
        firstName: data.nombres,
        lastName: data.apellidos,
        birthDate: new Date(data.fechaNacimiento),
        gender: data.genero,
        bloodType: data.grupoSanguineo || null,
        allergies: data.alergias || null,
        vitalSigns: {
          bloodPressure: data.signosVitales?.presionArterial || null,
          temperature: data.signosVitales?.temperatura ?? null,
          heartRate: data.signosVitales?.frecuenciaCardiaca ?? null,
          respiratoryRate: data.signosVitales?.frecuenciaRespiratoria ?? null,
          oxygenSaturation: data.signosVitales?.saturacionOxigeno ?? null,
          weight: data.signosVitales?.peso ?? null,
          height: data.signosVitales?.altura ?? null,
          bmi: data.signosVitales?.imc ?? null,
          registrationDate: data.signosVitales?.fechaRegistro ? new Date(data.signosVitales.fechaRegistro) : new Date()
        }
      };
    } catch (error) {
        console.error(error);
        return null; // EmptyCard en vez de error
    }
  },

  async startDiagnosis(data: DiagnosisRequest): Promise<DiagnosisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/diagnosis/start`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Validación de la respuesta
      if (typeof result.success !== 'boolean' || !result.episodeId) {
        throw new Error("Respuesta del servidor inválida");
      }

      return {
        success: result.success,
        episodeId: result.episodeId,
        clinicalRecordId: result.clinicalRecordId
      };
    } catch (error) {
      console.error("Error starting diagnosis:", error);
      throw error;
    }
  }
};