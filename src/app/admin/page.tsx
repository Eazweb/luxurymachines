import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Get vehicle counts
  const totalVehicles = await prisma.vehicle.count();
  const featuredVehicles = await prisma.vehicle.count({ 
    where: { featured: true } 
  });
  
  // Get fuel type distribution
  const fuelTypes = await prisma.vehicle.groupBy({
    by: ['fuelType'],
    _count: true,
  });
  
  // Get vehicle type distribution
  const vehicleTypes = await prisma.vehicle.groupBy({
    by: ['vehicleType'],
    _count: true,
  });
  
  // Get most recent vehicles
  const recentVehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      name: true,
      model: true,
      price: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#ffffff] p-6 rounded-lg shadow">
          <h3 className="text-[#6b7280] text-sm font-medium">Total Vehicles</h3>
          <p className="mt-2 text-3xl font-bold text-[#171717]">{totalVehicles}</p>
          <div className="mt-4">
            <Link 
              href="/admin/vehicles" 
              className="text-[#2563eb] text-sm font-medium hover:underline"
            >
              View all vehicles
            </Link>
          </div>
        </div>
        
        <div className="bg-[#ffffff] p-6 rounded-lg shadow">
          <h3 className="text-[#6b7280] text-sm font-medium">Featured Vehicles</h3>
          <p className="mt-2 text-3xl font-bold text-[#171717]">{featuredVehicles}</p>
          <div className="mt-4">
            <Link 
              href="/admin/vehicles?featured=true" 
              className="text-[#2563eb] text-sm font-medium hover:underline"
            >
              View featured vehicles
            </Link>
          </div>
        </div>
        
        <div className="bg-[#ffffff] p-6 rounded-lg shadow">
          <h3 className="text-[#6b7280] text-sm font-medium">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <Link 
              href="/admin/vehicles/new" 
              className="block text-[#2563eb] text-sm font-medium hover:underline"
            >
              Add new vehicle
            </Link>
            <Link 
              href="/" 
              target="_blank"
              className="block text-[#2563eb] text-sm font-medium hover:underline"
            >
              View website
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Vehicles */}
      <div className="bg-[#ffffff] rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-[#171717]">Recently Added Vehicles</h3>
        </div>
        <div className="divide-y">
          {recentVehicles.length > 0 ? (
            recentVehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-6 flex justify-between items-center">
                <div>
                  <p className="font-medium">{vehicle.name}</p>
                  <p className="text-sm text-[#6b7280]">{vehicle.model}</p>
                </div>
                <div>
                  <p className="font-medium text-[#059669]">₹{vehicle.price.toLocaleString()}</p>
                  <p className="text-xs text-[#6b7280]">
                    Added {new Date(vehicle.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/admin/vehicles/edit/${vehicle.id}`}
                    className="text-[#2563eb] text-sm font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="p-6 text-[#6b7280]">No vehicles added yet</p>
          )}
        </div>
      </div>
      
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#ffffff] rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-[#171717] mb-4">Fuel Type Distribution</h3>
          <div className="space-y-2">
            {fuelTypes.map((type) => (
              <div key={type.fuelType} className="flex items-center">
                <span className="w-1/3 text-sm">{type.fuelType}</span>
                <div className="w-2/3 h-4 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2563eb]"
                    style={{ width: `${(type._count / totalVehicles) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#ffffff] rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-[#171717] mb-4">Vehicle Type Distribution</h3>
          <div className="space-y-2">
            {vehicleTypes.map((type) => (
              <div key={type.vehicleType} className="flex items-center">
                <span className="w-1/3 text-sm">{type.vehicleType}</span>
                <div className="w-2/3 h-4 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2563eb]"
                    style={{ width: `${(type._count / totalVehicles) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 