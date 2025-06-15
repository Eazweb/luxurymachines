'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DualCTA() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container w-[90%] max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Buy a Car Card */}
          <div className="bg-[#f0f7ff] rounded-2xl p-6 md:p-10 xl:p-16 flex flex-col md:flex-row space-y-10 items-center relative overflow-hidden">
            <div className="z-10 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Are You Looking<br />For a Car?</h3>
              <p className="text-sm md:text-base my-6">
                We are committed to providing our customers with<br className="hidden md:block" /> exceptional service.
              </p>
              <Link 
                href="/collection" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition-colors"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="md:absolute md:right-4 md:bottom-0">
              <Image 
                src="/images/sellcar.png" 
                alt="Car icon" 
                width={120} 
                height={120}
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>

          {/* Sell a Car Card */}
          <div className="bg-[#fff0f7] rounded-2xl p-6 md:p-10 xl:p-16 flex flex-col md:flex-row space-y-10 items-center relative overflow-hidden">
            <div className="z-10 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Do You Want to<br />Sell a Car?</h3>
              <p className="text-sm md:text-base my-6">
                We are committed to providing our customers with<br className="hidden md:block" /> exceptional service.
              </p>
              <Link 
                href="/sell-your-car" 
                className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-md transition-colors"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="  md:absolute md:right-4 md:bottom-0">
              <Image 
                src="/images/sell-car.png" 
                alt="Car with money icon" 
                width={120} 
                height={120}
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
