'use client';

import Image from 'next/image';

// Feature interface
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Features data
const features: Feature[] = [
  {
    id: '1',
    title: 'Special Financing Offers',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
    icon: '/images/icons/financing.svg'
  },
  {
    id: '2',
    title: 'Trusted Car Dealership',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
    icon: '/images/icons/trusted.svg'
  },
  {
    id: '3',
    title: 'Transparent Pricing',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
    icon: '/images/icons/pricing.svg'
  },
  {
    id: '4',
    title: 'Expert Car Service',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
    icon: '/images/icons/service.svg'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container w-[90%] max-w-[1500px] mx-auto">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-start">
              <div className="mb-4">
                <Image 
                  src={feature.icon} 
                  alt={feature.title} 
                  width={48} 
                  height={48}
                  className="text-blue-600"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
