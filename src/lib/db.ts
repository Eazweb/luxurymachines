import { PrismaClient } from '../generated/prisma'; // Updated import path to match the generated client location

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if we are in production
const isProduction = process.env.NODE_ENV === 'production';

// Export a function to ensure the client is connected
export const getPrismaClient = (): PrismaClient => {
  if (!global.prisma) {
    // Initialize a new Prisma Client instance if none exists
    global.prisma = new PrismaClient({
      log: isProduction ? ['error'] : ['query', 'error', 'warn'],
    });
  }
  return global.prisma;
};

// Export a default instance for backward compatibility
const prisma = getPrismaClient();
export default prisma;
