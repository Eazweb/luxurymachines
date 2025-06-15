'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

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
};

export default function CollectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollectionContent />
    </Suspense>
  );
}

// Client component that uses searchParams
function CollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // States
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
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
        const response = await fetch(`/api/vehicles?${params.toString()}`);
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
        console.error('Error fetching vehicles:', error);
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
    router.push(`/collection?${params.toString()}`);
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
    router.push('/collection');
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sortedVehicles = [...vehicles];
    
    switch(value) {
      case 'price-low-high':
        sortedVehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedVehicles.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedVehicles.sort((a, b) => b.registeredYear - a.registeredYear);
        break;
      case 'oldest':
        sortedVehicles.sort((a, b) => a.registeredYear - b.registeredYear);
        break;
      default:
        break;
    }
    
    setVehicles(sortedVehicles);
  };
  
  return (
    <div className="min-h-screen w-full">
      {/* White section with filters */}
      <div className="bg-[#0f172a] py-6 md:py-8">
      <div className="container mx-auto w-[90%] px-4">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl md:rounded-full px-3 py-3 md:px-6 md:py-4 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-2">
            <div className="flex-1 min-w-[180px]">
              <select
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1rem",
                }}
              >
                <option value="">All Brands</option>
                {companies.map((company) => (
                  <option key={company} value={company} className="py-2 px-4 hover:bg-blue-50">
                    {company}
                  </option>
                ))}
              </select>
            </div>

            {/* Vertical Separator */}
            <div className="h-10 w-px bg-gray-200"></div>

            <div className="flex-1 min-w-[180px]">
              <select
                name="vehicleType"
                value={filters.vehicleType}
                onChange={handleFilterChange}
                className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1rem",
                }}
              >
                <option value="">All Models</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type} className="py-2 px-4 hover:bg-blue-50">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Vertical Separator */}
            <div className="h-10 w-px bg-gray-200"></div>

            <div className="w-full md:flex-1 md:min-w-[200px]">
              <div className="flex gap-2">
                <select
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1rem",
                  }}
                >
                  <option value="">Min Price</option>
                  <option value="100000">₹1 Lakh</option>
                  <option value="500000">₹5 Lakh</option>
                  <option value="1000000">₹10 Lakh</option>
                  <option value="2000000">₹20 Lakh</option>
                  <option value="3000000">₹30 Lakh</option>
                </select>
                <select
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1rem",
                  }}
                >
                  <option value="">Max Price</option>
                  <option value="500000">₹5 Lakh</option>
                  <option value="1000000">₹10 Lakh</option>
                  <option value="2000000">₹20 Lakh</option>
                  <option value="3000000">₹30 Lakh</option>
                  <option value="5000000">₹50 Lakh+</option>
                </select>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="h-10 w-px bg-gray-200"></div>

            <div className="flex-1 min-w-[180px]">
              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChange}
                className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1rem",
                }}
              >
                <option value="">All Fuel Types</option>
                {fuelTypes.map((type) => (
                  <option key={type} value={type} className="py-2 px-4 hover:bg-blue-50">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Vertical Separator */}
            <div className="h-10 w-px bg-gray-200"></div>

            <div className="w-full md:w-auto flex items-center justify-center md:justify-start md:px-4 pt-1.5 md:pt-0 border-t border-gray-200 md:border-t-0 mt-1.5 md:mt-0">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* Blue section with curve */}
      <div className="bg-[#0f172a] pt-12">
        <div className="h-[40px] md:h-[80px] rounded-t-full bg-white w-full"></div>
        <div className="container bg-white mx-auto px-4 pb-8">
          {/* Breadcrumb and Header */}
          <div className="mb-8  px-[5%]">
            <nav className="flex mb-2" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className=" text-sm font-medium text-gray-500 ">Collection</span>
                  </div>
                </li>
              </ol>
            </nav>
            
            <div className="flex flex-col mt-3 md:mt-5 md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl md:text-5xl font-medium text-gray-900">Our Collection</h1>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Vehicle Grid */} 
          <div className="mt-10 px-[5%]">
            {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : vehicles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                      <ProductCard
                        key={vehicle.id}
                        id={vehicle.id}
                        slug={vehicle.slug}
                        name={vehicle.name}
                        model={vehicle.model}
                        price={vehicle.price}
                        kilometers={vehicle.kilometers}
                        fuelType={vehicle.fuelType}
                        transmission={vehicle.vehicleType}
                        images={vehicle.images}
                        isGreatPrice={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 mb-2">No vehicles found</h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your filters to find what you're looking for.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
        </div>
          </div>
    </div>    
  );
} 