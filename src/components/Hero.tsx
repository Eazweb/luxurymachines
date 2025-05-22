'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Hero() {
  const [selectedTab, setSelectedTab] = useState('all');

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ 
      backgroundImage: "url('/images/hero-bg.jpg')",
      minHeight: '600px'
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-white mb-4">Find cars for sale and for rent near you</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Find Your Perfect Car</h1>
          
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button 
              onClick={() => setSelectedTab('all')}
              className={`px-6 py-2 text-white font-medium ${
                selectedTab === 'all' ? 'border-b-2 border-white' : ''
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedTab('new')}
              className={`px-6 py-2 text-white font-medium ${
                selectedTab === 'new' ? 'border-b-2 border-white' : ''
              }`}
            >
              New
            </button>
            <button 
              onClick={() => setSelectedTab('used')}
              className={`px-6 py-2 text-white font-medium ${
                selectedTab === 'used' ? 'border-b-2 border-white' : ''
              }`}
            >
              Used
            </button>
          </div>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              <div className="p-4">
                <select className="w-full p-2 border-0 focus:ring-0 text-gray-700">
                  <option value="">Any Makes</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="p-4">
                <select className="w-full p-2 border-0 focus:ring-0 text-gray-700">
                  <option value="">Any Models</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="coupe">Coupe</option>
                </select>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-gray-700">Prices: All Prices</div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Cars
                </button>
              </div>
            </div>
          </div>
          
          {/* Car Types */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/cars?type=suv" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-full flex items-center">
              <span className="mr-2">🚙</span>
              SUV
            </Link>
            <Link href="/cars?type=sedan" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-full flex items-center">
              <span className="mr-2">🚗</span>
              Sedan
            </Link>
            <Link href="/cars?type=hatchback" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-full flex items-center">
              <span className="mr-2">🚗</span>
              Hatchback
            </Link>
            <Link href="/cars?type=coupe" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-full flex items-center">
              <span className="mr-2">🚗</span>
              Coupe
            </Link>
            <Link href="/cars?type=hybrid" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-full flex items-center">
              <span className="mr-2">🔋</span>
              Hybrid
            </Link>
          </div>
          
          <p className="text-white text-sm mt-4">Or Browse Featured Model</p>
        </div>
      </div>
    </div>
  );
}
