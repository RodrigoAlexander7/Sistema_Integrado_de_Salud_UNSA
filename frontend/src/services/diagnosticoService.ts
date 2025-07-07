import type { DiagnosisResponse } from "@/types/patientTypes";

const API_BASE_URL = "/api";

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

export const DiagnosticoService = {
  async saveDiagnostico(data: {
    pacienteId: number;
    evaluaciones: Record<string, string>;
    especialidad: string;
    diagnosticos: {
      principal: string;
      secundarios: string[];
    };
  }): Promise<DiagnosisResponse> {
    // En desarrollo, simulamos una respuesta exitosa
    if (process.env.NODE_ENV === 'development') {
      console.log("Datos que se enviarían al backend:", data);
      return {
        success: true,
        episodeId: Math.floor(Math.random() * 1000),
        clinicalRecordId: Date.now()
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/diagnosis/save`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al guardar diagnóstico:", error);
      throw error;
    }
  }
};