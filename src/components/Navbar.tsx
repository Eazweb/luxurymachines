 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Don't show navbar on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  // We're removing the scroll effect as requested
  useEffect(() => {
    setIsScrolled(false);
  }, []);

  // Determine if we're on the home page
  const isHomePage = pathname === '/';
  
  return (
    <>
      {/* The navbar itself */}
      <header 
        className="bg-[#0f172a] py-4 text-white"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            BOXCARS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`font-medium ${
                pathname === '/' ? 'text-white underline' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`font-medium ${
                pathname === '/about' ? 'text-white underline' : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium ${
                pathname === '/contact' ? 'text-white underline' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
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
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-medium">+91 9876 543 210</span>
            </a>
          </div>

          {/* Mobile Menu and Call Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <a 
              href="tel:+919876543210" 
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <Phone className="h-5 w-5" />
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
