'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecommendedVehicles } from '@/app/actions/vehicle';
import { Car } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Vehicle {
  id: string;
  name: string;
  price: number;
  model: string;
  company: string;
  fuelType: string;
  registeredYear: number;
  kilometers: number;
  images: string[];
  slug: string;
}

interface RecommendedVehiclesProps {
  currentVehicleId: string;
}

export default function RecommendedVehicles({ currentVehicleId }: RecommendedVehiclesProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedVehicles = async () => {
      try {
        const result = await getRecommendedVehicles(currentVehicleId, 6);
        if (result.success && result.data) {
          setVehicles(result.data);
        }
      } catch (error) {
        console.error('Error fetching recommended vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedVehicles();
  }, [currentVehicleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">You May Also Like</h2>
        
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {vehicles.map((vehicle) => (
              <CarouselItem key={vehicle.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link href={`/collection/${vehicle.slug}`} className="block h-full">
                  <ProductCard
                    id={vehicle.id}
                    slug={vehicle.slug}
                    name={`${vehicle.company} ${vehicle.name}`}
                    model={vehicle.model}
                    price={vehicle.price}
                    kilometers={vehicle.kilometers}
                    fuelType={vehicle.fuelType}
                    images={vehicle.images}
                    transmission={vehicle.fuelType}
                    isGreatPrice={false}
                  />
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
    </div>
  );
}
