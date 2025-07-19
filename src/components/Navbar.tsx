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

  // For non-home pages, use a static header with blueish background
  if (!isHomePage) {
    return (
      <>
        <header className="bg-[#0f172a] shadow-md sticky top-0 z-50">
          <div className="container w-[90%] mx-auto py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Luxury Machines Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden md:block text-xl font-semibold text-white whitespace-nowrap">
                LUXURY MACHINES
              </span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Mobile menu button - hidden on md and up */}
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
                  className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              
              {/* Desktop navigation - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/collection" 
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Collection
                </Link>
                <Link 
                  href="/contact-us" 
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Contact
                </Link>
                <a 
                  href={`tel:${phoneNumber}`}
                  className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
                >
                  Buy a Car
                </a>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Menu - for non-home pages */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
          phoneNumber={phoneNumber}
        />
      </>
    );
  }

  // Home page sticky navbar
  return (
    <>
      {/* The navbar itself */}
      <header 
        className={`fixed w-full z-50 bg-black shadow-lg py-3`}
      >
        <div className="container w-[90%] mx-auto flex items-center justify-between">
          {/* Logo - visible on all screens */}
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Luxury Machines Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
              <span className="hidden md:block text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
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
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <ScrollLink 
              to="services" 
              spy={true} 
              smooth={true} 
              offset={-100} 
              duration={500} 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              Services
            </ScrollLink>
            <ScrollLink 
              to="testimonials" 
              spy={true} 
              smooth={true} 
              offset={-100} 
              duration={500} 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              Testimonials
            </ScrollLink>
            <Link 
              href="/collection" 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Collection
            </Link>
            <Link 
              href="/contact-us" 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex flex-1 justify-end">
            <a 
              href={`tel:${phoneNumber}`}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
            >
              Buy a Car
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        phoneNumber={phoneNumber}
      />
    </>
  );
}
