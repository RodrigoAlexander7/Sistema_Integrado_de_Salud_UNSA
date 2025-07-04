import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { logger } from './utils/logger';
import cookieParser from 'cookie-parser';

import { UsuarioRepository } from './repositories/usuario.repository';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

import { CookieController } from './controllers/cookie.controller';

import createAuthRoutes from './routes/auth.routes';
import createMedicoRoutes from './routes/medico.routes';
import createEnfermeraRoutes from './routes/enfermera.routes';


const app = express();


// MIDDLEWARES GLOBALES
// Se aplican a TODAS las peticiones entrantes.
app.use(cors({ 
  origin: config.corsOrigin, 
  credentials: true ,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })); // MUY IMPORTANTE: para poder leer req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Middleware de log para cada petición
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


// ENDPOINT DE SALUD
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});


// INYECCIÓN DE DEPENDENCIAS
// Creamos una unica instancia de cada clase, conectandolas entre si.
const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const authService = new AuthService(usuarioService);
const authController = new AuthController(authService, usuarioService);
const authMiddleware = new AuthMiddleware(usuarioService);

const cookieController = new CookieController();

// MONTAJE DE RUTAS MODULARES 
app.use('/api/auth', createAuthRoutes(authController, authMiddleware, cookieController));
app.use('/api/medicos', createMedicoRoutes(authMiddleware));
app.use('/api/enfermeras', createEnfermeraRoutes(authMiddleware));


//MANEJO DE ERRORES
// Si ninguna ruta anterior coincide, se ejecuta el 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    timestamp: new Date().toISOString()
  });
});

// Middleware global para atrapar cualquier error no manejado.
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


//INICIO DEL SERVIDOR 
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
  logger.info(`Ambiente: ${config.nodeEnv}`);
  logger.info(`================  API Medical App iniciada correctamente  ================\n`);
});

export default app;