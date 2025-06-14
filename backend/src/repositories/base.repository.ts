import { PrismaClient } from '../generated/prisma';
import { prisma } from '../config/database';

export abstract class BaseRepository {
  protected db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  // Métodos comunes que pueden usar todos los repositorios
  protected handleError(error: any, operation: string): never {
    console.error(`Error in ${operation}:`, error);
    throw new Error(`Database error in ${operation}: ${error.message}`);
  }
}