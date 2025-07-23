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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // Don't show navbar on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logic for showing/hiding the navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }

      // Logic for background color on the home page
      if (isHomePage) {
        setScrolled(currentScrollY > 25);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isHomePage]);

  // Always show navbar when pathname changes
  useEffect(() => {
    setVisible(true);
  }, [pathname]);

  return (
    <>
      {/* The navbar */}
      <header 
        className={`${ isHomePage ? 'fixed' : 'sticky top-0' } w-full z-50 transition-all duration-500 ${
          isHomePage && (visible ? 'translate-y-0' : '-translate-y-full')
        } ${
          isHomePage && !scrolled ? 'bg-transparent' : 'bg-[#0f172a]'
        }`}
      >
        <div className="container w-[90%] mx-auto py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
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
            {/* Mobile menu button */}
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
            
            {/* Desktop navigation */}
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
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        phoneNumber={phoneNumber}
      />
    </>
  );
}
