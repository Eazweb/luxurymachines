'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Play, ArrowRight } from 'lucide-react';

export default function SellYourCar() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section with Play Button */}
          <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/images/sell-car-bg.jpg"
              alt="Sell your car"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg"
              aria-label="Play video"
            >
              <Play className="h-8 w-8 text-blue-600" />
            </button>
          </div>
          
          {/* Content Section */}
          <div className="bg-gray-100 p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get A Fair Price For Your Car Sell To Us Today
            </h2>
            
            <p className="text-gray-700 mb-8">
              We are committed to providing our customers with exceptional service, 
              competitive pricing, and a wide range of options.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-gray-700">
                  We are the UK's largest provider, with more patrols in more places
                </p>
              </div>
              
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-gray-700">
                  You get 24/7 roadside assistance
                </p>
              </div>
              
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-gray-700">
                  We fix 4 out of 5 cars at the roadside
                </p>
              </div>
            </div>
            
            <Link 
              href="/sell-your-car" 
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
