'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  
  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname, onClose, isOpen]);
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-[280px] sm:max-w-[280px]">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-xl">Menu</SheetTitle>
        </SheetHeader>
        
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
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-medium">+91 9876 543 210</span>
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}