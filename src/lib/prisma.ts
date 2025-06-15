// Re-export from the new prisma-client.ts to maintain backward compatibility
export { default } from './prisma-client';
// Also export the Prisma types for type safety
export * from '@prisma/client';