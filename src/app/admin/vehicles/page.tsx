import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import DeleteVehicleButton from '@/components/DeleteVehicleButton';

// Define the page component without type annotations
export default async function VehiclesPage(props: any) {
  // Extract searchParams from props
  const { searchParams } = props;
  // Get the featured parameter after awaiting searchParams
  const { featured } = await searchParams;
  
  // Build filter object
  const filter: any = {};
  if (featured === 'true') {
    filter.featured = true;
  }
  
  // Fetch vehicles based on filters
  const vehicles = await prisma.vehicle.findMany({
    where: filter,
    orderBy: { createdAt: 'desc' },
  });
  
  // Get vehicle stats
  const totalVehicles = await prisma.vehicle.count();
  const featuredCount = await prisma.vehicle.count({ where: { featured: true } });
  
  // Get companies for filtering
  const companies = await prisma.vehicle.groupBy({
    by: ['company'],
    _count: true,
  });
  
  // Get fuel types for filtering
  const fuelTypes = await prisma.vehicle.groupBy({
    by: ['fuelType'],
    _count: true,
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vehicles ({vehicles.length})</h1>
        <Link
          href="/admin/vehicles/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Vehicle
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="space-y-2">
              <Link
                href="/admin/vehicles"
                className={`block px-3 py-2 rounded-md ${
                  !featured ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                }`}
              >
                All Vehicles ({totalVehicles})
              </Link>
              <Link
                href="/admin/vehicles?featured=true"
                className={`block px-3 py-2 rounded-md ${
                  featured === 'true' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                }`}
              >
                Featured Vehicles ({featuredCount})
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Companies</h3>
            <div className="max-h-32 overflow-y-auto pr-2 space-y-1">
              {companies.map((item) => (
                <div key={item.company} className="flex justify-between">
                  <span className="text-sm">{item.company}</span>
                  <span className="text-xs text-gray-500">{item._count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Fuel Types</h3>
            <div className="max-h-32 overflow-y-auto pr-2 space-y-1">
              {fuelTypes.map((item) => (
                <div key={item.fuelType} className="flex justify-between">
                  <span className="text-sm">{item.fuelType}</span>
                  <span className="text-xs text-gray-500">{item._count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Vehicles List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="grid grid-cols-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Name / Model</div>
              <div className="col-span-2">Company</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-1">Fuel</div>
              <div className="col-span-1">KM</div>
              <div className="col-span-1">Featured</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          </div>
          
          <div className="bg-white divide-y divide-gray-200">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div key={vehicle.id} className="grid grid-cols-12 px-6 py-4 text-sm">
                  <div className="col-span-3">
                    <div className="font-medium text-gray-900">{vehicle.name}</div>
                    <div className="text-gray-500">{vehicle.model}</div>
                  </div>
                  <div className="col-span-2">{vehicle.company}</div>
                  <div className="col-span-1">{vehicle.registeredYear}</div>
                  <div className="col-span-1 font-medium text-green-600">
                    ₹{vehicle.price.toLocaleString()}
                  </div>
                  <div className="col-span-1">{vehicle.fuelType}</div>
                  <div className="col-span-1">{vehicle.kilometers.toLocaleString()}</div>
                  <div className="col-span-1">
                    {vehicle.featured ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        No
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-right space-x-2">
                    <Link
                      href={`/admin/vehicles/edit/${vehicle.id}`}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Link>
                    <DeleteVehicleButton id={vehicle.id} />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-gray-500 text-center">
                No vehicles found. <Link href="/admin/vehicles/new" className="text-blue-600 hover:underline">Add your first vehicle</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 