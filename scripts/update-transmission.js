// Script to update all existing vehicles with a default "Manual" transmission value
import { PrismaClient } from '../src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating all existing vehicles with default transmission value...');
    
    // Get all vehicles
    const allVehicles = await prisma.vehicle.findMany();
    console.log(`Found ${allVehicles.length} total vehicles.`);
    
    // Filter vehicles without transmission value
    const vehiclesWithoutTransmission = allVehicles.filter(v => !v.transmission);
    console.log(`Found ${vehiclesWithoutTransmission.length} vehicles without transmission value.`);
    
    // Update each vehicle without transmission
    let updatedCount = 0;
    
    for (const vehicle of vehiclesWithoutTransmission) {
      await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { transmission: "Manual" }
      });
      updatedCount++;
    }
    
    console.log(`Updated ${updatedCount} vehicles with default "Manual" transmission.`);
    
    // Verify all vehicles now have a transmission value
    const updatedVehicles = await prisma.vehicle.findMany();
    const remainingWithoutTransmission = updatedVehicles.filter(v => !v.transmission).length;
    
    if (remainingWithoutTransmission === 0) {
      console.log('All vehicles now have a transmission value.');
    } else {
      console.log(`Warning: ${remainingWithoutTransmission} vehicles still don't have a transmission value.`);
    }
    
  } catch (error) {
    console.error('Error updating vehicles:', error);
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
