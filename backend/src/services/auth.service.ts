// src/services/auth.service.ts
import { Usuario, Medico, Enfermera, TipoUsuario } from '../generated/prisma';
import { UsuarioService } from './usuario.service';
import { logger } from '../utils/logger';

export interface RegisterData {
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

export interface RegisterResult {
  usuario: Usuario;
  profile?: Medico | Enfermera;
}

export interface LoginResult {
  user: Usuario & { 
    medico?: Medico | null; 
    enfermera?: Enfermera | null 
  };
  accessToken?: string;
  refreshToken?: string;
}

export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async register(data: RegisterData): Promise<RegisterResult> {
    try {
      logger.info(`Iniciando registro para: ${data.email}, tipo: ${data.tipoUsuario}`);

      // 1. Crear el usuario base
      const usuario = await this.usuarioService.create({
        nombreUsuario: data.nombreUsuario,
        email: data.email,
        contrasena: data.password,
        tipoUsuario: data.tipoUsuario,
        activo: true
      });

      logger.info(`Usuario base creado: ${usuario.id}`);

      let profile: Medico | Enfermera | undefined;

      // 2. Crear el perfil profesional según el tipo
      if (data.tipoUsuario === 'MEDICO' && data.nombres && data.apellidos && 
          data.tipoDocumento && data.numDocumento && data.numLicencia) {
        
        profile = await this.usuarioService.createMedicoProfile(usuario.id, {
          nombres: data.nombres,
          apellidos: data.apellidos,
          tipoDocumento: data.tipoDocumento,
          numDocumento: data.numDocumento,
          numLicencia: data.numLicencia,
          telefono: data.telefono,
          correo: data.email // Usar el mismo email del usuario
        });

        logger.info(`Perfil de médico creado para usuario: ${usuario.id}`);

      } else if (data.tipoUsuario === 'ENFERMERA' && data.nombres && data.apellidos && 
                 data.tipoDocumento && data.numDocumento && data.numLicencia) {
        
        profile = await this.usuarioService.createEnfermeraProfile(usuario.id, {
          nombres: data.nombres,
          apellidos: data.apellidos,
          tipoDocumento: data.tipoDocumento,
          numDocumento: data.numDocumento,
          numLicencia: data.numLicencia,
          telefono: data.telefono,
          correo: data.email // Usar el mismo email del usuario
        });

        logger.info(`Perfil de enfermera creado para usuario: ${usuario.id}`);
      }

      return {
        usuario,
        profile
      };

    } catch (error: any) {
      logger.error('Error en AuthService.register:', {
        email: data.email,
        error: error.message,
        stack: error.stack
      });
      
      // Re-lanzar el error para que lo maneje el controlador
      throw error;
    }
  }

  async login(email: string, password: string): Promise<LoginResult> {
    try {
      logger.info(`Intento de login para: ${email}`);

      // Buscar usuario con perfil
      const user = await this.usuarioService.findByEmailWithProfile(email);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (!user.activo) {
        throw new Error('Usuario inactivo');
      }

      // Validar contraseña (solo si no usa Auth0)
      if (password) {
        const isValidPassword = await this.usuarioService.validatePassword(email, password);
        if (!isValidPassword) {
          throw new Error('Credenciales inválidas');
        }
      }

      // Actualizar último acceso
      await this.usuarioService.updateLastAccess(user.id);

      logger.info(`Login exitoso para: ${email}`);

      // En un sistema real con Auth0, aquí generarías los tokens
      // Por ahora solo retornamos los datos del usuario
      return {
        user,
        // accessToken: 'generated_access_token',
        // refreshToken: 'generated_refresh_token'
      };

    } catch (error: any) {
      logger.error('Error en login:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Implementar lógica de refresh token
      // Por ahora solo simular
      
      logger.info('Token refresh solicitado');

      return {
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_token'
      };

    } catch (error: any) {
      logger.error('Error en refresh token:', error);
      throw new Error('Token inválido o expirado');
    }
  }

  async logout(userId: number): Promise<void> {
    try {
      logger.info(`Logout para usuario: ${userId}`);
      
      // Aquí podrías invalidar tokens, limpiar sesiones, etc.
      // Por ahora solo actualizar último acceso
      await this.usuarioService.updateLastAccess(userId);

    } catch (error: any) {
      logger.error('Error en logout:', error);
      throw error;
    }
  }

  async validateAuth0Token(token: string): Promise<any> {
    try {
      // Implementar validación de token Auth0
      // Por ahora solo simular
      
      return {
        sub: 'auth0|123456789',
        email: 'user@example.com',
        email_verified: true
      };

    } catch (error: any) {
      logger.error('Error al validar token Auth0:', error);
      throw new Error('Token inválido');
    }
  }
}