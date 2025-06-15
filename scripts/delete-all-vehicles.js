// Script to delete all vehicles from the database
import { PrismaClient } from '../src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
  try {
    // Delete all existing vehicles
    console.log('Deleting all vehicles from the database...');
    const deletedCount = await prisma.vehicle.deleteMany({});
    console.log(`Deleted ${deletedCount.count} vehicles successfully!`);
  } catch (error) {
    console.error('Error during deletion:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting from database...');
    await prisma.$disconnect();
  });
