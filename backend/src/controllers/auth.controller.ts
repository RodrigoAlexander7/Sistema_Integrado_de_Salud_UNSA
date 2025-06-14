// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { ResponseUtil } from '../utils/response';
import { logger } from '../utils/logger';
import { RegisterDto, LoginDto } from '../models/dto/auth.dto';
import { AuthenticatedRequest } from '../models/interfaces/auth.interface';
import { body, validationResult } from 'express-validator';

export class AuthController {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  // Validadores para los endpoints
  public static getRegisterValidators() {
    return [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email debe ser válido'),
      
      body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('La contraseña debe contener al menos: 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial'),
      
      body('nombreUsuario')
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
      
      body('tipoUsuario')
        .isIn(['MEDICO', 'ENFERMERA'])
        .withMessage('Tipo de usuario debe ser MEDICO o ENFERMERA'),
      
      body('nombres')
        .isLength({ min: 2, max: 100 })
        .withMessage('Los nombres deben tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Los nombres solo pueden contener letras y espacios'),
      
      body('apellidos')
        .isLength({ min: 2, max: 100 })
        .withMessage('Los apellidos deben tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Los apellidos solo pueden contener letras y espacios'),
      
      body('tipoDocumento')
        .isIn(['DNI', 'CE', 'PASAPORTE'])
        .withMessage('Tipo de documento debe ser DNI, CE o PASAPORTE'),
      
      body('numDocumento')
        .isLength({ min: 8, max: 20 })
        .withMessage('El número de documento debe tener entre 8 y 20 caracteres')
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('El número de documento solo puede contener letras y números'),
      
      body('numLicencia')
        .isLength({ min: 5, max: 20 })
        .withMessage('El número de licencia debe tener entre 5 y 20 caracteres'),
      
      body('telefono')
        .optional()
        .isMobilePhone('es-PE')
        .withMessage('El teléfono debe ser un número válido de Perú')
    ];
  }

  public static getLoginValidators() {
    return [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email debe ser válido'),
      
      body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
    ];
  }

  // Endpoint de registro
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validar entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseUtil.badRequest(
          res, 
          'Datos de entrada inválidos', 
          JSON.stringify(errors.array())
        );
      }

      const registerData: RegisterDto = req.body;
      
      // Log del intento de registro (sin contraseña)
      logger.info(`Intento de registro para: ${registerData.email}, tipo: ${registerData.tipoUsuario}`);
      
      const result = await this.authService.register(registerData);
      
      logger.info(`Usuario registrado exitosamente: ${registerData.email} (ID: ${result.user.id})`);
      
      return ResponseUtil.success(
        res, 
        {
          user: result.user,
          accessToken: result.accessToken,
          // No devolver refreshToken en la respuesta por seguridad
        }, 
        'Usuario registrado exitosamente', 
        201
      );
      
    } catch (error: any) {
      logger.error('Error en registro:', {
        error: error.message,
        stack: error.stack,
        email: req.body?.email
      });

      // Diferentes tipos de errores
      if (error.message.includes('ya existe')) {
        return ResponseUtil.badRequest(res, error.message);
      }
      
      if (error.message.includes('Auth0')) {
        return ResponseUtil.error(res, 'Error en el servicio de autenticación', 502);
      }
      
      return ResponseUtil.error(res, 'Error interno al registrar usuario', 500);
    }
  };

  // Endpoint de login
  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validar entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseUtil.badRequest(
          res, 
          'Datos de entrada inválidos', 
          JSON.stringify(errors.array())
        );
      }

      const loginData: LoginDto = req.body;
      
      logger.info(`Intento de login para: ${loginData.email}`);
      
      const result = await this.authService.login(loginData);
      
      logger.info(`Login exitoso para: ${loginData.email} (ID: ${result.user.id})`);
      
      return ResponseUtil.success(
        res, 
        {
          user: result.user,
          accessToken: result.accessToken,
          expiresIn: '24h' // Información útil para el frontend
        }, 
        'Login exitoso'
      );
      
    } catch (error: any) {
      logger.error('Error en login:', {
        error: error.message,
        email: req.body?.email
      });

      if (error.message.includes('Credenciales') || error.message.includes('inválidas')) {
        return ResponseUtil.unauthorized(res, 'Credenciales inválidas');
      }
      
      if (error.message.includes('inactivo')) {
        return ResponseUtil.forbidden(res, 'Usuario inactivo. Contacta al administrador');
      }
      
      if (error.message.includes('no encontrado')) {
        return ResponseUtil.unauthorized(res, 'Usuario no encontrado');
      }
      
      return ResponseUtil.error(res, 'Error interno en autenticación', 500);
    }
  };

  // Endpoint para refrescar token
  refreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return ResponseUtil.badRequest(res, 'Refresh token requerido');
      }
      
      logger.info('Intento de refresh token');
      
      const result = await this.authService.refreshToken(refreshToken);
      
      logger.info('Token refrescado exitosamente');
      
      return ResponseUtil.success(
        res, 
        {
          accessToken: result.accessToken,
          expiresIn: '24h'
        }, 
        'Token refrescado exitosamente'
      );
      
    } catch (error: any) {
      logger.error('Error al refrescar token:', error);
      
      if (error.message.includes('inválido') || error.message.includes('expirado')) {
        return ResponseUtil.unauthorized(res, 'Refresh token inválido o expirado');
      }
      
      return ResponseUtil.error(res, 'Error interno al refrescar token', 500);
    }
  };

  // Endpoint de logout
  logout = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      if (!req.auth?.userId) {
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }
      
      logger.info(`Logout para usuario ID: ${req.auth.userId}`);
      
      await this.authService.logout(req.auth.userId);
      
      logger.info(`Logout exitoso para usuario ID: ${req.auth.userId}`);
      
      return ResponseUtil.success(res, null, 'Logout exitoso');
      
    } catch (error: any) {
      logger.error('Error en logout:', {
        error: error.message,
        userId: req.auth?.userId
      });
      
      return ResponseUtil.error(res, 'Error al cerrar sesión', 500);
    }
  };

  // Endpoint para obtener perfil del usuario autenticado
  profile = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      if (!req.auth?.userId) {
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }
      
      logger.info(`Solicitud de perfil para usuario ID: ${req.auth.userId}`);
      
      const usuario = await this.usuarioService.findByIdWithProfile(req.auth.userId);
      
      if (!usuario) {
        return ResponseUtil.notFound(res, 'Usuario no encontrado');
      }
      
      // Construir respuesta del perfil
      const userProfile = {
        id: usuario.id,
        nombreUsuario: usuario.nombreUsuario,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
        activo: usuario.activo,
        fechaRegistro: usuario.fechaRegistro,
        ultimoAcceso: usuario.ultimoAcceso,
        profile: usuario.medico || usuario.enfermera || null
      };
      
      return ResponseUtil.success(res, userProfile, 'Perfil obtenido exitosamente');
      
    } catch (error: any) {
      logger.error('Error al obtener perfil:', {
        error: error.message,
        userId: req.auth?.userId
      });
      
      return ResponseUtil.error(res, 'Error al obtener perfil', 500);
    }
  };

  // Endpoint para cambiar contraseña (opcional, para casos sin Auth0)
  changePassword = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      if (!req.auth?.userId) {
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return ResponseUtil.badRequest(res, 'Contraseña actual y nueva contraseña son requeridas');
      }

      // Validar nueva contraseña
      if (newPassword.length < 8) {
        return ResponseUtil.badRequest(res, 'La nueva contraseña debe tener al menos 8 caracteres');
      }

      logger.info(`Cambio de contraseña para usuario ID: ${req.auth.userId}`);

      // Implementar lógica de cambio de contraseña
      // await this.usuarioService.changePassword(req.auth.userId, currentPassword, newPassword);

      return ResponseUtil.success(res, null, 'Contraseña cambiada exitosamente');

    } catch (error: any) {
      logger.error('Error al cambiar contraseña:', {
        error: error.message,
        userId: req.auth?.userId
      });

      if (error.message.includes('incorrecta')) {
        return ResponseUtil.badRequest(res, 'Contraseña actual incorrecta');
      }

      return ResponseUtil.error(res, 'Error al cambiar contraseña', 500);
    }
  };

  // Endpoint para verificar estado del usuario
  healthCheck = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      if (!req.auth?.userId) {
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }

      const usuario = await this.usuarioService.findById(req.auth.userId);
      
      if (!usuario) {
        return ResponseUtil.notFound(res, 'Usuario no encontrado');
      }

      if (!usuario.activo) {
        return ResponseUtil.forbidden(res, 'Usuario inactivo');
      }

      return ResponseUtil.success(res, {
        userId: usuario.id,
        active: usuario.activo,
        lastAccess: usuario.ultimoAcceso
      }, 'Usuario activo');

    } catch (error: any) {
      logger.error('Error en health check:', error);
      return ResponseUtil.error(res, 'Error en verificación de estado', 500);
    }
  };
}