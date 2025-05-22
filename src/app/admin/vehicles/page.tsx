import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import DeleteVehicleButton from '@/components/DeleteVehicleButton';

// Define the page component without type annotations
export default async function VehiclesPage(props: any) {
  // Extract searchParams from props
  const { searchParams } = props;
  // Get the featured parameter
  const { featured } = searchParams;
  
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
          className="px-4 py-2 bg-[#2563eb] text-white rounded-md hover:bg-[#1d4ed8]"
        >
          Add New Vehicle
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-[#ffffff] rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="space-y-2">
              <Link
                href="/admin/vehicles"
                className={`block px-3 py-2 rounded-md ${
                  !featured ? 'bg-[#dbeafe] text-[#1e40af]' : 'hover:bg-[#f3f4f6]'
                }`}
              >
                All Vehicles ({totalVehicles})
              </Link>
              <Link
                href="/admin/vehicles?featured=true"
                className={`block px-3 py-2 rounded-md ${
                  featured === 'true' ? 'bg-[#dbeafe] text-[#1e40af]' : 'hover:bg-[#f3f4f6]'
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
                  <span className="text-xs text-[#6b7280]">{item._count}</span>
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
                  <span className="text-xs text-[#6b7280]">{item._count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Vehicles List */}
      <div className="bg-[#ffffff] rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-[#e5e7eb]">
          <div className="bg-[#f9fafb]">
            <div className="grid grid-cols-12 px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">
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
          
          <div className="bg-[#ffffff] divide-y divide-[#e5e7eb]">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div key={vehicle.id} className="grid grid-cols-12 px-6 py-4 text-sm">
                  <div className="col-span-3">
                    <div className="font-medium text-[#111827]">{vehicle.name}</div>
                    <div className="text-[#6b7280]">{vehicle.model}</div>
                  </div>
                  <div className="col-span-2">{vehicle.company}</div>
                  <div className="col-span-1">{vehicle.registeredYear}</div>
                  <div className="col-span-1 font-medium text-[#059669]">
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
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 border border-gray-300">
                        No
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-right space-x-2">
                    <Link
                      href={`/admin/vehicles/edit/${vehicle.id}`}
                      className="inline-flex items-center px-2.5 py-1.5 border border-[#d1d5db] shadow-sm text-xs font-medium rounded text-[#374151] bg-[#ffffff] hover:bg-[#f9fafb]"
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Link>
                    <DeleteVehicleButton id={vehicle.id} />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-[#6b7280] text-center">
                No vehicles found. <Link href="/admin/vehicles/new" className="text-[#2563eb] hover:underline">Add your first vehicle</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 