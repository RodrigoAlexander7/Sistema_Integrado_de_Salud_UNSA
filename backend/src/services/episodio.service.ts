//episodio.service.ts
import { CrearEpisodioClinicoInput, EpisodioClinicoRepository } from '../repositories/episodio.repository';

export class EpisodioService {
  private episodioRepo: EpisodioClinicoRepository;

  constructor(episodioRepo: EpisodioClinicoRepository) {
    this.episodioRepo = episodioRepo;
  }

  async crearEpisodio(input: CrearEpisodioClinicoInput) {
    return await this.episodioRepo.crearEpisodioClinico(input);
  }
}