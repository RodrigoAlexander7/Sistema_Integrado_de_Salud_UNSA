import { CreatePatientData, PatientRepository  } from '../repositories/paciente.repository';

export class PacienteService {
  constructor(private pacienteRepo = new PatientRepository ()) {}

  async crearPaciente(data: CreatePatientData) {
    return await this.pacienteRepo.createPatientData(data);
  }
}