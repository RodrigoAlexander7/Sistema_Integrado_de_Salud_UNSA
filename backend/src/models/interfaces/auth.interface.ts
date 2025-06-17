import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string; // Auth0 user ID
    email: string;
    [key: string]: any;
  };
  auth?: {
    userId: number;
    tipoUsuario: 'MEDICO' | 'ENFERMERA' | 'ADMINISTRADOR';
    [key: string]: any;
  };
}