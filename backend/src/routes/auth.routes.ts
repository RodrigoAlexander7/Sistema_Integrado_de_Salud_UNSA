import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { AuthMiddleware } from '../middleware/auth.middleware'
import { CookieController } from '../controllers/cookie.controller'

export default function authRoutes(
  authController: AuthController,
  authMiddleware: AuthMiddleware,
  cookieController: CookieController
) {
  const router = Router()

  // RUTAS PUBLICAS 
  router.post('/register',    authController.register)
  router.post('/login',       authController.login)
  router.post('/refresh',     authController.refreshToken)

  // RUTAS PROTEGIDAS
  //  routes   -> middleware -> controller -> service -> repositories
  // llamar rutas -> guardias seguridad -> recibir datos/validar/llamar logica -> aplica logica ->  administrar BD
  router.use(
    authMiddleware.fromCookieToHeader,
    authMiddleware.verifyAuth0Token,
    authMiddleware.attachUserInfoFromToken,
    authMiddleware.loadUserInfo
  )

  router.post('/logout',    authController.logout)
  router.get ('/profile',   authController.profile)
  router.get ('/me', cookieController.returnStatus)

  return router
}