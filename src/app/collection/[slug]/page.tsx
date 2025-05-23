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
    <div className="max-w-full px-4 py-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/home" className="text-blue-600 hover:underline text-sm">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/listings" className="text-blue-600 hover:underline text-sm">Listings</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 text-sm">{vehicle.company} {vehicle.name} – {vehicle.registeredYear}</span>
        </div>
      
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="lg:w-2/3">
            <div className="relative h-[500px] mb-4 rounded-lg overflow-hidden">
              {vehicle.images && vehicle.images.length > 0 ? (
                <Image
                  src={vehicle.images[activeImage]}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Great Price</span>
              </div>
            </div>
            
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {vehicle.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-24 rounded-md overflow-hidden ${index === activeImage ? 'ring-2 ring-blue-500' : ''}`}
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
          <div className="lg:w-1/3">
            <h1 className="text-3xl font-bold mb-1">{vehicle.company} {vehicle.name} – {vehicle.registeredYear}</h1>
            <p className="text-lg text-gray-600 mb-2">{vehicle.model} {vehicle.vehicleType} {vehicle.fuelType}</p>
            
            <div className="mt-6 mb-6">
              <p className="text-4xl font-bold text-gray-900">₹{vehicle.price.toLocaleString()}</p>
              <button className="mt-3 flex items-center text-blue-600 font-medium">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Make An Offer Price
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-3">Car Overview</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex items-start">
                  <div className="mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Body</p>
                    <p className="font-medium">{vehicle.vehicleType}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-medium">{vehicle.kilometers.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-medium">{vehicle.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium">{vehicle.registeredYear}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium">Manual</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button 
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Message Dealer
              </button>
              <button 
                className="block w-full border border-green-500 bg-white text-green-500 text-center py-3 rounded-lg hover:bg-green-50 transition-colors"
              >
                Chat Via Whatsapp
              </button>
            </div>
          </div>
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
        
        {/* Admin Info */}
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                <Image 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Admin" 
                  width={64} 
                  height={64} 
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">admin</h3>
                <p className="text-gray-600">943 Broadway, Brooklyn</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <a href="#" className="text-blue-600 hover:underline flex items-center justify-center">
              View All stock at this dealer
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}