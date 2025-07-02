import type { PatientSearchResult, SearchFilters } from "@/types/searchTypes";

const API_BASE_URL = "/api";

export const SearchService = {
  async searchPatients(filters: SearchFilters): Promise<PatientSearchResult[]> {
    // En desarrollo sin backend, retornar array vacío
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    try {
      const queryParams = new URLSearchParams();
      
      if (filters.cui) queryParams.append('cui', filters.cui);
      if (filters.nombre) queryParams.append('nombre', filters.nombre);
      if (filters.fechaInicio) queryParams.append('fechaInicio', filters.fechaInicio.toISOString());
      if (filters.fechaFin) queryParams.append('fechaFin', filters.fechaFin.toISOString());

      const response = await fetch(`${API_BASE_URL}/patients/search?${queryParams.toString()}`, {
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
        cui: item.cui,
        nombre: `${item.nombres} ${item.apellidos}`,
        fechaNacimiento: new Date(item.fechaNacimiento),
        fechaRegistro: new Date(item.fechaRegistro),
        programaAcademico: item.programaAcademico?.nombre || "No especificado",
        genero: item.genero === 'F' ? 'Femenino' : 'Masculino'
      }));
    } catch (error) {
      console.error("Error searching patients:", error);
      return [];
    }
  }
};