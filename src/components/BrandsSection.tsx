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
    logo: '/images/brands/audi.svg',
    slug: 'audi'
  },
  {
    id: '2',
    name: 'BMW',
    logo: '/images/brands/bmw.svg',
    slug: 'bmw'
  },
  {
    id: '3',
    name: 'Ford',
    logo: '/images/brands/ford.svg',
    slug: 'ford'
  },
  {
    id: '4',
    name: 'Mercedes Benz',
    logo: '/images/brands/mercedes.svg',
    slug: 'mercedes-benz'
  },
  {
    id: '5',
    name: 'Toyota',
    logo: '/images/brands/toyota.svg',
    slug: 'toyota'
  },
  {
    id: '6',
    name: 'Volkswagen',
    logo: '/images/brands/volkswagen.svg',
    slug: 'volkswagen'
  }
];

export default function BrandsSection() {
  return (
    <section className="relative mt-[-4rem] z-10 ">
      <div className="bg-white md:rounded-t-[5rem] pt-12 md:pt-24 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8 pt-4">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold">Explore Our Premium Brands</h2>
            <Link 
              href="/brands" 
              className="hidden md:flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Show All Brands
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* XL Screens: Grid Layout */}
          <div className="hidden xl:grid xl:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <Link 
                key={`grid-${brand.id}`}
                href={`/brands/${brand.slug}`} 
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border-transparent hover:border hover:border-gray-200 transition-all"
              >
                <div className="relative w-20 h-20 mb-3">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-center">{brand.name}</span>
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
                    className="sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
                  >
                    <Link 
                      href={`/brands/${brand.slug}`} 
                      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border-transparent hover:border hover:border-gray-200 transition-all h-full"
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
            href="/brands" 
            className="mt-8 flex md:hidden items-center justify-center text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Show All Brands
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
