export interface CrearPacienteInput {
  tipoDocumento: string;
  numDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: 'M' | 'F';
  direccion?: string;
  telefono?: string;
  correo?: string;
  grupoSanguineo?: string;
  antecedentesFamiliares?: string;
  estadoCivil?: string;
  programaAcademicoId: number;
  contactosEmergencia: {
    nombres: string;
    apellidos: string;
    parentesco: string;
    telefonoPrincipal: string;
    telefonoSecundario?: string;
    direccion?: string;
  }[];
}