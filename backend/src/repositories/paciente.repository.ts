import { Usuario, Medico, Enfermera, TipoUsuario, ProgramaAcademico } from '../generated/prisma';
import { BaseRepository } from './base.repository';

export interface CreatePatientData {
   tipoDocumento: string;
   numDocumento: string;
   nombres: string;
   apellidos: string;
   fechaNacimiento: Date;
   genero: string;
   direccion?: string;
   telefono?: string;
   correo?: string;
   grupoSanguineo?: string;
   alergias?: string;
   antecedentesFamiliares?: string;
   estadoCivil?: string;
   //FALTA TODO LO RELEVANTE A PROGRAMA ACADEMICO
   programaAcademico: ProgramaAcademico;
   fechaRegistro: Date;
   activo: boolean;
}

export class PatientRepository extends BaseRepository {
   createPatientData = async(data: CreatePatientData)=> {
      try {
         return await this.db.paciente.create({
            data:{
               tipoDocumento: data.tipoDocumento,
               numDocumento: data.numDocumento,
               nombres: data.nombres,
               apellidos: data.apellidos,
               fechaNacimiento: data.fechaNacimiento,
               genero: data.genero,
               direccion: data.direccion,
               telefono: data.telefono,
               correo: data.correo,
               grupoSanguineo: data.grupoSanguineo,
               alergias: data.alergias,
               antecedentesFamiliares: data.antecedentesFamiliares,
               estadoCivil: data.estadoCivil,
               programaAcademico: {
                  connect: {id: data.programaAcademico.id}
               },
               fechaRegistro: data.fechaRegistro,
               activo: data.activo,
            }
         })
      } catch (error) {
         this.handleError(error, 'create patient');
      }
   }
}