// Script to delete all vehicles and seed 20 new vehicles with 10 images each
import { PrismaClient } from '../src/generated/prisma/index.js';
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
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2825&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2970&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2883&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2940&auto=format&fit=crop'
];

// Sample data for vehicle generation
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

// Function to get 10 random unique images
function getRandomImages() {
  // Shuffle array and take first 10 elements
  const shuffled = [...IMAGE_URLS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
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
            images: getRandomImages(), // Using 10 random images
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
