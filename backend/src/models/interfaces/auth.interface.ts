import { Request } from 'express';

// permite tener autocompletado con las propiedades -> podesmo escribir req.user y req.auth
export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string; // Auth0 user ID -> id unico del usuario en Auth0
    email: string;
    [key: string]: any;
  };
  auth?: {
    userId: number;
    tipoUsuario: 'MEDICO' | 'ENFERMERA' | 'ADMINISTRADOR';
    [key: string]: any;
  };
}