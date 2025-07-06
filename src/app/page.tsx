import Image from "next/image";
import Link from "next/link";
import { getFeaturedVehicles } from "./actions/vehicle";
import Hero from "@/components/Hero";
import BrandsSection from "@/components/BrandsSection";
import FeaturedVehiclesCarousel from "@/components/FeaturedVehiclesCarousel";
import SellYourCar from "@/components/SellYourCar";
import WhyChooseUs from "@/components/WhyChooseUs";
import DualCTA from "@/components/DualCTA";
import InstagramCarousel from "@/components/InstagramCarousel";
import SellCar from "@/components/SellCar";
import StickyDetails from "@/components/StickyDetails";
export const revalidate = 30;

export default async function Home() {
  // Get featured vehicles
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <Hero />
        <div className="w-full hidden md:block bg-[#fafbfd] mt-[-5rem] pt-8 h-24 relative z-10 md:rounded-t-[5rem] "></div>
      </div>

      <BrandsSection />

      <SellCar />
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

      <StickyDetails />

      

      {/* <SellYourCar /> */}

      {/* <WhyChooseUs /> */}

      <DualCTA />
      
    </div>
  );
}
