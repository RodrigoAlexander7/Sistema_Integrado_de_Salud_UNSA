import { Router, Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware'
import { AuthenticatedRequest } from '../models/interfaces/auth.interface'

export default function authRoutes(
  authMiddleware: AuthMiddleware
) {
  const router = Router()

  // RUTAS PROTEGIDAS MEDICO
   router.use(
      authMiddleware.verifyAuth0Token,
      authMiddleware.attachUserInfoFromToken,
      authMiddleware.loadUserInfo,
      authMiddleware.requireMedico
   )

   router.get ('/dashboard',
      (req:AuthenticatedRequest, res:Response)=>{
         res.json({message:'Bienvenido al sistema de medicos', user: req.auth});
      }
   );

  return router
}