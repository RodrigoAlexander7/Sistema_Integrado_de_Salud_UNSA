export interface PatientSearchResult {
  cui: string;
  nombre: string;
  fechaNacimiento: Date;
  fechaRegistro: Date;
  programaAcademico: string;
  genero: string;
}

export interface SearchFilters {
  cui?: string;
  nombre?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}