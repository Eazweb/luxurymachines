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
  
  // State for sticky navbar (only used on home page)
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollingDown, setScrollingDown] = useState(false);

  // Handle scroll behavior only on home page
  useEffect(() => {
    if (!isHomePage) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at the top of the page
      if (currentScrollY <= 100) {
        setShowNavbar(true);
        setIsScrolled(false);
        setLastScrollY(currentScrollY);
        return;
      }

      // Check scroll direction
      const isScrollingDown = currentScrollY > lastScrollY;
      
      // Update scroll direction state
      if (isScrollingDown !== scrollingDown) {
        setScrollingDown(isScrollingDown);
      }
      
      // Show/hide navbar based on scroll direction
      if (isScrollingDown && showNavbar) {
        // Hide navbar when scrolling down
        setShowNavbar(false);
      } else if (!isScrollingDown && !showNavbar) {
        // Show navbar when scrolling up
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 100);
    };

    // Throttle scroll events for better performance
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, scrollingDown, showNavbar, isHomePage]);

  // For non-home pages, use a simple static header with transparent background
  if (!isHomePage) {
    return (
      <header className="py-3">
        <div className="container w-[90%] mx-auto flex items-center justify-between">
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
            <span className="hidden md:block text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
              LUXURY MACHINES
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href={`tel:${phoneNumber}`}
              className="px-6 py-2.5 text-gray-900 hover:bg-black/5 rounded-md transition-colors flex items-center"
            >
              <span className="font-medium">{phoneNumber}</span>
              <span className="ml-2">Buy Car</span>
            </a>
            <Link 
              href="/collection" 
              className="px-4 py-2 text-gray-900 hover:bg-black/5 rounded-md transition-colors"
            >
              Collection
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-gray-900 hover:bg-black/5 rounded-md transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Home page sticky navbar
  return (
    <>
      {/* The navbar itself */}
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled ? 'bg-black/95 py-3 shadow-lg backdrop-blur-sm' : 'py-4 bg-transparent'
        }`}
        style={{
          transitionProperty: 'transform, opacity, background-color, padding',
          willChange: 'transform, opacity, background-color, padding'
        }}
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
