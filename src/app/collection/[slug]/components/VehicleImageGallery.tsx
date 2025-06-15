import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi
} from '@/components/ui/carousel';

interface VehicleImageGalleryProps {
  images?: string[];
}

const VehicleImageGallery = ({ images = [] }: VehicleImageGalleryProps) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  // Setup for the main carousel
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  // Sample images for demo (high quality car images)
  const sampleImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", 
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=2264&q=80",
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
  ];

  const displayImages = images.length > 0 ? images : sampleImages;

  const openCarousel = (index:any) => {
    console.log('Opening carousel with index:', index); // Debug log
    setCarouselIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  const nextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCarouselIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeCarousel();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  useEffect(() => {
    if (isCarouselOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCarouselOpen]);

  return (
    <div className="w-full mx-auto">
      {/* Mobile Carousel - Only visible on small screens */}
      <div className="lg:hidden bg-white overflow-hidden mb-3">
        <Carousel
          opts={{ loop: true }}
          className="relative w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {displayImages.map((image, index) => (
              <CarouselItem key={index}>
                <div 
                  className="relative aspect-[5/3] overflow-hidden cursor-pointer rounded-lg" 
                  onClick={() => openCarousel(index)}
                >
                  <Image
                    src={image}
                    width={1000}
                    height={600}
                    alt={`Vehicle view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {index === 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Great Price
                      </span>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute z-10 flex items-center justify-center gap-1 bottom-3 left-1/2 -translate-x-1/2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all", 
                  index === current ? "w-4 bg-white" : "w-2 bg-white/60"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
          
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10" />
        </Carousel>
      </div>
      
      {/* Desktop Grid - Only visible on large screens */}
      <div className="hidden lg:grid grid-cols-2 gap-3 mb-3">
        {/* Main Large Image */}
        <div 
          className="relative aspect-[5/3] overflow-hidden rounded-lg cursor-pointer row-span-2 col-span-1"
          onClick={() => openCarousel(0)}
        >
          <Image
            src={displayImages[0] || ''}
            width={1000}
            height={600}
            alt="Main vehicle view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Great Price
            </span>
          </div>
        </div>
        
        {/* Secondary Images - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {displayImages.slice(1, 5).map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[5/3] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openCarousel(index + 1)}
            >
              <Image
                src={image}
                width={500}
                height={300}
                alt={`Vehicle view ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Full-Screen Carousel Modal */}
      {isCarouselOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeCarousel}
            className="absolute top-4 right-4 z-10 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            {carouselIndex + 1} / {displayImages.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-10 p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors backdrop-blur-sm"
            disabled={displayImages.length <= 1}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 z-10 p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors backdrop-blur-sm"
            disabled={displayImages.length <= 1}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Main Carousel Image Container with Fixed Aspect Ratio */}
          <div className="relative w-full max-w-5xl mx-8">
            <div className="aspect-[5/3] relative rounded-lg overflow-hidden shadow-2xl bg-black/50">
              <Image
                src={displayImages[carouselIndex]}
                alt={`Vehicle view ${carouselIndex + 1}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIxMC40NTcgMTUwIDIxOS4xNTQgMTQxLjMwNCAyMTkuMTU0IDEzMEMyMTkuMTU0IDExOC42OTYgMjEwLjQ1NyAxMTAgMjAwIDExMEMxODkuNTQzIDExMCAxODAuODQ2IDExOC42OTYgMTgwLjg0NiAxMzBDMTgwLjg0NiAxNDEuMzA0IDE4OS41NDMgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOUI5QkE0Ii8+Cjwvc3ZnPgo=';
                }}
              />
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 bg-black bg-opacity-60 p-3 rounded-xl backdrop-blur-sm">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={cn(
                    "w-20 h-12 aspect-[5/3] rounded-lg overflow-hidden transition-all duration-200",
                    index === carouselIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-70 hover:opacity-90 hover:scale-105'
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEMzMy42NTY5IDI0IDM1IDIyLjY1NjkgMzUgMjFDMzUgMTkuMzQzMSAzMy42NTY5IDE4IDMyIDE4QzMwLjM0MzEgMTggMjkgMTkuMzQzMSAyOSAyMUMyOSAyMi42NTY5IDMwLjM0MzEgMjQgMzIgMjRaIiBmaWxsPSIjOUI5QkE0Ii8+Cjwvc3ZnPgo=';
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;