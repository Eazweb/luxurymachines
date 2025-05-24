 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Don't show navbar on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  // Determine if we're on the home page
  const isHomePage = pathname === '/';
  
  return (
    <>
      {/* The navbar itself */}
      <header 
        className={`py-4 text-white ${isHomePage ? 'absolute top-0 left-0 right-0 z-10 bg-transparent' : 'bg-[#0f172a]'}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo - hidden on mobile, visible on desktop */}
          <div className="flex-1 md:flex-none">
            <Link href="/" className="hidden md:block text-2xl font-bold text-white">
              Luxury Machines
            </Link>
            
            {/* Mobile Menu Button - only visible on mobile */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Action Buttons - only visible on desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/buycar" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Buy Car
            </Link>
            <Link 
              href="/rentcar" 
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Rent Car
            </Link>
            <a 
              href="tel:+919876543210" 
              className="flex items-center text-gray-300 hover:text-white"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Call Button - only visible on mobile */}
          <div className="md:hidden">
            <a 
              href="tel:+919876543210" 
              className="p-2 text-white rounded-full"
              aria-label="Call us"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  );
}
