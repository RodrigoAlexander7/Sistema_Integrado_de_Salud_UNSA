import type { MedicalStaff, DirectoryFilters } from "@/types/directoryTypes";

const API_BASE_URL = "/api";

export const DirectoryService = {
  async getMedicalStaff(filters: DirectoryFilters = {}): Promise<MedicalStaff[]> {
    // En desarrollo sin backend, retornar array vacío
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    try {
      const queryParams = new URLSearchParams();
      
      if (filters.especialidad) queryParams.append('especialidad', filters.especialidad);
      if (filters.disponibilidad) queryParams.append('disponibilidad', filters.disponibilidad);
      if (filters.tipo) queryParams.append('tipo', filters.tipo);
      if (filters.sede) queryParams.append('sede', filters.sede);

      const response = await fetch(`${API_BASE_URL}/medical-staff?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validación básica de los datos
      if (!Array.isArray(data)) {
        throw new Error("Formato de respuesta inválido");
      }

      return data.map(item => ({
        id: item.id,
        nombre: item.nombres,
        apellidos: item.apellidos,
        especialidad: item.especialidad?.nombre || "General",
        disponibilidad: item.disponible ? "disponible" : "no_disponible",
        correo: item.correo || item.usuario?.email || "",
        telefono: item.telefono || "",
        tipo: item.tipo || "medico",
        sede: item.consultorio?.sede?.nombre,
        consultorio: item.consultorio?.nombre
      }));
    } catch (error) {
      console.error("Error fetching medical staff:", error);
      return [];
    }
  }
};