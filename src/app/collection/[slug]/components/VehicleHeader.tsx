import React from 'react';
import { Calendar, Gauge, Settings, Fuel, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';

const VehicleHeader = ({ vehicle }: { vehicle: any }) => {
  return (
    <div className="bg-white ">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-6 text-sm md:text-md">
        <span className="text-blue-600">Home</span>
        <span className="text-gray-400">/</span>
        <Link href="/collection" className="text-blue-600">Collection</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600"> {vehicle.name} – {vehicle.registeredYear}</span>
      </div>

      {/* Header with Share/Save/Compare */}
      <div className="flex justify-between items-start ">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            {vehicle.name}
          </h1>
          <p className="text-md text-gray-600">
            {vehicle.model} {vehicle.vehicleType} {vehicle.fuelType}
          </p>
        </div>
        
        <div className="flex items-center space-x-6 ml-8 hidden md:flex">
           <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
           <Phone className="w-5 h-5 mr-2" />
                        Call Us
                      </button>
          
                      {/* Chat Via WhatsApp Button */}
                      <button className="w-full border border-green-500 bg-white text-green-600 py-3 px-6 rounded-lg hover:bg-green-50 transition-colors font-medium flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 mr-2" />
                         Whatsapp
                      </button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:justify-between items-end mb-4'>
        <div className="overflow-x-auto mt-2 md:mt-0 pb-2 md:pb-0 md:max-w-[65%]" style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex items-end gap-4 md:flex-wrap nowrap" style={{ minWidth: 'max-content' }}>
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">{vehicle.registeredYear}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <Gauge className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 ">{vehicle.kilometers?.toLocaleString('en-IN')} km</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <Settings className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 ">{vehicle.transmission}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <Fuel className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 ">{vehicle.fuelType}</span>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right flex flex-row justify-between md:block mt-4 md:mt-0 w-full md:w-auto">
          <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {formatPrice(vehicle.price)}
          </div>
          <button className="flex  items-center text-blue-600 font-medium hover:text-blue-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Make An Offer Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleHeader;