// Prisma seed script - ES Module version
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Multiple luxury car image URLs for variety
const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2937&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop'
];

const companies = ['BMW', 'Audi', 'Mercedes', 'Jaguar', 'Lexus', 'Volvo', 'Porsche', 'Land Rover', 'Mini', 'Bentley'];
const models = ['X5', 'A6', 'C-Class', 'XF', 'RX', 'XC90', '911', 'Discovery', 'Cooper', 'Continental'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury'];
const ownerships = ['1st Owner', '2nd Owner', '3rd Owner'];
const transmissions = ['Manual', 'Automatic'];

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

// Function to get 5 random unique images
function getRandomImages() {
  // Shuffle array and take first 5 elements
  const shuffled = [...IMAGE_URLS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

async function main() {
  try {
    // First delete all existing vehicles
    console.log('Deleting all existing vehicles...');
    const deletedCount = await prisma.vehicle.deleteMany({});
    console.log(`Deleted ${deletedCount.count} vehicles successfully!`);
    
    console.log('Starting to seed 20 vehicles...');
    
    for (let i = 0; i < 20; i++) {
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
      const transmission = randomFrom(transmissions);
      const featured = Math.random() < 0.3;
      const isForRent = Math.random() < 0.5;
      
      // Create base slug and ensure it's unique
      const baseSlug = `${name}-${registeredYear}`.toLowerCase().replace(/\s+/g, '-');
      const slug = await generateUniqueSlug(baseSlug);
      
      console.log(`Creating vehicle ${i+1}/20: ${name}`);
      
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
            transmission,
            images: getRandomImages(),
            featured,
            isForRent,
          },
        });
      } catch (error) {
        console.error(`Error creating vehicle ${name}:`, error);
      }
    }
    console.log('Seeded 20 vehicles successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
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