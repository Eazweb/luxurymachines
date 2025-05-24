'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, X } from 'lucide-react';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Only close menu when clicking on links, not on route changes
  // This prevents the menu from flickering
  
  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Don't render anything if menu is closed
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div 
        ref={menuRef}
        className="bg-white w-[280px] h-full overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
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
              onClick={onClose}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block text-lg ${pathname === '/about' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
              onClick={onClose}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`block text-lg ${pathname === '/contact' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
              onClick={onClose}
            >
              Contact
            </Link>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t">
            <Link 
              href="/buycar" 
              className="block w-full py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
              onClick={onClose}
            >
              Buy Car
            </Link>
            <Link 
              href="/rentcar" 
              className="block w-full py-3 border border-blue-600 text-blue-600 text-center rounded-md hover:bg-blue-50 transition-colors"
              onClick={onClose}
            >
              Rent Car
            </Link>
            <a 
              href="tel:+919876543210" 
              className="flex items-center justify-center py-3 text-gray-700 hover:text-blue-600"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-medium">+91 9876 543 210</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}