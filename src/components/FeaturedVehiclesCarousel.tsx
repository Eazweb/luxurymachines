'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Vehicle } from '@/generated/prisma';
import ProductCard from './ProductCard';

interface FeaturedVehiclesCarouselProps {
  vehicles: Vehicle[];
}

export default function FeaturedVehiclesCarousel({ vehicles }: FeaturedVehiclesCarouselProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container  w-[90%] max-w-[1500px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl xl:text-[2.5rem] font-semibold">Explore All Vehicles</h2>
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
                  <ProductCard
                    id={vehicle.id}
                    slug={vehicle.slug}
                    name={vehicle.name}
                    model={vehicle.model || ''}
                    price={vehicle.price}
                    kilometers={vehicle.kilometers}
                    fuelType={vehicle.fuelType}
                    transmission={vehicle.transmission}
                    images={vehicle.images}
                    isForRent={vehicle.isForRent}
                  />
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
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-1">
              {vehicles.map((vehicle) => (
                <CarouselItem key={vehicle.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <ProductCard
                    id={vehicle.id}
                    slug={vehicle.slug}
                    name={vehicle.name}
                    model={vehicle.model || ''}
                    price={vehicle.price}
                    kilometers={vehicle.kilometers}
                    fuelType={vehicle.fuelType}
                    transmission={vehicle.transmission}
                    images={vehicle.images}
                    isForRent={vehicle.isForRent}
                  />
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
                  <ProductCard
                    id={vehicle.id}
                    slug={vehicle.slug}
                    name={vehicle.name}
                    model={vehicle.model || ''}
                    price={vehicle.price}
                    kilometers={vehicle.kilometers}
                    fuelType={vehicle.fuelType}
                    transmission={vehicle.transmission}
                    images={vehicle.images}
                    isForRent={vehicle.isForRent}
                  />
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


