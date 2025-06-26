import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { AuthMiddleware } from '../middleware/auth.middleware'

export default function authRoutes(
  authController: AuthController,
  authMiddleware: AuthMiddleware
) {
  const router = Router()

  // RUTAS PUBLICAS 
  router.post('/register',    authController.register)
  router.post('/login',       authController.login)
  router.post('/refresh',     authController.refreshToken)

  // RUTAS PROTEGIDAS
  router.use(
    authMiddleware.verifyAuth0Token,
    authMiddleware.loadUserInfo
  )

  router.post('/logout',    authController.logout)
  router.get ('/profile',   authController.profile)

  return router
}