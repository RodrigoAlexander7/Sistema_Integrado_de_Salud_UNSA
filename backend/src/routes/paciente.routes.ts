import { Router } from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware'
import { PatientController } from '../controllers/paciente.controller'
import { verify } from 'crypto'

export default function patientRoutes(
   patientController: PatientController,
   authMiddleware: AuthMiddleware,
){
   const router = Router()

   router.use(
      authMiddleware.fromCookieToHeader,
      authMiddleware.verifyAuth0Token,
   )

   router.post('/personal-info-input', patientController.createPatient)
   
   return router
}