import { Usuario, Medico, Enfermera, TipoUsuario } from '../generated/prisma';
import { BaseRepository } from './base.repository';

/* Creacion de modelo para Usuarios 
Separecion de responsablidades y evitar exponer informacion [email/contrasenaHash] en la capa de perfil 
*/

export interface CreateUsuarioData {
  nombreUsuario: string;
  email: string;
  contrasenaHash: string;
  tipoUsuario: TipoUsuario;
  activo?: boolean;
}

// molde para crear medicos en la base de datos
export interface CreateMedicoData {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numDocumento: string;
  numLicencia: string;
  telefono?: string;
  correo?: string;
}

// molde para crear enfermeras en la base de datos
export interface CreateEnfermeraData {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numDocumento: string;
  numLicencia: string;
  telefono?: string;
  correo?: string;
}

// molde -> datos esperados para actualizar informacion de un usuario en la base de datos
export interface UpdateUsuarioData {
  nombreUsuario?: string;
  email?: string;
  activo?: boolean;
  ultimoAcceso?: Date;
}

export class UsuarioRepository extends BaseRepository {
  // Crear usuario mediante la instacia de prisma 'db' (de base.repository)
  async create(data: CreateUsuarioData): Promise<Usuario> {
    try {
      return await this.db.usuario.create({
        data: {
          nombreUsuario: data.nombreUsuario,
          email: data.email,
          contrasenaHash: data.contrasenaHash,
          tipoUsuario: data.tipoUsuario,
          activo: data.activo ?? true,
          fechaRegistro: new Date()
        }
      });
    } catch (error) {
      this.handleError(error, 'create usuario');
    }
  }

  // Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    try {
      return await this.db.usuario.findUnique({
        where: { id }
      });
    } catch (error) {
      this.handleError(error, 'findById usuario');
    }
  }

  // Buscar por email
  async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await this.db.usuario.findUnique({
        where: { email }
      });
    } catch (error) {
      this.handleError(error, 'findByEmail usuario');
    }
  }

  // Buscar por nombre de usuario
  async findByUsername(nombreUsuario: string): Promise<Usuario | null> {
    try {
      return await this.db.usuario.findUnique({
        where: { nombreUsuario }
      });
    } catch (error) {
      this.handleError(error, 'findByUsername usuario');
    }
  }

  // Buscar por email con perfil incluido
  async findByEmailWithProfile(email: string): Promise<(Usuario & { medico?: Medico | null; enfermera?: Enfermera | null}) | null> {
    try {
      return await this.db.usuario.findUnique({
        where: { email },
        include: {
          medico: {
            include: {
              especialidades: {
                include: {
                  especialidad: true
                },
                where: {
                  activo: true
                }
              }
            }
          },
          enfermera: true
        }
      });
    } catch (error) {
      this.handleError(error, 'findByEmailWithProfile usuario');
    }
  }

  // Buscar por ID con perfil incluido
  async findByIdWithProfile(id: number): Promise<(Usuario & { medico?: Medico | null; enfermera?: Enfermera |null }) | null> {
    try {
      return await this.db.usuario.findUnique({
        where: { id },
        include: {
          medico: {
            include: {
              especialidades: {
                include: {
                  especialidad: true
                },
                where: {
                  activo: true
                }
              }
            }
          },
          enfermera: true
        }
      });
    } catch (error) {
      this.handleError(error, 'findByIdWithProfile usuario');
    }
  }

  // Actualizar usuario
  async update(id: number, data: UpdateUsuarioData): Promise<Usuario> {
    try {
      return await this.db.usuario.update({
        where: { id },
        data
      });
    } catch (error) {
      this.handleError(error, 'update usuario');
    }
  }

  // Actualizar último acceso
  async updateLastAccess(id: number): Promise<Usuario> {
    try {
      return await this.db.usuario.update({
        where: { id },
        data: {
          ultimoAcceso: new Date()
        }
      });
    } catch (error) {
      this.handleError(error, 'updateLastAcceso usuario');
    }
  }

  // Desactivar usuario (soft delete)
  async deactivate(id: number): Promise<Usuario> {
    try {
      return await this.db.usuario.update({
        where: { id },
        data: {
          activo: false
        }
      });
    } catch (error) {
      this.handleError(error, 'deactivate usuario');
    }
  }

  // Activar usuario
  async activate(id: number): Promise<Usuario> {
    try {
      return await this.db.usuario.update({
        where: { id },
        data: {
          activo: true
        }
      });
    } catch (error) {
      this.handleError(error, 'activate usuario');
    }
  }

  // Crear perfil de médico
  async createMedicoProfile(usuarioId: number, data: CreateMedicoData): Promise<Medico> {
    try {
      return await this.db.medico.create({
        data: {
          usuarioId,
          nombres: data.nombres,
          apellidos: data.apellidos,
          tipoDocumento: data.tipoDocumento,
          numDocumento: data.numDocumento,
          numLicencia: data.numLicencia,
          telefono: data.telefono,
          correo: data.correo,
          fechaRegistro: new Date(),
          activo: true
        }
      });
    } catch (error) {
      this.handleError(error, 'createMedicoProfile');
    }
  }

  // Crear perfil de enfermera
  async createEnfermeraProfile(usuarioId: number, data: CreateEnfermeraData): Promise<Enfermera> {
    try {
      return await this.db.enfermera.create({
        data: {
          usuarioId,
          nombres: data.nombres,
          apellidos: data.apellidos,
          tipoDocumento: data.tipoDocumento,
          numDocumento: data.numDocumento,
          numLicencia: data.numLicencia,
          telefono: data.telefono,
          correo: data.correo,
          fechaRegistro: new Date(),
          activo: true
        }
      });
    } catch (error) {
      this.handleError(error, 'createEnfermeraProfile');
    }
  }

  // Listar usuarios con paginación
  async findMany(page: number = 1, limit: number = 10, filters?: {
    activo?: boolean;
    tipoUsuario?: TipoUsuario;
    search?: string;
  }) {
    try {
      const skip = (page - 1) * limit;
      
      const where: any = {};
      
      if (filters?.activo !== undefined) {
        where.activo = filters.activo;
      }
      
      if (filters?.tipoUsuario) {
        where.tipoUsuario = filters.tipoUsuario;
      }
      
      if (filters?.search) {
        where.OR = [
          { nombreUsuario: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } }
        ];
      }

      const [usuarios, total] = await Promise.all([
        this.db.usuario.findMany({
          where,
          skip,
          take: limit,
          include: {
            medico: true,
            enfermera: true
          },
          orderBy: {
            fechaRegistro: 'desc'
          }
        }),
        this.db.usuario.count({ where })
      ]);

      return {
        usuarios,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      this.handleError(error, 'findMany usuarios');
    }
  }

  // Verificar si existe documento
  async existsByDocument(tipoDocumento: string, numDocumento: string): Promise<boolean> {
    try {
      const medico = await this.db.medico.findFirst({
        where: {
          tipoDocumento,
          numDocumento
        }
      });

      if (medico) return true;

      const enfermera = await this.db.enfermera.findFirst({
        where: {
          tipoDocumento,
          numDocumento
        }
      });

      return !!enfermera;
    } catch (error) {
      this.handleError(error, 'existsByDocument');
    }
  }

  // Verificar si existe licencia
  async existsByLicense(numLicencia: string): Promise<boolean> {
    try {
      const medico = await this.db.medico.findFirst({
        where: { numLicencia }
      });

      if (medico) return true;

      const enfermera = await this.db.enfermera.findFirst({
        where: { numLicencia }
      });

      return !!enfermera;
    } catch (error) {
      this.handleError(error, 'existsByLicense');
    }
  }
}