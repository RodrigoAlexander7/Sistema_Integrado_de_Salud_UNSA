// episodio.repository.ts
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
  signosVitales?: {
    pesoKg: number;
    tallaCm: number;
    temperaturaC: number;
    presionArterial: string;
    frecuenciaCardiaca: number;
    frecuenciaRespiratoria: number;
    saturacionOxigeno?: number;
    imc?: number;
  };
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

      // Función para calcular IMC si no viene proporcionado
      const calcularIMC = (peso: number, tallaCm: number): number => {
        const tallaM = tallaCm / 100;
        return +(peso / (tallaM * tallaM)).toFixed(2);
      };

      const signosVitalesData = data.signosVitales
        ? {
            peso: data.signosVitales.pesoKg,
            altura: data.signosVitales.tallaCm / 100, // altura en metros
            temperatura: data.signosVitales.temperaturaC,
            presionArterial: data.signosVitales.presionArterial,
            frecuenciaCardiaca: data.signosVitales.frecuenciaCardiaca,
            frecuenciaRespiratoria: data.signosVitales.frecuenciaRespiratoria,
            saturacionOxigeno: data.signosVitales.saturacionOxigeno ?? null,
            imc:
              data.signosVitales.imc ??
              calcularIMC(data.signosVitales.pesoKg, data.signosVitales.tallaCm),
          }
        : undefined;

      const episodio = await prisma.episodioClinco.create({
        data: {
          historiaClinica: { connect: { id: historiaClinicaId } },
          especialidad: { connect: { id: data.especialidadId } },
          medico: data.medicoId ? { connect: { id: data.medicoId } } : undefined,
          enfermera: { connect: { id: data.enfermeraId } },
          consultorio: { connect: { id: data.consultorioId } },
          fechaEpisodio: data.fechaEpisodio,
          motivoConsulta: data.motivoConsulta,
          sintomas: data.sintomas,
          tratamiento: data.tratamiento,
          observaciones: data.observaciones,

          signosVitales: signosVitalesData
            ? {
                create: signosVitalesData,
              }
            : undefined,
        },
        include: {
          signosVitales: true, // incluir signos vitales en la respuesta
        },
      });

      return episodio;
    } catch (error) {
      console.error('[crearEpisodioClinico] Error:', error);
      throw error;
    }
  }
}
