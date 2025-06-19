export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  nombreUsuario: string;
  tipoUsuario: 'MEDICO' | 'ENFERMERA';
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numDocumento: string;
  numLicencia: string;
  telefono?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken?: string;
  user: UserDto;
}

export interface UserDto {
  id: number;
  nombreUsuario: string;
  email: string;
  tipoUsuario: 'MEDICO' | 'ENFERMERA';
  activo: boolean;
  profile?: MedicoDto | EnfermeraDto;
}

export interface MedicoDto {
  id: number;
  nombres: string;
  apellidos: string;
  numLicencia: string;
  especialidades: string[];
}

export interface EnfermeraDto {
  id: number;
  nombres: string;
  apellidos: string;
  numLicencia: string;
}