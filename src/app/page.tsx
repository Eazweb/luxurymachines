import Image from "next/image";
import Link from "next/link";
import { getFeaturedVehicles } from "./actions/vehicle";
import Hero from "@/components/Hero";
import BrandsSection from "@/components/BrandsSection";
import FeaturedVehiclesCarousel from "@/components/FeaturedVehiclesCarousel";
import SellYourCar from "@/components/SellYourCar";
import WhyChooseUs from "@/components/WhyChooseUs";

export default async function Home() {
  // Get featured vehicles
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Brands Section with rounded top */}
      <BrandsSection />

      {/* Featured Vehicles Section */}
      {featuredVehicles.length > 0 ? (
        <FeaturedVehiclesCarousel 
          vehicles={featuredVehicles.map((vehicle: any) => ({
            ...vehicle,
            isGreatPrice: Math.random() > 0.7 // Randomly assign 'Great Price' to some vehicles for demo
          }))}
        />
      ) : (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No featured vehicles available at the moment.</p>
          </div>
        </section>
      )}

      {/* Sell Your Car Section */}
      <SellYourCar />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

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
