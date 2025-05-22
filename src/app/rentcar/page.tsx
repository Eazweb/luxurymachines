'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

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
  isForRent: boolean;
};

export default function RentCarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // States
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    company: searchParams.get('company') || '',
    fuelType: searchParams.get('fuelType') || '',
    vehicleType: searchParams.get('vehicleType') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
  });
  
  // Filter options
  const [companies, setCompanies] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  
  // Fetch vehicles based on filters
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.company) params.append('company', filters.company);
      if (filters.fuelType) params.append('fuelType', filters.fuelType);
      if (filters.vehicleType) params.append('vehicleType', filters.vehicleType);
      if (filters.priceMin) params.append('priceMin', filters.priceMin);
      if (filters.priceMax) params.append('priceMax', filters.priceMax);
      
      try {
        const response = await fetch(`/api/rentcars?${params.toString()}`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setVehicles(data);
          
          // Extract unique filter options from data
          const uniqueCompanies = [...new Set(data.map((vehicle) => vehicle.company))];
          const uniqueFuelTypes = [...new Set(data.map((vehicle) => vehicle.fuelType))];
          const uniqueVehicleTypes = [...new Set(data.map((vehicle) => vehicle.vehicleType))];
          
          setCompanies(uniqueCompanies);
          setFuelTypes(uniqueFuelTypes);
          setVehicleTypes(uniqueVehicleTypes);
        }
      } catch (error) {
        console.error('Error fetching rental vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, [
    filters.company,
    filters.fuelType,
    filters.vehicleType,
    filters.priceMin,
    filters.priceMax,
  ]);
  
  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    
    // Update URL query parameters
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`/rentcar?${params.toString()}`);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      company: '',
      fuelType: '',
      vehicleType: '',
      priceMin: '',
      priceMax: '',
    });
    router.push('/rentcar');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Rental Vehicles</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Company Filter */}
              <div>
                <label 
                  htmlFor="company" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Brand
                </label>
                <select
                  id="company"
                  name="company"
                  value={filters.company}
                  onChange={handleFilterChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="">All Brands</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Fuel Type Filter */}
              <div>
                <label 
                  htmlFor="fuelType" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Vehicle Type Filter */}
              <div>
                <label 
                  htmlFor="vehicleType" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Vehicle Type
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={filters.vehicleType}
                  onChange={handleFilterChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="">All Vehicle Types</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label 
                      htmlFor="priceMin" 
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Min
                    </label>
                    <input
                      type="number"
                      id="priceMin"
                      name="priceMin"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="priceMax" 
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Max
                    </label>
                    <input
                      type="number"
                      id="priceMax"
                      name="priceMax"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vehicles Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-xl font-medium text-gray-800 mb-2">No rental vehicles found</h2>
              <p className="text-gray-600">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Link 
                  key={vehicle.id} 
                  href={`/collection/${vehicle.slug}`}
                  className="block bg-white rounded-lg shadow overflow-hidden transition transform hover:scale-[1.02]"
                >
                  <div className="relative h-48 w-full">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <Image
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
                      For Rent
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{vehicle.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{vehicle.company} {vehicle.model}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-blue-600">₹{vehicle.price.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{vehicle.fuelType}</span>
                        <span className="mx-1">•</span>
                        <span>{vehicle.registeredYear}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
