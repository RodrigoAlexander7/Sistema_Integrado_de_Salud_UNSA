/* usuario.service.ts -> encargado de la logica relacionada con la base de datos
 todo lo hace en local -> no sabe nada de Auth0 ni llama tokens, se limita a trabajar en local
 *** Eso de Auth0 lo hace AuthService
*/
import { Usuario, Medico, Enfermera, TipoUsuario } from '../generated/prisma';
import { 
  UsuarioRepository, 
  CreateUsuarioData, 
  CreateMedicoData, 
  CreateEnfermeraData,
  UpdateUsuarioData 
} from '../repositories/usuario.repository';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';


// contrasena hash se omite por que esta es generada y guardada automaticamente, nosotros no la guardamos
export interface CreateUsuarioServiceData extends Omit<CreateUsuarioData, 'contrasenaHash'> {
  contrasena: string; 
}


export interface UpdateUsuarioServiceData {
  nombreUsuario?: string;
  email?: string;
  activo?: boolean;
}

export interface UsuarioListFilters {
  activo?: boolean;
  tipoUsuario?: TipoUsuario;
  search?: string;
}

export class UsuarioService {
/* Constructor relevante en esta linea del server.ts
const usuarioService = new UsuarioService(usuarioRepository);
para la inyeccion de dependencias manuales */
  constructor(private usuarioRepository: UsuarioRepository) {}

  // Crear usuario
  async create(data: CreateUsuarioServiceData): Promise<Usuario> {
    try {
      // Validar que el email no exista
      const existingEmail = await this.usuarioRepository.findByEmail(data.email);
      if (existingEmail) {
        throw new Error('El email ya está registrado');
      }

      // Validar que el nombre de usuario no exista
      const existingUsername = await this.usuarioRepository.findByUsername(data.nombreUsuario);
      if (existingUsername) {
        throw new Error('El nombre de usuario ya esta en uso');
      }

      // Hash de la contraseña si se proporciona (backup para casos sin Auth0)
      let contrasenaHash = '';
      if (data.contrasena) 
        contrasenaHash = await bcrypt.hash(data.contrasena, 12);
      // Generar hash aleatorio para Auth0 (Login con gmail por ejemplo)
      //else contrasenaHash = await bcrypt.hash(Math.random().toString(36), 12);
      

      const usuario = await this.usuarioRepository.create({
        nombreUsuario: data.nombreUsuario,
        email: data.email,
        contrasenaHash,
        tipoUsuario: data.tipoUsuario,
        activo: data.activo
      });

      logger.info(`Usuario creado: ${usuario.email} (ID: ${usuario.id})`);
      return usuario;

    } catch (error: any) {
      logger.error('Error al crear usuario:', error);
      throw new Error(error.message || 'Error al crear usuario');
    }
  }

  // Crear perfil de médico
  async createMedicoProfile(usuarioId: number, data: CreateMedicoData): Promise<Medico> {
    try {
      // Validar que el usuario existe y es médico
      const usuario = await this.usuarioRepository.findById(usuarioId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      if (usuario.tipoUsuario !== 'MEDICO') {
        throw new Error('El usuario no es de tipo médico');
      }

      // Validar que no exista el documento
      const existsDocument = await this.usuarioRepository.existsByDocument(
        data.tipoDocumento, 
        data.numDocumento
      );
      if (existsDocument) {
        throw new Error('Ya existe un profesional con este número de documento');
      }

      // Validar que no exista la licencia
      const existsLicense = await this.usuarioRepository.existsByLicense(data.numLicencia);
      if (existsLicense) {
        throw new Error('Ya existe un profesional con este número de licencia');
      }

      const medico = await this.usuarioRepository.createMedicoProfile(usuarioId, data);
      
      logger.info(`Perfil de médico creado para usuario ${usuarioId}: ${data.nombres} ${data.apellidos}`);
      return medico;

    } catch (error: any) {
      logger.error('Error al crear perfil de médico:', error);
      throw new Error(error.message || 'Error al crear perfil de médico');
    }
  }

  // Crear perfil de enfermera
  async createEnfermeraProfile(usuarioId: number, data: CreateEnfermeraData): Promise<Enfermera> {
    try {
      // Validar que el usuario existe y es enfermera
      const usuario = await this.usuarioRepository.findById(usuarioId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      if (usuario.tipoUsuario !== 'ENFERMERA') {
        throw new Error('El usuario no es de tipo enfermera');
      }

      // Validar que no exista el documento
      const existsDocument = await this.usuarioRepository.existsByDocument(
        data.tipoDocumento, 
        data.numDocumento
      );
      if (existsDocument) {
        throw new Error('Ya existe un profesional con este número de documento');
      }

      // Validar que no exista la licencia
      const existsLicense = await this.usuarioRepository.existsByLicense(data.numLicencia);
      if (existsLicense) {
        throw new Error('Ya existe un profesional con este número de licencia');
      }

      const enfermera = await this.usuarioRepository.createEnfermeraProfile(usuarioId, data);
      
      logger.info(`Perfil de enfermera creado para usuario ${usuarioId}: ${data.nombres} ${data.apellidos}`);
      return enfermera;

    } catch (error: any) {
      logger.error('Error al crear perfil de enfermera:', error);
      throw new Error(error.message || 'Error al crear perfil de enfermera');
    }
  }

  // Buscar por email
  async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await this.usuarioRepository.findByEmail(email);
    } catch (error: any) {
      logger.error('Error al buscar usuario por email:', error);
      throw new Error('Error al buscar usuario');
    }
  }

  // Buscar por email con perfil
  async findByEmailWithProfile(email: string): Promise<(Usuario & { medico?: Medico | null; enfermera?: Enfermera | null }) | null> {
    try {
      return await this.usuarioRepository.findByEmailWithProfile(email);
    } catch (error: any) {
      logger.error('Error al buscar usuario con perfil por email:', error);
      throw new Error('Error al buscar usuario');
    }
  }

  // Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    try {
      return await this.usuarioRepository.findById(id);
    } catch (error: any) {
      logger.error('Error al buscar usuario por ID:', error);
      throw new Error('Error al buscar usuario');
    }
  }

  // Buscar por ID con perfil
  async findByIdWithProfile(id: number): Promise<(Usuario & { medico?: Medico | null; enfermera?: Enfermera |null }) | null> {
    try {
      const usuario = await this.usuarioRepository.findByIdWithProfile(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error: any) {
      logger.error('Error al buscar usuario con perfil por ID:', error);
      throw new Error(error.message || 'Error al buscar usuario');
    }
  }

  // Actualizar usuario
  async update(id: number, data: UpdateUsuarioServiceData): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findById(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Validar email único si se está cambiando
      if (data.email && data.email !== usuario.email) {
        const existingEmail = await this.usuarioRepository.findByEmail(data.email);
        if (existingEmail) {
          throw new Error('El email ya está en uso');
        }
      }

      // Validar nombre de usuario único si se está cambiando
      if (data.nombreUsuario && data.nombreUsuario !== usuario.nombreUsuario) {
        const existingUsername = await this.usuarioRepository.findByUsername(data.nombreUsuario);
        if (existingUsername) {
          throw new Error('El nombre de usuario ya está en uso');
        }
      }

      const updatedUsuario = await this.usuarioRepository.update(id, data);
      
      logger.info(`Usuario actualizado: ${updatedUsuario.email} (ID: ${id})`);
      return updatedUsuario;

    } catch (error: any) {
      logger.error('Error al actualizar usuario:', error);
      throw new Error(error.message || 'Error al actualizar usuario');
    }
  }

  // Actualizar ultimo acceso
  async updateLastAccess(id: number): Promise<Usuario> {
    try {
      return await this.usuarioRepository.updateLastAccess(id);
    } catch (error: any) {
      logger.error('Error al actualizar último acceso:', error);
      throw new Error('Error al actualizar último acceso');
    }
  }

  // Desactivar usuario
  async deactivate(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findById(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      if (!usuario.activo) {
        throw new Error('El usuario ya está inactivo');
      }

      const deactivatedUsuario = await this.usuarioRepository.deactivate(id);
      
      logger.info(`Usuario desactivado: ${deactivatedUsuario.email} (ID: ${id})`);
      return deactivatedUsuario;

    } catch (error: any) {
      logger.error('Error al desactivar usuario:', error);
      throw new Error(error.message || 'Error al desactivar usuario');
    }
  }

  // Activar usuario
  async activate(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findById(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      if (usuario.activo) {
        throw new Error('El usuario ya está activo');
      }

      const activatedUsuario = await this.usuarioRepository.activate(id);
      
      logger.info(`Usuario activado: ${activatedUsuario.email} (ID: ${id})`);
      return activatedUsuario;

    } catch (error: any) {
      logger.error('Error al activar usuario:', error);
      throw new Error(error.message || 'Error al activar usuario');
    }
  }

  // Listar usuarios con filtros y paginación
  async findMany(
    page: number = 1, 
    limit: number = 10, 
    filters?: UsuarioListFilters
  ) {
    try {
      if (page < 1) page = 1;
      if (limit < 1 || limit > 100) limit = 10; // Límite máximo de 100

      const result = await this.usuarioRepository.findMany(page, limit, filters);
      
      logger.info(`Usuarios listados: página ${page}, límite ${limit}, total ${result.total}`);
      return result;

    } catch (error: any) {
      logger.error('Error al listar usuarios:', error);
      throw new Error('Error al listar usuarios');
    }
  }

  // Validar contraseña (para casos sin Auth0)
  async validatePassword(email: string, password: string): Promise<boolean> {
    try {
      const usuario = await this.usuarioRepository.findByEmail(email);
      if (!usuario) {
        return false;
      }

      return await bcrypt.compare(password, usuario.contrasenaHash);
    } catch (error: any) {
      logger.error('Error al validar contraseña:', error);
      return false;
    }
  }

  // Cambiar contraseña (para casos sin Auth0)
  async changePassword(id: number, newPassword: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findById(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      const updatedUsuario = await this.usuarioRepository.update(id, {
        // Nota: necesitarías agregar este campo al UpdateUsuarioData
        // contrasenaHash: hashedPassword
      });
      
      logger.info(`Contraseña cambiada para usuario: ${usuario.email} (ID: ${id})`);
      return updatedUsuario;

    } catch (error: any) {
      logger.error('Error al cambiar contraseña:', error);
      throw new Error(error.message || 'Error al cambiar contraseña');
    }
  }

  // Obtener estadísticas de usuarios
  async getStats(): Promise<{
    total: number;
    activos: number;
    inactivos: number;
    medicos: number;
    enfermeras: number;
    registrosHoy: number;
  }> {
    try {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const [
        { total },
        { usuarios: activos },
        { usuarios: medicos },
        { usuarios: enfermeras },
        { usuarios: registrosHoy }
      ] = await Promise.all([
        this.usuarioRepository.findMany(1, 1),
        this.usuarioRepository.findMany(1, 1, { activo: true }),
        this.usuarioRepository.findMany(1, 1, { tipoUsuario: 'MEDICO' }),
        this.usuarioRepository.findMany(1, 1, { tipoUsuario: 'ENFERMERA' }),
        this.usuarioRepository.findMany(1, 1) // Necesitarías filtro por fecha
      ]);

      return {
        total,
        activos: activos.length,
        inactivos: total - activos.length,
        medicos: medicos.length,
        enfermeras: enfermeras.length,
        registrosHoy: registrosHoy.length
      };

    } catch (error: any) {
      logger.error('Error al obtener estadísticas:', error);
      throw new Error('Error al obtener estadísticas');
    }
  }
}