import { Request, Response, NextFunction } from 'express';
import { jwtCheck } from '../config/auth0';
import { AuthenticatedRequest } from '../models/interfaces/auth.interface';
import { UsuarioService } from '../services/usuario.service';
import { ResponseUtil } from '../utils/response';
import { logger } from '../utils/logger';
import { TipoUsuario } from '../generated/prisma';
import { config } from '../config/environment';

export class AuthMiddleware {
  // le pasamos UsuarioService
  constructor(private usuarioService: UsuarioService) {}

  // Middleware para verificar token de Auth0
  public verifyAuth0Token = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Verificando token con jwtCheck'); 
    return jwtCheck(req, res, next);
  };
  // equivalente a esto -> public verifyAuth0Token = jwtCheck;
  /* Flujo de jwtCheck
  El servidor busca en el HEADER de Authorization el Bearer token, le pasa el token a jwtCheck pej:
    router.get('/usuarios', jwtCheck, controlador.obtenerUsuarios);
    el server ve que el middleware jwtCheck esta antes que el controlador (controlador.obtenerUsers)
  jwtCheck extrae el string de JWT (header.payload.signature) Y lo veriifica para dar acceso
    header    ->  contiene algoritmo de encriptacion y tipo de token  
    payload   ->  datos (email, id , rol)
    signature ->  firmado del token, asegura que no fue alterado
  Si todo ok retorna un objeto req.auth
  */  


  public attachUserInfoFromToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const namespace = config.auth0.namespace;
      const auth = req.auth; // Payload del token validado por jwtCheck

      if (!auth) {
        return ResponseUtil.unauthorized(res, 'Token no encontrado o inválido');
      }

      // Reconstruimos req.auth con la info que nos interesa del token
      req.auth = {
        userId: auth[`${namespace}userId`],
        tipoUsuario: auth[`${namespace}tipoUsuario`],
        email: auth[`${namespace}email`],
      };

      next();
  }



  // Middleware para cargar información del usuario desde la DB
  public loadUserInfo = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.auth?.email) {
        console.log(req.headers.authorization)
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
      }

      const usuario = await this.usuarioService.findByEmail(req.auth.email);
      
      if (!usuario) {
        return ResponseUtil.unauthorized(res, 'Usuario no encontrado en el sistema');
      }

      if (!usuario.activo) {
        return ResponseUtil.forbidden(res, 'Usuario inactivo');
      }

      // Sobreescribimos la informacion de Auth0 
      // desde aqui trabajamos con los datos y roles de nuestraba db y ya no con Aut0
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
        return ResponseUtil.unauthorized(res, 'Usuario no autenticado -r');
      }

      if (!roles.includes(req.auth.tipoUsuario)) {
        return ResponseUtil.forbidden(res, 'No tienes permisos para realizar esta accion');
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


// -> front -> back -> validaciones con los middleware -> rutas
// universal login -> servidor de auth0 -> valida - token firmado



