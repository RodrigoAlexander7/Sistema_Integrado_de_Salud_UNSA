export interface DoctorInfo {
  id: number;
  name: string;
  specialty: string;
  email: string;
  location: string;
  documentType?: string;
  documentNumber?: string;
  licenseNumber?: string;
  phone?: string;
  lastAccess?: Date;
  registrationDate?: Date;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}