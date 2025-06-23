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

// IMPORTANTE: Middleware de parsing JSON ANTES de cualquier ruta
app.use(express.json({ 
  limit: '10mb'
}));
app.use(express.urlencoded({ extended: true }));

// Middleware de debug para inspeccionar requests (DESPUÉS del parsing)
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  
  // Debug: Log del body en rutas de auth (ahora el body ya está parseado)
  if (req.path.includes('/auth/')) {
    logger.info('Request body after parsing:', {
      hasBody: !!req.body,
      bodyType: typeof req.body,
      bodyKeys: req.body && typeof req.body === 'object' ? Object.keys(req.body) : [],
      contentType: req.get('content-type'),
      contentLength: req.get('content-length'),
      body: req.body
    });
  }
  
  next();
});

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Endpoint de test para verificar el parsing
app.post('/api/test-body', (req, res) => {
  res.json({
    success: true,
    message: 'Test body parsing',
    data: {
      hasBody: !!req.body,
      bodyType: typeof req.body,
      bodyKeys: req.body && typeof req.body === 'object' ? Object.keys(req.body) : [],
      contentType: req.get('content-type'),
      contentLength: req.get('content-length'),
      body: req.body
    }
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
  logger.error('Error no manejado:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  
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