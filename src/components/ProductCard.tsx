import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookmarkIcon } from '@heroicons/react/24/outline';

export type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  price: number;
  model?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  images: string[];
  isForRent?: boolean;
  badgeText?: string;
  badgeColor?: string;
  href: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  price,
  model,
  mileage,
  fuelType,
  transmission,
  images,
  isForRent,
  badgeText = 'Great Price',
  badgeColor = 'bg-green-600',
  href,
}) => {
  return (
    <Link
      href={href}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full">
        {images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        
        {/* Badge */}
        {badgeText && (
          <div className={`absolute top-3 left-3 ${badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {badgeText}
          </div>
        )}
        
        {/* Bookmark Button */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md opacity-90 hover:opacity-100">
          <BookmarkIcon className="h-5 w-5 text-gray-700" />
        </button>
        
        {/* For Rent Badge */}
        {isForRent && (
          <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            For Rent
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        {model && <p className="text-sm text-gray-500 mb-2">{model}</p>}
        
        {/* Specs */}
        <div className="flex items-center justify-between mt-3 mb-3">
          {mileage !== undefined && (
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-2 mr-2">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{mileage} Miles</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          {fuelType && (
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-2 mr-2">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <span className="text-sm font-medium">{fuelType}</span>
            </div>
          )}
          
          {transmission && (
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-2 mr-2">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-sm font-medium">{transmission}</span>
            </div>
          )}
        </div>
        
        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</div>
          <div className="text-sm text-blue-600 font-medium">
            <span className="inline-flex items-center">
              View Details
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
