import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { TipoUsuario } from '../generated/prisma';
import { PacienteService } from '../services/paciente.service';
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
   activo?: boolean;
   programaAcademicoId: number,
}

export class PatientController{
   constructor(
      private pacienteService: PacienteService 
   ) {}
   createPatient = async (req:Request<{},{},PutPersonalDataRequest>, res: Response) => {
      try{
         logger.info('Datos recibidos en register:', {
            body: req.body,
         });
         const {
            tipoDocumento,
            numDocumento,
            nombres,
            apellidos,
            fechaNacimiento,
            genero,
            direccion,
            telefono,
            correo,
            grupoSanguineo,
            alergias,
            antecedentesFamiliares,
            estadoCivil,
            activo = true,
            programaAcademicoId
         } = req.body;

         const resutl = await this.pacienteService.createPatient({
            tipoDocumento,
            numDocumento,
            nombres,
            apellidos,
            fechaNacimiento: new Date(fechaNacimiento),
            genero,
            direccion,
            telefono,
            correo,
            grupoSanguineo,
            alergias,
            antecedentesFamiliares,
            estadoCivil,
            activo,
            programaAcademicoId
         })
         logger.info(`Usuario registrado exitosamente: ${correo}`);

         res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
         });

      }catch (error: any){
         logger.error('Error en registro:', { 
            error: error.message,
            stack: error.stack 
         });
      }
   }  
}


