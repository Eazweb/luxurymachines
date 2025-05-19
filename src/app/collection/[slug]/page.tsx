'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
      <div className="container mx-auto px-4 py-16 flex flex-col items-center min-h-[60vh]">
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/collection"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Collection
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div>
            <div className="relative h-[400px] mb-4 rounded-lg overflow-hidden">
              {vehicle.images && vehicle.images.length > 0 ? (
                <Image
                  src={vehicle.images[activeImage]}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${index === activeImage ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <Image
                      src={image}
                      alt={`${vehicle.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Vehicle Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{vehicle.model}</p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-3xl font-bold text-green-600">₹{vehicle.price.toLocaleString()}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium">{vehicle.company}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="font-medium">{vehicle.fuelType}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{vehicle.registeredYear}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Kilometers</p>
                <p className="font-medium">{vehicle.kilometers.toLocaleString()} km</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Vehicle Type</p>
                <p className="font-medium">{vehicle.vehicleType}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Ownership</p>
                <p className="font-medium">{vehicle.ownership}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Registered State</p>
                <p className="font-medium">{vehicle.registeredState}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href={`mailto:info@luxurycars.com?subject=Inquiry about ${vehicle.name}`}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Seller
              </a>
            </div>
          </div>
        </div>
        
        {/* Description & Features */}
        <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 mb-6">
            {vehicle.description || 'No description available for this vehicle.'}
          </p>
          
          {vehicle.features && vehicle.features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}