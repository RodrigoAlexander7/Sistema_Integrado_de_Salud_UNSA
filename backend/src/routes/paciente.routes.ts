import { Router } from 'express';
import { PacienteController } from '../controllers/paciente.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

export default function createPacienteRoutes(pacienteController: PacienteController, authMiddleware: AuthMiddleware): Router {
  const router = Router();

  router.post(
    '/',
    authMiddleware.fromCookieToHeader,
    authMiddleware.verifyAuth0Token,
    authMiddleware.attachUserInfoFromToken,
    authMiddleware.loadUserInfo,
    authMiddleware.requireEnfermera,
    pacienteController.crearPaciente
  );

  return router;
}