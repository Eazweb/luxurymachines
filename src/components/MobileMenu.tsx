'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  
  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-6">
          {/* Navigation Links */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className={`block text-lg ${pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block text-lg ${pathname === '/about' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`block text-lg ${pathname === '/contact' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            >
              Contact
            </Link>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t">
            <Link 
              href="/buycar" 
              className="block w-full py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
            >
              Buy Car
            </Link>
            <Link 
              href="/rentcar" 
              className="block w-full py-3 border border-blue-600 text-blue-600 text-center rounded-md hover:bg-blue-50 transition-colors"
            >
              Rent Car
            </Link>
            <a 
              href="tel:+919876543210" 
              className="flex items-center justify-center py-3 text-gray-700 hover:text-blue-600"
            >
              <span className="font-medium">Call: +91 9876 543 210</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}