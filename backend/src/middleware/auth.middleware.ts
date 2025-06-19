import { Request, Response, NextFunction } from 'express';
import { jwtCheck } from '../config/auth0';
import { AuthenticatedRequest } from '../models/interfaces/auth.interface';
import { UsuarioService } from '../services/usuario.service';
import { ResponseUtil } from '../utils/response';
import { logger } from '../utils/logger';
import { TipoUsuario } from '../generated/prisma';

export class AuthMiddleware {
  constructor(private usuarioService: UsuarioService) {}

  // Middleware para verificar token de Auth0
  //public verifyAuth0Token = jwtCheck;



  public verifyAuth0Token = (req: Request, res: Response, next: NextFunction) => {
    logger.info('✅ Verificando token con jwtCheck');
    return jwtCheck(req, res, next);
  };






  // Middleware para cargar información del usuario desde la DB
  public loadUserInfo = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.auth?.email) {
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }

      const usuario = await this.usuarioService.findByEmail(req.auth.email);
      
      if (!usuario) {
        return ResponseUtil.unauthorized(res, 'Usuario no encontrado en el sistema');
      }

      if (!usuario.activo) {
        return ResponseUtil.forbidden(res, 'Usuario inactivo');
      }

      // Agregar información del usuario a la request
      req.auth = {
        userId: usuario.id,
        tipoUsuario: usuario.tipoUsuario,
        email: usuario.email,
        nombreUsuario: usuario.nombreUsuario
      };

      next();
    } catch (error) {
      logger.error('Error al cargar información del usuario:', error);
      return ResponseUtil.error(res, 'Error interno del servidor');
    }
  };

  // Middleware para verificar roles
  public requireRole = (roles: TipoUsuario[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (!req.auth?.tipoUsuario) {
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }

      if (!roles.includes(req.auth.tipoUsuario)) {
        return ResponseUtil.forbidden(res, 'No tienes permisos para realizar esta acción');
      }

      next();
    };
  };

  // Middleware para verificar que es médico
  public requireMedico = this.requireRole(['MEDICO']);

  // Middleware para verificar que es enfermera
  public requireEnfermera = this.requireRole(['ENFERMERA']);

  // Middleware que permite ambos roles
  public requireHealthcareWorker = this.requireRole(['MEDICO', 'ENFERMERA']);
}