// src/services/auth.service.ts
import { ManagementClient, AuthenticationClient } from 'auth0';
import { config } from '../config/environment';
import { UsuarioService } from './usuario.service';
import { RegisterDto, AuthResponseDto, LoginDto } from '../models/dto/auth.dto';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';

export class AuthService {
  private managementClient: ManagementClient;
  private authClient: AuthenticationClient;

  constructor(private usuarioService: UsuarioService) {
    this.managementClient = new ManagementClient({
      domain: config.auth0.domain,
      clientId: config.auth0.clientId,
      clientSecret: config.auth0.clientSecret,
    });

    this.authClient = new AuthenticationClient({
      domain: config.auth0.domain,
      clientId: config.auth0.clientId,
      clientSecret: config.auth0.clientSecret,
    });
  }

  async register(registerData: RegisterDto): Promise<AuthResponseDto> {
    try {
      // 1. Verificar que el usuario no exista
      const existingUser = await this.usuarioService.findByEmail(registerData.email);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      // 2. Crear usuario en Auth0
      const auth0User = await this.managementClient.users.create({
        connection: 'Username-Password-Authentication',
        email: registerData.email,
        password: registerData.password,
        user_metadata: {
          nombreUsuario: registerData.nombreUsuario,
          tipoUsuario: registerData.tipoUsuario
        }
      });

      if (!auth0User.data.user_id) {
        throw new Error('Error al crear usuario en Auth0');
      }

      // 3. Hash de la contraseña para almacenar localmente (backup)
      const hashedPassword = await bcrypt.hash(registerData.password, 12);

      // 4. Crear usuario en la base de datos local
      const usuario = await this.usuarioService.create({
        nombreUsuario: registerData.nombreUsuario,
        email: registerData.email,
        contrasena: hashedPassword,
        tipoUsuario: registerData.tipoUsuario,
        activo: true
      });

      // 5. Crear perfil según el tipo de usuario
      if (registerData.tipoUsuario === 'MEDICO') {
        await this.usuarioService.createMedicoProfile(usuario.id, {
          nombres: registerData.nombres,
          apellidos: registerData.apellidos,
          tipoDocumento: registerData.tipoDocumento,
          numDocumento: registerData.numDocumento,
          numLicencia: registerData.numLicencia,
          telefono: registerData.telefono,
          correo: registerData.email
        });
      } else {
        await this.usuarioService.createEnfermeraProfile(usuario.id, {
          nombres: registerData.nombres,
          apellidos: registerData.apellidos,
          tipoDocumento: registerData.tipoDocumento,
          numDocumento: registerData.numDocumento,
          numLicencia: registerData.numLicencia,
          telefono: registerData.telefono,
          correo: registerData.email
        });
      }

      // 6. Obtener token de acceso
      const tokenResponse = await this.authClient.oauth.passwordGrant({
        username: registerData.email,
        password: registerData.password,
        audience: config.auth0.audience
      });

      // 7. Obtener usuario completo
      const fullUser = await this.usuarioService.findByEmailWithProfile(registerData.email);

      return {
        accessToken: tokenResponse.data.access_token!,
        refreshToken: tokenResponse.data.refresh_token,
        user: {
          id: fullUser!.id,
          nombreUsuario: fullUser!.nombreUsuario,
          email: fullUser!.email,
          tipoUsuario: fullUser!.tipoUsuario,
          activo: fullUser!.activo,
          profile: fullUser!.medico || fullUser!.enfermera || undefined
        }
      };

    } catch (error) {
      logger.error('Error en registro:', error);
      throw error;
    }
  }

  async login(loginData: LoginDto): Promise<AuthResponseDto> {
    try {
      // 1. Autenticar con Auth0
      const tokenResponse = await this.authClient.oauth.passwordGrant({
        username: loginData.email,
        password: loginData.password,
        audience: config.auth0.audience
      });

      if (!tokenResponse.data.access_token) {
        throw new Error('Credenciales inválidas');
      }

      // 2. Obtener usuario de la base de datos
      const usuario = await this.usuarioService.findByEmailWithProfile(loginData.email);
      
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      if (!usuario.activo) {
        throw new Error('Usuario inactivo');
      }

      // 3. Actualizar último acceso
      await this.usuarioService.updateLastAccess(usuario.id);

      return {
        accessToken: tokenResponse.data.access_token,
        refreshToken: tokenResponse.data.refresh_token,
        user: {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email,
          tipoUsuario: usuario.tipoUsuario,
          activo: usuario.activo,
          profile: usuario.medico ?? usuario.enfermera ?? undefined
        }
      };

    } catch (error) {
      logger.error('Error en login:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const tokenResponse = await this.authClient.oauth.refreshTokenGrant({
        refresh_token: refreshToken
      });

      return {
        accessToken: tokenResponse.data.access_token!
      };
    } catch (error) {
      logger.error('Error al refrescar token:', error);
      throw new Error('Token de refresh inválido');
    }
  }

  async logout(userId: number): Promise<void> {
    try {
      // Aquí podrías implementar lógica adicional como:
      // - Invalidar tokens en una blacklist
      // - Registrar el logout en auditoría
      logger.info(`Usuario ${userId} cerró sesión`);
    } catch (error) {
      logger.error('Error en logout:', error);
      throw error;
    }
  }
}