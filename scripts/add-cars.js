// Script to add 15 cars to the database
import { PrismaClient } from '../src/generated/prisma/index.js';
const prisma = new PrismaClient();

// Sample data for car generation
const IMAGE_URL = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2940&auto=format&fit=crop';

const companies = ['BMW', 'Audi', 'Mercedes', 'Jaguar', 'Lexus', 'Volvo', 'Porsche', 'Land Rover', 'Mini', 'Bentley'];
const models = ['X5', 'A6', 'C-Class', 'XF', 'RX', 'XC90', '911', 'Discovery', 'Cooper', 'Continental'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury'];
const ownerships = ['1st Owner', '2nd Owner', '3rd Owner'];
const colors = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Grey'];
const driveTypes = ['AWD', 'RWD', 'FWD'];

// Helper function to get random item from array
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a unique slug with random suffix if needed
async function generateUniqueSlug(baseSlug) {
  const existingVehicle = await prisma.vehicle.findUnique({
    where: { slug: baseSlug },
  });
  
  if (!existingVehicle) {
    return baseSlug;
  }
  
  // Add random suffix if slug exists
  const randomSuffix = Math.floor(Math.random() * 1000).toString();
  return `${baseSlug}-${randomSuffix}`;
}

async function main() {
  console.log('Starting to add 15 cars to the database...');
  
  for (let i = 0; i < 15; i++) {
    const company = randomFrom(companies);
    const model = randomFrom(models);
    const name = `${company} ${model}`;
    const price = Math.floor(Math.random() * 40 + 10) * 100000; // 10-50 lakhs
    const registeredYear = 2015 + Math.floor(Math.random() * 10); // 2015-2024
    const manufacturingYear = registeredYear - Math.floor(Math.random() * 2); // 0-1 years before registration
    const kilometers = Math.floor(Math.random() * 90000 + 10000); // 10k-100k km
    const registeredState = 'MH';
    const vehicleType = randomFrom(vehicleTypes);
    const ownership = randomFrom(ownerships);
    const fuelType = randomFrom(fuelTypes);
    const featured = Math.random() < 0.3; // 30% chance to be featured
    const isForRent = Math.random() < 0.5; // 50% chance to be for rent
    const exteriorColor = randomFrom(colors);
    const drive = randomFrom(driveTypes);
    const door = Math.floor(Math.random() * 2) * 2 + 2; // 2 or 4 doors
    const seatingCapacity = vehicleType === 'SUV' ? 7 : 5;
    const airbags = Math.floor(Math.random() * 6) + 2; // 2-8 airbags
    const torque = `${Math.floor(Math.random() * 300 + 200)} Nm`;
    const power = `${Math.floor(Math.random() * 200 + 100)} bhp`;
    const groundClearance = `${Math.floor(Math.random() * 100 + 150)} mm`;
    const entertainment = Math.random() < 0.7 ? 'Touchscreen Infotainment System' : 'Basic Audio System';
    
    // Create base slug and ensure it's unique
    const baseSlug = `${name}-${registeredYear}`.toLowerCase().replace(/\s+/g, '-');
    const slug = await generateUniqueSlug(baseSlug);
    
    console.log(`Creating car ${i+1}/15: ${name}`);
    
    try {
      await prisma.vehicle.create({
        data: {
          slug,
          name,
          price,
          model,
          company,
          fuelType,
          registeredYear,
          kilometers,
          registeredState,
          vehicleType,
          ownership,
          images: [IMAGE_URL],
          featured,
          isForRent,
          exteriorColor,
          manufacturingYear,
          seatingCapacity,
          entertainment,
          airbags,
          groundClearance,
          torque,
          power,
          door,
          drive
        },
      });
    } catch (error) {
      console.error(`Error creating car ${name}:`, error);
    }
  }
  console.log('Added 15 cars successfully!');
}

main()
  .catch((e) => {
    console.error('Error adding cars:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting from database...');
    await prisma.$disconnect();
  });
