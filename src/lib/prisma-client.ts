import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if we are running in production environment
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Prisma Client
const prisma = global.prisma || new PrismaClient({
  log: isProduction ? ['error'] : ['query', 'error', 'warn'],
});

// Only set prisma on global in development
if (!isProduction) {
  global.prisma = prisma;
}

export default prisma;
