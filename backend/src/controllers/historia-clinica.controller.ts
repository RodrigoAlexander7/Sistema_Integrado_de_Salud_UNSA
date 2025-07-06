import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { TipoUsuario } from '../generated/prisma';
import { logger } from '../utils/logger';
import {config} from '../config/environment';

export interface PutPersonalDataRequest {
   tipoDocumento: string;
   numDocumento: string;
   nombres: string;
   apellidos: string;
   fechaNacimiento: string;
   genero: 'M'| 'F'| '*';
   direccion: string;
   telefono: string;
   correo: string;
   grupoSanguineo: string;
   alergias: string;
   antecedentesFamiliares: string;
   estadoCivil: string;
   fechaRegistro?: string;
   activo?: boolean;
}

export class HistoriaClinicaController{
   constructor(
      private usuarioService: UsuarioService 
   ) {}

   
}


