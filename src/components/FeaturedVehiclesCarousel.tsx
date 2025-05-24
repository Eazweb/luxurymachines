'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, ArrowRight, Timer, Fuel, Settings2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Vehicle interface
interface Vehicle {
  id: string;
  name: string;
  slug: string;
  model?: string;
  price: number;
  images: string[];
  registeredYear?: string;
  fuelType?: string;
  mileage?: number;
  transmission?: string;
  isGreatPrice?: boolean;
}

interface FeaturedVehiclesCarouselProps {
  vehicles: Vehicle[];
}

export default function FeaturedVehiclesCarousel({ vehicles }: FeaturedVehiclesCarouselProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Explore All Vehicles</h2>
          </div>
          <Link 
            href="/collection" 
            className="hidden md:flex items-center text-blue-600 font-medium"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {/* XL Screens: Grid Layout - 4 at a time */}
        <div className="hidden xl:block">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              slidesToScroll: 2
            }}
            className="w-full"
          >
            <CarouselContent>
              {vehicles.map((vehicle) => (
                <CarouselItem key={`xl-${vehicle.id}`} className="basis-1/4 pl-4">
                  <VehicleCard vehicle={vehicle} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2 rounded-full" />
              <CarouselNext className="static translate-y-0 ml-2 rounded-full" />
            </div>
          </Carousel>
        </div>
        
        {/* Medium to Large Screens: Carousel - 2 at a time */}
        <div className="hidden md:block xl:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              slidesToScroll: 2
            }}
            className="w-full"
          >
            <CarouselContent>
              {vehicles.map((vehicle) => (
                <CarouselItem key={`md-${vehicle.id}`} className="basis-1/2 pl-4">
                  <VehicleCard vehicle={vehicle} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2 rounded-full" />
              <CarouselNext className="static translate-y-0 ml-2 rounded-full" />
            </div>
          </Carousel>
        </div>
        
        {/* Small Screens: Carousel - 1 at a time */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              slidesToScroll: 1
            }}
            className="w-full"
          >
            <CarouselContent>
              {vehicles.map((vehicle) => (
                <CarouselItem key={`sm-${vehicle.id}`} className="basis-full pl-4">
                  <VehicleCard vehicle={vehicle} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2 rounded-full" />
              <CarouselNext className="static translate-y-0 ml-2 rounded-full" />
            </div>
          </Carousel>
        </div>
        
        <Link 
          href="/collection" 
          className="mt-8 flex md:hidden items-center justify-center text-blue-600 font-medium"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

// Vehicle Card Component
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
      {/* Image Container */}
      <div className="relative h-48 md:h-56">
        {vehicle.images.length > 0 ? (
          <Image
            src={vehicle.images[0]}
            alt={vehicle.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        
        {/* Bookmark Button */}
        <button 
          className="absolute top-2 right-2 bg-white p-1.5 rounded-md shadow-sm"
          aria-label="Save to favorites"
        >
          <Bookmark className="h-5 w-5 text-gray-500" />
        </button>
        
        {/* Great Price Tag */}
        {vehicle.isGreatPrice && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Great Price
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{vehicle.name}</h3>
        <p className=" text-sm mb-2 truncate">
          {vehicle.model} • {vehicle.fuelType} • {vehicle.transmission || 'Automatic'}
        </p>
        
        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center">
            <div className='py-2'>
              <Timer size={20} />
            </div>
            <span className="text-xs">{vehicle.mileage || 0} Miles</span>
          </div>
          
          <div className="flex flex-col items-center"> 
            <div className='py-2'>
              <Fuel size={20}/>
            </div>
            <span className="text-xs">{vehicle.fuelType || 'Petrol'}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className='py-2'>
              <Settings2 size={20}/>
            </div>
            <span className="text-xs">{vehicle.transmission || 'Automatic'}</span>
          </div>
        </div>
        
        {/* Price and Details Link */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-semibold">₹{vehicle.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
          <Link 
            href={`/collection/${vehicle.slug}`}
            className="text-blue-600 flex items-center text-sm"
          >
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
