import { Request, Response } from 'express';
import { PacienteService } from '../services/paciente.service';
import { CrearPacienteInput } from '../models/dto/paciente.dto';
import { ResponseUtil } from '../utils/response';

export class PacienteController {
  constructor(private pacienteService: PacienteService) {}

  public crearPaciente = async (req: Request, res: Response) => {
    try {
      const data = req.body as CrearPacienteInput;

      if (!data.tipoDocumento || !data.numDocumento || !data.nombres || !data.apellidos || !data.fechaNacimiento || !data.genero || !data.programaAcademicoId) {
        return ResponseUtil.badRequest(res, 'Faltan campos obligatorios');
      }

      const paciente = await this.pacienteService.crearPaciente(data);

      return res.status(201).json({
        success: true,
        message: 'Paciente registrado correctamente',
        data: paciente
      });
    } catch (error) {
      console.error(error);
      return ResponseUtil.error(res, 'Error al registrar el paciente');
    }
  };
}