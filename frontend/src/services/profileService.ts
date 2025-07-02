import type { DoctorInfo } from "@/types/profileTypes";

const API_BASE_URL = "/api";

export const ProfileService = {
  async getDoctorProfile(): Promise<DoctorInfo | null> {
    // En desarrollo sin backend, retornar null directamente
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/doctor-profile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validación básica de los datos requeridos
      if (!data.name || !data.email) {
        throw new Error("Datos del perfil incompletos");
      }

      return {
        id: data.id,
        name: data.name,
        specialty: data.specialty || "No especificada",
        email: data.email,
        location: data.location || "No especificada",
        documentType: data.tipoDocumento,
        documentNumber: data.numDocumento,
        licenseNumber: data.numLicencia,
        phone: data.telefono,
        lastAccess: data.ultimoAcceso ? new Date(data.ultimoAcceso) : undefined,
        registrationDate: data.fechaRegistro ? new Date(data.fechaRegistro) : new Date()
      };
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      return null;
    }
  }
};