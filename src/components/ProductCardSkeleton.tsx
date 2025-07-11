import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 rounded bg-gray-300 mb-2"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300 mb-4"></div>
        <div className="h-8 w-1/3 rounded bg-gray-300 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/4 rounded bg-gray-300"></div>
          <div className="h-4 w-1/4 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
