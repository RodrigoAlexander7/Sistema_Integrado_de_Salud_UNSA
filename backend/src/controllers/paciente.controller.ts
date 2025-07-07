import { Request, Response } from 'express';
import { PacienteService } from '../services/paciente.service';
import { CrearPacienteInput } from '../models/dto/paciente.dto';
import { logger } from '../utils/logger';

export class PatientController {
  constructor(private pacienteService = new PacienteService()) {}

  createPatient = async (req: Request<{}, {}, CrearPacienteInput>, res: Response) => {
    try {
      logger.info('Datos recibidos para crear paciente:', { body: req.body });

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
        antecedentesFamiliares,
        estadoCivil,
        contactosEmergencia,
        programaAcademicoId
      } = req.body;

      const paciente = await this.pacienteService.crearPaciente({
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
        antecedentesFamiliares,
        estadoCivil,
        contactosEmergencia,
        programaAcademicoId,
        activo: true
      });

      logger.info(`Paciente creado exitosamente: ${correo}`);

      res.status(201).json({
        success: true,
        message: 'Paciente creado correctamente',
        data: paciente
      });

    } catch (error: any) {
      logger.error('Error al crear paciente:', {
        error: error.message,
        stack: error.stack
      });

      res.status(500).json({
        success: false,
        message: 'Ocurrió un error al registrar al paciente'
      });
    }
  };
}
