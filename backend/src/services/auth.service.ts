// service.ts -> unica parte del back que habla con Auth0
//se asegura que el usuario se cree localmente y en Auth0 
import { ManagementClient, AuthenticationClient } from 'auth0';
import { Usuario, Medico, Enfermera, TipoUsuario } from '../generated/prisma';
import { UsuarioService } from './usuario.service';
import { config } from '../config/environment';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';  // Usada para guardar una copia de la contrasena en la bd local (pke tmbn se hace en auth0)

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
  // utilizamos 2 clientes de Auth0
  private managementClient: ManagementClient;       //crear usuarios, eliminarlos, cambiar sus datos, etc.
                                                    // requiere de clientSecret por que tiene funciones muy poderosas

  private authClient: AuthenticationClient;         // Operaciones de login: iniciar sesión con email/contraseña, refrescar un token, etc


  // se inicializan los dos clientes (con los datos del .env) 
  constructor(private usuarioService: UsuarioService) {
    this.managementClient = new ManagementClient({
      domain: config.auth0.domain,
      clientId: config.auth0.clientId,
      clientSecret: config.auth0.clientSecret,
    });

    this.authClient = new AuthenticationClient({
      domain: config.auth0.domain,
      clientId: config.auth0.clientId,
      clientSecret: config.auth0.clientSecret
    });
  }


// LOGICA PARA REGISTRAR USUARIOS
  async register(data: RegisterData): Promise<RegisterResult> {
    try {
      logger.info(`Iniciando registro para: ${data.email}, tipo: ${data.tipoUsuario}`);

      // 1. Verificar que el usuario no exista en la BD local
      const existingUser = await this.usuarioService.findByEmail(data.email);
      if (existingUser) {
        throw new Error('El usuario ya existe en el sistema');
      }

      // 2. CREAR USUARIO EN AUTH0
      // ManagementClient -> poderes administrativos, crear, actualizar, eliminar, generar tikets 
      // en auth0 no se usan todos los datos, guarda solo lo necesario para login
      const auth0User = await this.managementClient.users.create({
        connection: 'Username-Password-Authentication', // Conexión por defecto -> la base de datos en auth0 por defecto donde se guardaran los users
        email: data.email,
        password: data.password,
        
        // esto podria cambiar mas adelante si aceptamos usuarios pacientes (escalaabilidad futura)
        // donde los estudiantes (pacientes) podran registrarse con su correo institucional
        email_verified: true, //NO se verificara email (el email esta verificado? -> true)
      
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

      // 3. CREAR USUARIO EN LA BASE DE DATOS LOCAL (SINCRONIZACION)
      const hashedPassword = await bcrypt.hash(data.password, 12);
      
      const usuario = await this.usuarioService.create({
        nombreUsuario: data.nombreUsuario,
        email: data.email,
        contrasena: hashedPassword, // Backup local
        tipoUsuario: data.tipoUsuario,
        activo: true
      });

      logger.info(`Usuario creado en BD local: ${usuario.id}`);

      // 4. CREAR PERFIL PROFESIONAL (BD LOCAL)
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

      /* 5. Obtener token de acceso inicial  
      Primer login cuando se crea el usuario, cliente authClient solicita un token 
      Diferencias entre tipos de login
      passwordGrant   : back recibe usuario y contrasena -> las envia a auth0 -> auth0 devuelve un token firmado(autorizado) 
      universal login : usuario y contrasena en el login auth0 -> auth0 la recive y firma -> auth0 devuelve un token firmado
       */
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

      // Si falla, intentar limpiar lo que se creo
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


  // Login meiante passwordGrant esto es seguro solo si es una red privada (como la nuestra)
  // en caso se vuelva un servicio para usuarios tambien (toda la U) tendriamos que cambiar a el Universal login
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
        // Para acceder a rutas protegidas
        accessToken: tokenResponse.data.access_token,
        // Para renovar el token cuando el otro expira
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
      
      // Actualizar ultimo acceso
      await this.usuarioService.updateLastAccess(userId);
      
      // Aqui podriamos
      // 1. Invalidar el token en Auth0 (configuracion adicional)
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

  // Metodo para verificar email
  async resendVerificationEmail(userId: string): Promise<void> {
    try {
      await this.managementClient.tickets.verifyEmail({
        user_id: userId
      });
      
      logger.info(`Email de verificacion reenviado para usuario: ${userId}`);
    } catch (error: any) {
      logger.error('Error al reenviar email de verificacion:', error);
      throw new Error('Error al enviar email de verificacion');
    }
  }
}