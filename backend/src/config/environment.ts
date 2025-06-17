// config/environment.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Servidor
  port: parseInt(process.env.PORT || '4000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Base de datos
  databaseUrl: process.env.DATABASE_URL || '',
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },
  
  // Auth0 (si lo usas)
  auth0: {
    domain: process.env.AUTH0_DOMAIN || '',
    clientId: process.env.AUTH0_CLIENT_ID || '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    audience: process.env.AUTH0_AUDIENCE || ''
  },
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // 100 requests por ventana
    message: {
      error: 'Demasiadas solicitudes desde esta IP, intente nuevamente más tarde.',
      retryAfter: 'Retry-After'
    },
    standardHeaders: true,
    legacyHeaders: false
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Validaciones
  validation: {
    passwordMinLength: 8,
    usernameMinLength: 3,
    usernameMaxLength: 30
  }
};

// Validar variables de entorno críticas
const requiredEnvVars = ['DATABASE_URL'];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingEnvVars);
  process.exit(1);
}

// Validar configuraciones críticas
if (config.nodeEnv === 'production') {
  if (config.jwt.secret === 'your-super-secret-jwt-key-change-in-production') {
    console.error('❌ JWT_SECRET debe ser cambiado en producción');
    process.exit(1);
  }
  
  if (config.jwt.refreshSecret === 'your-super-secret-refresh-jwt-key-change-in-production') {
    console.error('❌ JWT_REFRESH_SECRET debe ser cambiado en producción');
    process.exit(1);
  }
}