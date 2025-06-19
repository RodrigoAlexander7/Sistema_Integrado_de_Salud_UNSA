  // src/services/auth.service.ts
  import { ManagementClient, AuthenticationClient } from 'auth0';
  import { Usuario, Medico, Enfermera, TipoUsuario } from '../generated/prisma';
  import { UsuarioService } from './usuario.service';
  import { config } from '../config/environment';
  import { logger } from '../utils/logger';
  import bcrypt from 'bcryptjs';

  export interface RegisterData {
    email: string;
    password: string;
    nombreUsuario: string;
    tipoUsuario: TipoUsuario;
    // Datos del perfil profesional
    nombres: string;
    apellidos: string;
    tipoDocumento: string;
    numDocumento: string;
    numLicencia: string;
    telefono?: string;
  }

  export interface LoginData {
    email: string;
    password: string;
  }

  export interface AuthResult {
    accessToken: string;
    refreshToken?: string;
    user: {
      id: number;
      nombreUsuario: string;
      email: string;
      tipoUsuario: TipoUsuario;
      activo: boolean;
      profile?: any;
    };
  }

  export interface RegisterResult {
    usuario: Usuario;
    profile?: Medico | Enfermera;
    accessToken: string;
  }

  export class AuthService {
    private managementClient: ManagementClient;
    private authClient: AuthenticationClient;

    constructor(private usuarioService: UsuarioService) {
      // Cliente para gestión de usuarios (crear, actualizar, etc.)
      this.managementClient = new ManagementClient({
        domain: config.auth0.domain,
        clientId: config.auth0.clientId,
        clientSecret: config.auth0.clientSecret,
      });

      // Cliente para autenticación (login, tokens, etc.)
      this.authClient = new AuthenticationClient({
        domain: config.auth0.domain,
        clientId: config.auth0.clientId,
        clientSecret: config.auth0.clientSecret
      });
    }

    async register(data: RegisterData): Promise<RegisterResult> {
      try {
        logger.info(`Iniciando registro para: ${data.email}, tipo: ${data.tipoUsuario}`);

        // 1. Verificar que el usuario no exista en la BD local
        const existingUser = await this.usuarioService.findByEmail(data.email);
        if (existingUser) {
          throw new Error('El usuario ya existe en el sistema');
        }

        // 2. Crear usuario en Auth0
        const auth0User = await this.managementClient.users.create({
          connection: 'Username-Password-Authentication', // Conexión por defecto
          email: data.email,
          password: data.password,
          email_verified: false, // Se verificará por email
          app_metadata: {
            tipoUsuario: data.tipoUsuario,
            sistema: 'medico'
          },
          user_metadata: {
            nombreUsuario: data.nombreUsuario,
            nombres: data.nombres,
            apellidos: data.apellidos
          }
        });

        if (!auth0User.data.user_id) {
          throw new Error('Error al crear usuario en Auth0');
        }

        logger.info(`Usuario creado en Auth0: ${auth0User.data.user_id}`);

        // 3. Crear usuario en la base de datos local
        const hashedPassword = await bcrypt.hash(data.password, 12);
        
        const usuario = await this.usuarioService.create({
          nombreUsuario: data.nombreUsuario,
          email: data.email,
          contrasena: hashedPassword, // Backup local
          tipoUsuario: data.tipoUsuario,
          activo: true
        });

        logger.info(`Usuario creado en BD local: ${usuario.id}`);

        // 4. Crear perfil profesional
        let profile: Medico | Enfermera | undefined;

        if (data.tipoUsuario === 'MEDICO') {
          profile = await this.usuarioService.createMedicoProfile(usuario.id, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            tipoDocumento: data.tipoDocumento,
            numDocumento: data.numDocumento,
            numLicencia: data.numLicencia,
            telefono: data.telefono,
            correo: data.email
          });
          logger.info(`Perfil de médico creado: ${profile.id}`);
        } else {
          profile = await this.usuarioService.createEnfermeraProfile(usuario.id, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            tipoDocumento: data.tipoDocumento,
            numDocumento: data.numDocumento,
            numLicencia: data.numLicencia,
            telefono: data.telefono,
            correo: data.email
          });
          logger.info(`Perfil de enfermera creado: ${profile.id}`);
        }

        // 5. Obtener token de acceso inicial
        const tokenResponse = await this.authClient.oauth.passwordGrant({
          username: data.email,
          password: data.password,
          audience: config.auth0.audience,
          scope: 'openid profile email'
        });

        if (!tokenResponse.data.access_token) {
          throw new Error('Error al obtener token de acceso');
        }

        logger.info(`Registro completado exitosamente para: ${data.email}`);

        return {
          usuario,
          profile,
          accessToken: tokenResponse.data.access_token
        };

      } catch (error: any) {
        logger.error('Error en AuthService.register:', {
          email: data.email,
          error: error.message,
          stack: error.stack
        });

        // Si falla, intentar limpiar lo que se creó
        try {
          const localUser = await this.usuarioService.findByEmail(data.email);
          if (localUser) {
            await this.usuarioService.deactivate(localUser.id);
            logger.info(`Usuario local desactivado por error en registro: ${data.email}`);
          }
        } catch (cleanupError) {
          logger.error('Error en cleanup de registro fallido:', cleanupError);
        }

        throw error;
      }
    }

    async login(data: LoginData): Promise<AuthResult> {
      try {
        logger.info(`Intento de login para: ${data.email}`);

        // 1. Autenticar con Auth0
        const tokenResponse = await this.authClient.oauth.passwordGrant({
          username: data.email,
          password: data.password,
          audience: config.auth0.audience,
          scope: 'openid profile email'
        });

        if (!tokenResponse.data.access_token) {
          throw new Error('Credenciales inválidas');
        }

        // 2. Buscar usuario en BD local
        const user = await this.usuarioService.findByEmailWithProfile(data.email);
        
        if (!user) {
          throw new Error('Usuario no encontrado en el sistema');
        }

        if (!user.activo) {
          throw new Error('Usuario inactivo');
        }

        // 3. Actualizar último acceso
        await this.usuarioService.updateLastAccess(user.id);

        logger.info(`Login exitoso para: ${data.email}`);

        return {
          accessToken: tokenResponse.data.access_token,
          refreshToken: tokenResponse.data.refresh_token,
          user: {
            id: user.id,
            nombreUsuario: user.nombreUsuario,
            email: user.email,
            tipoUsuario: user.tipoUsuario,
            activo: user.activo,
            profile: user.medico || user.enfermera
          }
        };

      } catch (error: any) {
        logger.error('Error en login:', {
          email: data.email,
          error: error.message
        });
        
        // Personalizar mensajes de error
        if (error.message.includes('Wrong email or password')) {
          throw new Error('Credenciales inválidas');
        }
        if (error.message.includes('too_many_attempts')) {
          throw new Error('Demasiados intentos fallidos. Intenta más tarde.');
        }
        
        throw error;
      }
    }

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken?: string }> {
      try {
        logger.info('Intentando refrescar token');

        const tokenResponse = await this.authClient.oauth.refreshTokenGrant({
          refresh_token: refreshToken
        });

        if (!tokenResponse.data.access_token) {
          throw new Error('Error al refrescar token');
        }

        return {
          accessToken: tokenResponse.data.access_token,
          refreshToken: tokenResponse.data.refresh_token
        };

      } catch (error: any) {
        logger.error('Error en refresh token:', error);
        throw new Error('Token de refresh inválido o expirado');
      }
    }

    async logout(userId: number): Promise<void> {
      try {
        logger.info(`Logout para usuario: ${userId}`);
        
        // Actualizar último acceso
        await this.usuarioService.updateLastAccess(userId);
        
        // Aquí podrías:
        // 1. Invalidar el token en Auth0 (requiere configuración adicional)
        // 2. Agregar token a blacklist
        // 3. Registrar logout en auditoría
        
        logger.info(`Logout completado para usuario: ${userId}`);

      } catch (error: any) {
        logger.error('Error en logout:', error);
        throw error;
      }
    }


    // Método para cambiar contraseña
    async changePassword(email: string): Promise<void> {
      try {
        await this.authClient.database.changePassword({
          email,
          connection: 'Username-Password-Authentication'
        });
        
        logger.info(`Email de cambio de contraseña enviado a: ${email}`);
      } catch (error: any) {
        logger.error('Error al enviar email de cambio de contraseña:', error);
        throw new Error('Error al enviar email de recuperación');
      }
    }

    // Método para verificar email
    async resendVerificationEmail(userId: string): Promise<void> {
      try {
        await this.managementClient.tickets.verifyEmail({
          user_id: userId
        });
        
        logger.info(`Email de verificación reenviado para usuario: ${userId}`);
      } catch (error: any) {
        logger.error('Error al reenviar email de verificación:', error);
        throw new Error('Error al enviar email de verificación');
      }
    }
  }