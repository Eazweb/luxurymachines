 'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { phoneNumber } from '@/config';

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
        className={`py-4  mx-auto text-white ${isHomePage ? 'absolute top-0 left-0 right-0 z-10 bg-transparent' : 'bg-[#0f172a]'}`}
      >
        <div className="container w-[90%] mx-auto flex items-center justify-between">
          {/* Logo - visible on all screens */}
          <div className="flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-lg md:text-2xl font-bold text-white">
                LUXURY MACHINES
              </span>
            </Link>
          </div>
          
          {/* Mobile Buttons - only visible on mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <a 
              href={`tel:${phoneNumber}`}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Call"
            >
              <Phone className="h-6 w-6" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Action Buttons - only visible on desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href={`tel:${phoneNumber}`}
              className="px-6 py-2.5 text-white hover:bg-white/10 rounded-md transition-colors flex items-center"
            >
              <span className="font-medium">{phoneNumber}</span>
              <span className="ml-2">Buy Car</span>
            </a>

            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={800}
              offset={-80}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              Clients
            </ScrollLink>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Contact
            </Link>
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
