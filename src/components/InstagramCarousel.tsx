'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569818cdd?q=80&w=1000',
    postUrl: 'https://www.instagram.com/p/C7nXyY1o9zJ/',
    alt: 'Luxury car showcase',
    caption: 'Check out this beauty we just added to our collection! 🚗✨ #LuxuryCars'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000',
    postUrl: 'https://www.instagram.com/p/C7nXyY1o9zJ/',
    alt: 'Car interior detail',
    caption: 'When luxury meets comfort. The perfect driving experience awaits. 🏁 #LuxuryInterior'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo 1503376780353-7e6692767b70?q=80&w=1000',
    postUrl: 'https://www.instagram.com/p/C7nXyY1o9zJ/',
    alt: 'Car front view',
    caption: 'Turn heads wherever you go with this stunning machine. 💫 #DreamCar'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000',
    postUrl: 'https://www.instagram.com/p/C7nXyY1o9zJ/',
    alt: 'Luxury coupe',
    caption: 'Pure elegance on wheels. Which one is your favorite? 👇 #CarLover'
  },
];

export default function InstagramCarousel() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Follow Us @luxurymachines
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out our latest updates and featured vehicles on Instagram
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {instagramPosts.map((post) => (
                <CarouselItem key={post.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                  <a 
                    href={post.postUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group relative aspect-square overflow-hidden rounded-lg shadow-lg"
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                        <Instagram className="w-6 h-6 text-pink-600" />
                      </div>
                    </div>
                    <img
                      src={post.imageUrl}
                      alt={post.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm line-clamp-2">{post.caption}</p>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
