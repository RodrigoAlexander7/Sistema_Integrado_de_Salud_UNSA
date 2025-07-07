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
  programaAcademicoId: number;
  activo: boolean;

  contactosEmergencia: {
    nombres: string;
    apellidos: string;
    parentesco: string;
    telefonoPrincipal: string;
    telefonoSecundario?: string;
    direccion?: string;
  }[];
}

export class PatientRepository  extends BaseRepository {
  createPatientData = async (data: CreatePatientData) => {
    try {
      const result = await this.db.paciente.create({
        data: {
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
          fechaRegistro: new Date(),
          activo: data.activo,
          programaAcademico: {
            connect: { id: data.programaAcademicoId }
          },
          contactosEmergencia: {
            create: data.contactosEmergencia.map((c) => ({
              nombres: c.nombres,
              apellidos: c.apellidos,
              parentesco: c.parentesco,
              telefonoPrincipal: c.telefonoPrincipal,
              telefonoSecundario: c.telefonoSecundario,
              direccion: c.direccion
            }))
          },
          historiasClinicas: {
            create: {
              fechaApertura: new Date(),
              estado: "Abierta",
              observacionesGenerales: null // puedes modificar esto si hay un campo inicial
            }
          }
        }
      });

      return result;
    } catch (error) {
      this.handleError(error, 'create patient with historia clinica');
    }
  };
}