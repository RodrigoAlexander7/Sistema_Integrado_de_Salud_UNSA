import { Router } from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware'
import { HistoriaController } from '../controllers/historia-clinica.controller'
import { verify } from 'crypto'

export default function historiaRoutes(
   historiaController: HistoriaController,
   authMiddleware: AuthMiddleware,
){
   const router = Router()

   router.use(
      authMiddleware.fromCookieToHeader,
      authMiddleware.verifyAuth0Token,
   )

   router.post('/personal-info-input', historiaController.loadPersonalData)
   
   return router
}