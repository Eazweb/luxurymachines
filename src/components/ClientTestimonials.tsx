'use client';

import * as React from 'react';
import Image from 'next/image';

const luxuryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000',
    alt: 'Luxury sports car',
    title: 'Exotic Sports Car'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
    alt: 'Luxury sedan',
    title: 'Elegant Sedan'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1000',
    alt: 'Classic luxury car',
    title: 'Vintage Classic'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000',
    alt: 'Luxury SUV',
    title: 'Premium SUV'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000',
    alt: 'Sports car interior',
    title: 'Luxury Interior'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1000',
    alt: 'Convertible sports car',
    title: 'Convertible'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000',
    alt: 'Luxury coupe',
    title: 'Sport Coupe'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo 1503376780353-7e6692767b70?q=80&w=1000',
    alt: 'Luxury car front view',
    title: 'Front View'
  }
];

export default function ClientGallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Luxury Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the finest selection of luxury vehicles in our exclusive gallery
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {luxuryImages.map((image) => (
            <div key={image.id} className="group relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white text-lg font-medium">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
