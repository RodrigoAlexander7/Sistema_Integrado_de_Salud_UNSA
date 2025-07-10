import { Request, Response } from 'express';
import { EpisodioService } from '../services/episodio.service';

export class EpisodioController {
  constructor(private episodioService: EpisodioService) {}

  crearEpisodioClinico = async (req: Request, res: Response) => {
    try {
      const episodio = await this.episodioService.crearEpisodio(req.body);
      res.status(201).json(episodio);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al crear el episodio clínico' });
    }
  };
}