'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Brand interface
interface Brand {
  id: string;
  name: string;
  logo: string;
  slug: string;
}

// Sample brands data
const brands: Brand[] = [
  {
    id: '1',
    name: 'Audi',
    logo: '/images/brands/audi.png',
    slug: 'audi'
  },
  {
    id: '2',
    name: 'BMW',
    logo: '/images/brands/bmw.png',
    slug: 'bmw'
  },
  {
    id: '3',
    name: 'Ford',
    logo: '/images/brands/ford.png',
    slug: 'ford'
  },
  {
    id: '4',
    name: 'Mercedes Benz',
    logo: '/images/brands/mercedes.png',
    slug: 'mercedes-benz'
  },
  {
    id: '5',
    name: 'Toyota',
    logo: '/images/brands/toyota.png',
    slug: 'toyota'
  },
  {
    id: '6',
    name: 'Volkswagen',
    logo: '/images/brands/volkswagen.png',
    slug: 'volkswagen'
  }
];

export default function BrandsSection() {
  return (
    <section className="relative pt-8 md:pt-0 ">
      <div className="bg-[#fafbfd] pb-8 md:pb-12 lg:pb-16">
        <div className="container w-[90%] max-w-[1500px] mx-auto">
          <div className="flex justify-between items-center mb-8 pt-4">
            <h2 className="text-2xl md:text-3xl xl:text-[2.5rem] font-semibold">Explore Our Premium Brands</h2>
            <Link 
              href="/collection" 
              className="hidden md:flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              View All Vehicles
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* XL Screens: Grid Layout */}
          <div className="hidden xl:grid xl:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <Link 
                key={`grid-${brand.id}`}
                href={`/collection?company=${encodeURIComponent(brand.name)}`} 
                className="flex relative flex-col items-center aspect-[5/4] justify-center p-5 bg-white rounded-xl border-[1px] border-grey-300 hover:border-gray-700 hover:duration-300 transition-all"
              >
                <div className="relative w-20 h-20 my-3">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={100}
                    height={100}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <span className="text-lg  text-center">{brand.name}</span>
              </Link>
            ))}
          </div>

          {/* Small to Large Screens: Carousel */}
          <div className="xl:hidden">
            <Carousel 
              opts={{
                align: 'start',
                loop: true,
                slidesToScroll: 1
              }}
              className="w-full"
            >
              <CarouselContent>
                {brands.map((brand) => (
                  <CarouselItem 
                    key={`carousel-${brand.id}`} 
                    className="basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
                  >
                    <Link 
                      href={`/collection?company=${encodeURIComponent(brand.name)}`}
                      className="flex flex-col items-center aspect-[5/4] justify-center p-4 bg-white rounded-xl border-[1px] border-grey-300 hover:border-gray-700 transition-all h-full"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-center">{brand.name}</span>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0 ml-2" />
              </div>
            </Carousel>
          </div>
          
          <Link 
            href="/collection" 
            className="mt-8 flex md:hidden items-center justify-center text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            View All Vehicles
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
