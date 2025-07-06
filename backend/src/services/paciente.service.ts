import { Paciente } from '../generated/prisma';

import {
   PatientRepository,
   CreatePatientData,
} from '../repositories/paciente.repository';

import { logger } from '../utils/logger';

export class PacienteService {
   constructor(private patienRepository: PatientRepository){}

   createPatient = async (data: CreatePatientData)=> {
      try {
         const patient = await this.patienRepository.createPatientData(data);
         logger.info(`Perfil paciente creado para ${data.nombres}`)
      } catch (error: any) {
         logger.error('Error al crear perfil de paciente:', error);
         throw new Error(error.message || 'Error al crear perfil de paciente');
      }
   }
}