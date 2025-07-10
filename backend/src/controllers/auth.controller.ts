/*El controller recive los datos -> Extrae los datos necesarios
  -> llama la logica del service -> devuelve la respuesta
*/
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { TipoUsuario } from '../generated/prisma';
import { logger } from '../utils/logger';
import {config} from '../config/environment';

export interface RegisterRequest {
  email: string;
  password?: string;
  nombreUsuario: string;
  tipoUsuario: TipoUsuario;
  // Datos del perfil profesional
  nombres?: string;
  apellidos?: string;
  tipoDocumento?: string;
  numDocumento?: string;
  numLicencia?: string;
  telefono?: string;
}

export class AuthController {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    // Bind de métodos para mantener el contexto
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.logout = this.logout.bind(this);
    this.profile = this.profile.bind(this);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      // Log de datos recibidos para debugging
      logger.info('Datos recibidos en register:', {
        body: req.body,
        email: req.body?.email,
        tipoUsuario: req.body?.tipoUsuario
      });

      const {
        email,
        password,
        nombreUsuario,
        tipoUsuario,
        nombres,
        apellidos,
        tipoDocumento,
        numDocumento,
        numLicencia,
        telefono
      } = req.body;

      // Validaciones básicas
      if (!email) {
        res.status(400).json({
          success: false,
          message: 'El email es requerido'
        });
        return;
      }

      if (!nombreUsuario) {
        res.status(400).json({
          success: false,
          message: 'El nombre de usuario es requerido'
        });
        return;
      }

      if (!tipoUsuario) {
        res.status(400).json({
          success: false,
          message: 'El tipo de usuario es requerido'
        });
        return;
      }

      if (!['MEDICO', 'ENFERMERA'].includes(tipoUsuario)) {
        res.status(400).json({
          success: false,
          message: 'Tipo de usuario inválido'
        });
        return;
      }

      // Para medicos y enfermeras, validar datos profesionales
      if (tipoUsuario === 'MEDICO' || tipoUsuario === 'ENFERMERA') {
        if (!nombres || !apellidos || !tipoDocumento || !numDocumento || !numLicencia) {
          res.status(400).json({
            success: false,
            message: 'Los datos profesionales son requeridos para médicos y enfermeras'
          });
          return;
        }
      }

      logger.info(`Intento de registro para: ${email}, tipo: ${tipoUsuario}`);

      // Registrar usuario -> como ya paso la prueba (middleware) llama a AuthService para registrarlo 
      // AuthService ya los crea tanto e auth0(datos parciales) como en local (todos los datos)
      const result = await this.authService.register({
        email,
        password,
        nombreUsuario,
        tipoUsuario,
        nombres,
        apellidos,
        tipoDocumento,
        numDocumento,
        numLicencia,
        telefono
      });

      logger.info(`Usuario registrado exitosamente: ${email}`);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          user: {
            id: result.usuario.id,
            email: result.usuario.email,
            nombreUsuario: result.usuario.nombreUsuario,
            tipoUsuario: result.usuario.tipoUsuario,
            activo: result.usuario.activo
          },
          profile: result.profile
        }
      });

    } catch (error: any) {
      logger.error('Error en registro:', { 
        error: error.message,
        stack: error.stack 
      });

      // Determinar el código de estado basado en el tipo de error
      let statusCode = 500;
      if (error.message.includes('ya está registrado') || 
          error.message.includes('ya está en uso') ||
          error.message.includes('ya existe')) {
        statusCode = 409; // Conflict
      } else if (error.message.includes('requerido') || 
                error.message.includes('inválido')) {
        statusCode = 400; // Bad Request
      }

      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error en el registro',
        timestamp: new Date().toISOString()
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos'
        });
        return;
      }

      logger.info(`Intento de login para: ${email}`);

      const result = await this.authService.login({ email, password });

      logger.info(`Login exitoso para: ${email}`);

      // 1. Guardar el token en cookie httpOnly (útil para navegador)
      res.cookie('authToken', result.accessToken, {
        httpOnly: true,
        secure: config.nodeEnv === 'production', // solo en HTTPS en prod
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        path: '/'
      });

      // 2. Enviar el token también en la respuesta JSON (útil para Postman o apps móviles)
      res.json({
        success: true,
        message: 'Login exitoso',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });

    } catch (error: any) {
      logger.error('Error en login:', error);

      let statusCode = 500;
      if (
        error.message.includes('credenciales') ||
        error.message.includes('contraseña') ||
        error.message.includes('no encontrado')
      ) {
        statusCode = 401; // Unauthorized
      }

      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error en el login'
      });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token es requerido'
        });
        return;
      }

      const result = await this.authService.refreshToken(refreshToken);

      res.json({
        success: true,
        message: 'Token renovado exitosamente',
        data: result
      });

    } catch (error: any) {
      logger.error('Error en refresh token:', error);

      res.status(401).json({
        success: false,
        message: error.message || 'Error al renovar token'
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // En el middleware ya se carga la información del usuario
      const userInfo = (req as any).auth;

      if (userInfo?.userId) {
        await this.authService.logout(userInfo.userId);
      }

      const isProduction = config.nodeEnv === 'production'
      res.clearCookie('authToken',{
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction? 'none': 'lax',
        path: '/' 
      })

      res.json({
        success: true,
        message: 'Logout exitoso'
      });

    } catch (error: any) {
      logger.error('Error en logout:', error);

      res.status(500).json({
        success: false,
        message: 'Error en logout'
      });
    }
  }

  async profile(req: Request, res: Response): Promise<void> {
    try {
      // En el middleware ya se carga la información del usuario
      const userInfo = (req as any).auth;

      if (!userInfo) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
        return;
      }

      res.json({
        success: true,
        data: userInfo
      });

    } catch (error: any) {
      logger.error('Error al obtener perfil:', error);

      res.status(500).json({
        success: false,
        message: 'Error al obtener perfil'
      });
    }
  }
}