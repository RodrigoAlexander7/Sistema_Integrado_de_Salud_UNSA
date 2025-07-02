export interface MedicalStaff {
  id: number;
  nombre: string;
  apellidos: string;
  especialidad: string;
  disponibilidad: "disponible" | "no_disponible";
  correo: string;
  telefono: string;
  tipo: "medico" | "enfermera" | "administrativo";
  sede?: string;
  consultorio?: string;
}

export interface DirectoryFilters {
  especialidad?: string;
  disponibilidad?: "disponible" | "no_disponible";
  tipo?: "medico" | "enfermera" | "administrativo";
  sede?: string;
}