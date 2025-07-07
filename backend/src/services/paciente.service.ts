import { PrismaClient } from '../generated/prisma/client';
import { CrearPacienteInput } from '../models/dto/paciente.dto';

export class PacienteService {
  private prisma = new PrismaClient();

  async crearPaciente(data: CrearPacienteInput) {
    return this.prisma.paciente.create({
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
        antecedentesFamiliares: data.antecedentesFamiliares,
        estadoCivil: data.estadoCivil,
        programaAcademicoId: data.programaAcademicoId,

        contactosEmergencia: {
          create: data.contactosEmergencia.map(contacto => ({
            nombres: contacto.nombres,
            apellidos: contacto.apellidos,
            parentesco: contacto.parentesco,
            telefonoPrincipal: contacto.telefonoPrincipal,
            telefonoSecundario: contacto.telefonoSecundario,
            direccion: contacto.direccion
          }))
        },

        // Crear historia clínica automáticamente
        historiasClinicas: {
        create: [
            {
            fechaApertura: new Date(),
            estado: "Abierta",
            observacionesGenerales: null, // o puedes usar una cadena como ""
            },
        ],
        }
      }
    });
  }

  // otros métodos...
}
