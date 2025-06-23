import { PrismaClient } from '../generated/prisma';
import { config } from './environment';

// Creamos una istancia global para poder usar prisma desde cualquier parte del proyecto y creamos los logs
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.databaseUrl,
    },
  },
  log: config.nodeEnv === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});