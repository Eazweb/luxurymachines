import React from 'react';

const VehicleSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-300 xl:aspect-w-7 xl:aspect-h-8"></div>
      <div className="mt-4 h-4 w-1/4 rounded bg-gray-300"></div>
      <div className="mt-2 h-6 w-1/2 rounded bg-gray-300"></div>
      <div className="mt-2 h-4 w-1/4 rounded bg-gray-300"></div>
      <div className="mt-2 h-6 w-1/3 rounded bg-gray-300"></div>
    </div>
  );
};

export default VehicleSkeleton;
