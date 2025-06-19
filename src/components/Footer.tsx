import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { phoneNumber } from '@/config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Luxury Machines</h2>
            <p className="text-gray-400">
              Your premier destination for luxury cars. We offer a curated selection of the finest vehicles to suit your lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/collection" className="hover:text-blue-400 transition-colors">Collection</Link></li>
              <li><Link href="/about-us" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">541, Sector 82, JLPL Industrial Area, Mohali</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">luxurymachines82@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">{phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400 transition-colors"><Facebook /></Link>
              <Link href="#" className="hover:text-blue-400 transition-colors"><Twitter /></Link>
              <Link href="#" className="hover:text-blue-400 transition-colors"><Instagram /></Link>
              <Link href="#" className="hover:text-blue-400 transition-colors"><Linkedin /></Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Luxury Machines. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
