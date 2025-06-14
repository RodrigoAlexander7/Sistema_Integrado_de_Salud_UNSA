// src/server.ts
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { logger } from './utils/logger';

// Importar repositorios, servicios y controladores
import { UsuarioRepository } from './repositories/usuario.repository';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

// Crear instancias
const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const authService = new AuthService(usuarioService);
const authController = new AuthController(authService, usuarioService);
const authMiddleware = new AuthMiddleware(usuarioService);

const app = express();

// Middlewares globales
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Rutas de autenticación (públicas)
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/refresh', authController.refreshToken);

// Rutas protegidas
app.post('/api/auth/logout', 
  authMiddleware.verifyAuth0Token, 
  authMiddleware.loadUserInfo, 
  authController.logout
);

app.get('/api/auth/profile', 
  authMiddleware.verifyAuth0Token, 
  authMiddleware.loadUserInfo, 
  authController.profile
);

// Ruta de prueba para médicos
app.get('/api/medicos/dashboard', 
  authMiddleware.verifyAuth0Token, 
  authMiddleware.loadUserInfo,
  authMiddleware.requireMedico,
  (req, res) => {
    res.json({ message: 'Bienvenido al dashboard de médicos', user: (req as any).auth });
  }
);

// Ruta de prueba para enfermeras
app.get('/api/enfermeras/dashboard', 
  authMiddleware.verifyAuth0Token, 
  authMiddleware.loadUserInfo,
  authMiddleware.requireEnfermera,
  (req, res) => {
    res.json({ message: 'Bienvenido al dashboard de enfermeras', user: (req as any).auth });
  }
);

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    timestamp: new Date().toISOString()
  });
});

// Manejo global de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
  logger.info(`📚 Ambiente: ${config.nodeEnv}`);
  logger.info(`🏥 API Medical App iniciada correctamente`);
});

export default app;