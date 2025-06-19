import React from 'react';
import Link from 'next/link';
import { Car, ShieldCheck, Search, Wrench, Users } from 'lucide-react'; // Example icons

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    icon: Car,
    title: 'Top Quality Cars',
    description: 'We offer a curated selection of the finest luxury vehicles, ensuring top-tier quality and performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Collection',
    description: 'Explore our exclusive collection of premium cars from the world\'s most prestigious brands.',
  },
  {
    icon: Search,
    title: 'Sell Your Car in One Talk',
    description: 'Experience a hassle-free process to sell your car with a fair and transparent valuation.',
  },
  {
    icon: Wrench,
    title: 'Vehicles with Insurance',
    description: 'Drive with peace of mind knowing all our vehicles come with comprehensive insurance options.',
  },
  {
    icon: Users,
    title: '5000+ Satisfied Customers',
    description: 'Join our community of over 5,000 happy customers who trust us for their luxury car needs.',
  }
];

const StickyServicesSection: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left Sticky Column */}
          <div className="lg:w-1/2 lg:sticky lg:top-20 self-start mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Top car dealership in Tricity
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              We are a premium car dealership in Mohali, offering a wide range of luxury vehicles and services to meet your needs.
            </p>
            <Link href="/contact-us" legacyBehavior>
              <a className="mt-8 inline-block bg-transparent border border-slate-800 text-slate-800 font-semibold py-3 px-8 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-300">
                Contact Us
              </a>
            </Link>
          </div>

          {/* Right Scrollable Column */}
          <div className="lg:w-1/2">
            <div className="space-y-16">
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="bg-white rounded-xl p-4 shadow-md w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-slate-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyServicesSection;