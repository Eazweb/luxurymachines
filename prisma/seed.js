// Prisma seed script
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const IMAGE_URL = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2940&auto=format&fit=crop';

const companies = ['BMW', 'Audi', 'Mercedes', 'Jaguar', 'Lexus', 'Volvo', 'Porsche', 'Land Rover', 'Mini', 'Bentley'];
const models = ['X5', 'A6', 'C-Class', 'XF', 'RX', 'XC90', '911', 'Discovery', 'Cooper', 'Continental'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury'];
const ownerships = ['1st Owner', '2nd Owner', '3rd Owner'];

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
  console.log('Starting to seed 15 vehicles...');
  
  for (let i = 0; i < 15; i++) {
    const company = randomFrom(companies);
    const model = randomFrom(models);
    const name = `${company} ${model}`;
    const price = Math.floor(Math.random() * 40 + 10) * 100000;
    const registeredYear = 2015 + Math.floor(Math.random() * 10);
    const kilometers = Math.floor(Math.random() * 90000 + 10000);
    const registeredState = 'MH';
    const vehicleType = randomFrom(vehicleTypes);
    const ownership = randomFrom(ownerships);
    const fuelType = randomFrom(fuelTypes);
    const featured = Math.random() < 0.3;
    const isForRent = Math.random() < 0.5;
    
    // Create base slug and ensure it's unique
    const baseSlug = `${name}-${registeredYear}`.toLowerCase().replace(/\s+/g, '-');
    const slug = await generateUniqueSlug(baseSlug);
    
    console.log(`Creating vehicle ${i+1}/15: ${name}`);
    
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
        },
      });
    } catch (error) {
      console.error(`Error creating vehicle ${name}:`, error);
    }
  }
  console.log('Seeded 15 vehicles successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting from database...');
    await prisma.$disconnect();
  }); 