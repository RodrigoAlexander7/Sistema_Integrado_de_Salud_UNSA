//episodio.routes.ts
import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { EpisodioController } from '../controllers/episodio.controller';
import { EpisodioService } from '../services/episodio.service';

export default function episodioRoutes(
  authMiddleware: AuthMiddleware,
  episodioService: EpisodioService
) {
  const router = Router();
  const episodioController = new EpisodioController(episodioService);

  router.use(
    authMiddleware.fromCookieToHeader,
    authMiddleware.verifyAuth0Token
  );

  router.post('/crear', episodioController.crearEpisodioClinico);

  return router;
}