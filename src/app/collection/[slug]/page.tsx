'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import VehicleHeader from './components/VehicleHeader';
import VehicleImageGallery from './components/VehicleImageGallery';
import VehicleDetails from './components/VehicleDetails';
import RecommendedVehicles from './components/RecommendedVehicles';

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

export default function VehicleDetailPage() {
  const { slug } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/vehicles/${slug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle');
        }
        
        const data = await response.json();
        setVehicle(data);
        console.log(vehicle)
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('Failed to load vehicle details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchVehicle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {error || 'Vehicle not found'}
        </h2>
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
        <RecommendedVehicles currentVehicleId={vehicle.id} />
      </div>
     </div>
    </div>
  );
}