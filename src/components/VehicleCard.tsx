import React from 'react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  name: string;
  company: string;
  price: number;
  images: string[];
  fuelType: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Link href={`/collection/${vehicle.id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{vehicle.company}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{vehicle.name}</p>
      <p className="mt-1 text-sm text-gray-700">{vehicle.fuelType}</p>
      <p className="mt-1 text-lg font-medium text-gray-900">${vehicle.price.toLocaleString()}</p>
    </Link>
  );
};

export default VehicleCard;
