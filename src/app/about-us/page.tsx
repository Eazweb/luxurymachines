import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Award } from 'lucide-react';

const brands = [
  { name: 'BMW', logo: '/images/brands/bmw.png' },
  { name: 'Mercedes-Benz', logo: '/images/brands/mercedes.png' },
  { name: 'Audi', logo: '/images/brands/bmw.png' },
  { name: 'Jaguar', logo: '/images/brands/mercedes.png' },
  { name: 'Land Rover', logo: '/images/brands/toyota.png' },
  { name: 'Porsche', logo: '/images/brands/volkswagen.png' },
];

const AboutUsPage = () => {
  return (
    <div className="bg-[#0f172a]">
      <div className='h-[40px] md:h-[80px] rounded-t-full bg-white w-full'></div>
      <div className="bg-white pb-16 md:pb-24">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">About Luxury Machines</h1>
          <p className="mt-2 text-base text-gray-600">Your trusted partner in premium pre-owned vehicles.</p>
        </div>

        {/* Main Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Left Column: Main Text */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <div className="text-gray-700 space-y-4 text-base leading-relaxed">
                <p>
                  <span className="font-semibold text-blue-700">Luxury Machines Chandigarh</span> is a trusted name in the luxury pre-owned car market, located at <span className="font-medium">541, Sector 82, Airport Road, Mohali (Chandigarh)</span>. Since our establishment, we've been committed to delivering a premium car buying and selling experience.
                </p>
                <p>
                  We offer a wide range of high-end vehicles from brands like BMW, Mercedes-Benz, Audi, Jaguar, Land Rover, and more. Each vehicle in our collection is carefully selected and thoroughly inspected to meet the highest standards of performance and quality.
                </p>
                <p>
                  We pride ourselves on professionalism, transparency, and customer satisfaction. Whether you're looking to upgrade your current vehicle or invest in your first luxury car, we provide a seamless, hassle-free process tailored to your needs. With a strong online presence and a growing community of satisfied clients, <span className="font-semibold text-blue-700">Luxury Machines Chandigarh</span> continues to set the standard for excellence in the luxury automotive space.
                </p>
              </div>
            </div>

            {/* Right Column: Why Choose Us */}
            <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-gray-900">Quality Guaranteed</h4>
                    <p className="text-sm text-gray-600">Every car is handpicked and undergoes a rigorous inspection process.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-gray-900">Transparent Process</h4>
                    <p className="text-sm text-gray-600">We believe in honest and fair dealings with no hidden costs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-gray-900">Customer Focused</h4>
                    <p className="text-sm text-gray-600">Our dedicated team is here to provide you with personalized service.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Brands We Specialize In</h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center p-4 rounded-lg transition-transform transform hover:scale-110">
                  <img src={brand.logo} alt={`${brand.name} logo`} className="h-10 md:h-12 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Find Your Dream Car?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm">
              Explore our curated collection of luxury vehicles or get in touch with our team for expert assistance.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/collection" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors text-sm">
                View Collection
              </Link>
              <Link href="/contact-us" className="bg-gray-800 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-900 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
