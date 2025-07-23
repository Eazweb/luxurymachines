import React from 'react';

const SkeletonElement = ({ className }: { className?: string }) => (
  <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>
);

const VehiclePageSkeleton = () => {
  return (
    <div className="bg-[#0f172a]">
      <div className='container mx-auto max-w-full md:pb-8'>
        <div className='h-[40px] md:h-[80px] rounded-t-full bg-white w-full'></div>
        <div className='bg-white px-[4%] mx-auto pb-8'>
          {/* VehicleHeader Skeleton */}
          <div className="pt-6 pb-4">
            <SkeletonElement className="h-8 w-3/4 mb-2" />
            <SkeletonElement className="h-6 w-1/2" />
          </div>

          {/* VehicleImageGallery Skeleton */}
          <div>
            {/* Mobile Skeleton */}
            <div className="lg:hidden mb-3">
              <SkeletonElement className="aspect-[5/3] w-full rounded-lg" />
            </div>
            {/* Desktop Skeleton */}
            <div className="hidden lg:grid grid-cols-2 gap-3 mb-3">
              <SkeletonElement className="aspect-[5/3] rounded-lg row-span-2 col-span-1" />
              <div className="grid grid-cols-2 gap-3">
                <SkeletonElement className="aspect-[5/3] rounded-lg" />
                <SkeletonElement className="aspect-[5/3] rounded-lg" />
                <SkeletonElement className="aspect-[5/3] rounded-lg" />
                <SkeletonElement className="aspect-[5/3] rounded-lg" />
              </div>
            </div>
          </div>

          {/* VehicleDetails Skeleton */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <SkeletonElement className="h-7 w-1/3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <SkeletonElement className="h-5 w-24 mb-1" />
                  <SkeletonElement className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* EMICalculator Skeleton */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <SkeletonElement className="h-7 w-1/4 mb-4" />
            <div className="flex flex-col md:flex-row gap-4">
              <SkeletonElement className="h-24 w-full md:w-1/2 rounded-lg" />
              <SkeletonElement className="h-24 w-full md:w-1/2 rounded-lg" />
            </div>
          </div>

          {/* RecommendedVehicles Skeleton */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <SkeletonElement className="h-7 w-1/3 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <SkeletonElement className="aspect-video w-full mb-3" />
                  <SkeletonElement className="h-6 w-3/4 mb-2" />
                  <SkeletonElement className="h-5 w-1/2" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VehiclePageSkeleton;
