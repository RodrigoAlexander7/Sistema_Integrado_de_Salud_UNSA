//episodio.repository.ts
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

export interface CrearEpisodioClinicoInput {
  tipoDocumento: string;
  numDocumento: string;
  especialidadId: number;
  medicoId?: number;
  enfermeraId: number;
  consultorioId: number;
  fechaEpisodio: Date;  
  motivoConsulta: string;
  sintomas?: string;
  tratamiento?: string;
  observaciones?: string;
}
export class EpisodioClinicoRepository {
  async crearEpisodioClinico(data: CrearEpisodioClinicoInput) {
    try {
      const paciente = await prisma.paciente.findFirst({
        where: {
          tipoDocumento: data.tipoDocumento,
          numDocumento: data.numDocumento,
        },
        include: {
          historiasClinicas: {
            where: { estado: 'Abierta' },
            take: 1,
          },
        },
      });

      if (!paciente || paciente.historiasClinicas.length === 0) {
        throw new Error('Paciente o historia clínica activa no encontrada.');
      }

      const historiaClinicaId = paciente.historiasClinicas[0].id;

      const episodio = await prisma.episodioClinco.create({
      data: {
        historiaClinica: { connect: { id: historiaClinicaId } },
        especialidad: { connect: { id: data.especialidadId } },
        medico: data.medicoId ? { connect: { id: data.medicoId } } : undefined,
        enfermera: { connect: { id: data.enfermeraId } },
        consultorio: { connect: { id: data.consultorioId } },
        fechaEpisodio: data.fechaEpisodio, // <-- Obligatorio, debe venir en data
        motivoConsulta: data.motivoConsulta,
        sintomas: data.sintomas,
        tratamiento: data.tratamiento,
        observaciones: data.observaciones,
      },
    })

      return episodio;
    } catch (error) {
      console.error('[crearEpisodioClinico] Error:', error);
      throw error;
    }
  }
}
