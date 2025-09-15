import Link from 'next/link';
import { getPrismaClient } from '@/lib/db';
import VehicleHeader from './components/VehicleHeader';
import VehicleImageGallery from './components/VehicleImageGallery';
import VehicleDetails from './components/VehicleDetails';
import RecommendedVehicles from './components/RecommendedVehicles';
import EMICalculator from '@/components/EMICalculator';

// Types
type Vehicle = {
  id: string;
  slug: string;
  name: string;
  price: number;
  model: string;
  company: string;
  fuelType: string;
  registeredYear: number;
  kilometers: number;
  registeredState: string;
  vehicleType: string;
  ownership: string;
  images: string[];
  description?: string;
  features?: string[];
};

export const revalidate = 60; // cache detail pages for 60s

export default async function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const prisma = getPrismaClient();
  const slug = params.slug;

  // Try slug first, fall back to ID-like pattern (keep parity with API route)
  let vehicle = await prisma.vehicle.findUnique({ where: { slug } });
  if (!vehicle && /^[0-9a-fA-F]{24}$/.test(slug)) {
    vehicle = await prisma.vehicle.findUnique({ where: { id: slug } });
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Vehicle not found</h2>
        <Link
          href="/collection"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a]">
      <div className='container mx-auto max-w-full md:pb-8'>
        <div className='h-[40px] md:h-[80px] rounded-t-full bg-white w-full'></div>

        <div className='bg-white px-[4%] mx-auto'>
          <VehicleHeader vehicle={vehicle} />
          <VehicleImageGallery images={vehicle?.images} />
          <VehicleDetails vehicle={vehicle} />
          <EMICalculator price={vehicle.price} />
          <RecommendedVehicles currentVehicleId={vehicle.id} />
        </div>
      </div>
    </div>
  );
}