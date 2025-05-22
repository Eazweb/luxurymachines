import Image from "next/image";
import Link from "next/link";
import { getFeaturedVehicles } from "./actions/vehicle";
import Hero from "@/components/Hero";

export default async function Home() {
  // Get featured vehicles
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Vehicles Section */}
      <section id="featured" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our handpicked selection of premium vehicles that offer exceptional value,
            quality, and luxury
          </p>
        </div>

        {featuredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle:any) => (
              <Link
                href={`/collection/${vehicle.slug}`}
                key={vehicle.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56">
                  {vehicle.images.length > 0 ? (
            <Image
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-2">{vehicle.model}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{vehicle.price.toLocaleString()}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{vehicle.registeredYear}</span>
                      <span className="mx-1">•</span>
                      <span>{vehicle.fuelType}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No featured vehicles available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/collection"
            className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-md"
          >
            View All Vehicles
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best selection of pre-owned luxury vehicles with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All our vehicles undergo a comprehensive inspection to ensure quality and reliability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                We offer the best market prices on premium vehicles without compromising on quality.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Exceptional Support</h3>
              <p className="text-gray-600">
                Our team of experts is always ready to assist you in finding your perfect vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Browse our extensive collection of premium vehicles or contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/collection"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md"
            >
              Browse Collection
            </Link>
            <a
              href="mailto:info@luxurycars.com"
              className="bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 px-8 rounded-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
