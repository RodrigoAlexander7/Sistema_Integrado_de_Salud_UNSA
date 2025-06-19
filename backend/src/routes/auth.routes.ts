// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

export class AuthRoutes {
  private router: Router;
  
  constructor(
    private authController: AuthController,
    private authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Rutas públicas
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
    this.router.post('/refresh-token', this.authController.refreshToken);
    
    // Callback de Auth0 (para web flows si los necesitas)
    this.router.get('/callback', this.handleAuth0Callback);
    
    // Logout callback de Auth0
    this.router.get('/logout', this.handleAuth0Logout);
    
    // Rutas protegidas
    this.router.use(this.authMiddleware.verifyAuth0Token);
    this.router.use(this.authMiddleware.loadUserInfo);
    
    this.router.post('/logout', this.authController.logout);
    this.router.get('/profile', this.authController.profile);
  }

  // Handler para callback de Auth0 (si usas web flow)
  private handleAuth0Callback = (req: any, res: any) => {
    // Este endpoint se usa si implementas login web
    // Por ahora, redirige al frontend con el código
    const { code, state } = req.query;
    
    if (code) {
      // Redirigir al frontend con el código para que maneje el intercambio
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?code=${code}&state=${state}`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  };

  // Handler para logout de Auth0
  private handleAuth0Logout = (req: any, res: any) => {
    // Limpiar cualquier sesión local si la tienes
    res.redirect(`${process.env.FRONTEND_URL}/`);
  };

  public getRouter(): Router {
    return this.router;
  }
}