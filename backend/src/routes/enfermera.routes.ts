import { Router, Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware'
import { AuthenticatedRequest } from '../models/interfaces/auth.interface'

export default function authRoutes(
  authMiddleware: AuthMiddleware
) {
  const router = Router()

  // RUTAS PROTEGIDAS ENFERMERA
   router.use(
      authMiddleware.verifyAuth0Token, 
      authMiddleware.loadUserInfo,
      authMiddleware.requireEnfermera
   )

   router.get ('/dashboard',
      (req:AuthenticatedRequest, res:Response)=>{
         res.json({message:'Bienvenido al sistema de enfermera', user: req.auth});
      }
   );

  return router
}