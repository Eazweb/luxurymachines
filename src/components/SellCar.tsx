import Image from "next/image"
import { Phone, ArrowRight, Car, Clock, Repeat, Users, Link } from "lucide-react"
import { phoneNumber } from "@/config"

export default function SellCar() {
  return (
    <div className="bg-white text-black">
      <div className="container container w-[90%] max-w-[1500px] mx-auto  py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8 max-w-2xl">
            {/* Header */}
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-wider uppercase text-gray-600">Planning to sell?</p>
              <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                SELL US YOUR <span className="text-blue-600">LEGACY IN MINUTES</span> !
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed max-w-lg">
              Selling a luxury car isn't just about parting ways with a vehicle; it's about ensuring that its legacy
              continues to be appreciated. Your luxury car shall be meticulously cared for, cherished and handed over to
              someone who values craftsmanship, style, and driving excellence.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">100% Secured</h3>
                  <p className="text-gray-600 text-sm">Payment</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Best Offer</h3>
                  <p className="text-gray-600 text-sm">in Minutes</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Same Day</h3>
                  <p className="text-gray-600 text-sm">Transactions</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">5000+</h3>
                  <p className="text-gray-600 text-sm">Satisfied</p>
                  <p className="text-gray-600 text-sm">Customers</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={`https://wa.me/${phoneNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-blue-600 text-blue-600 rounded-full flex items-center justify-center transition-colors hover:bg-blue-50 hover:text-blue-700"
                aria-label="WhatsApp"
              >
                <Image
                  src="/whatsapp-icon.svg"
                  alt="WhatsApp"
                  width={30}
                  height={30}
                />
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="w-12 h-12 border border-blue-600 text-blue-600 rounded-full flex items-center justify-center transition-colors hover:bg-blue-50 hover:text-blue-700"
                aria-label="Call"
              >
                <Phone className="w-6 h-6" />
              </a>
             
              
            </div>
          </div>
          <div className="relative hidden md:block w-full max-w-[500px] h-0 pb-[80%] lg:pb-0 lg:h-[500px] lg:w-[625px] flex-shrink-0">
             <Image
              src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80"
              alt="Green Ford Mustang coupe in Toronto by Steven Binotto on Unsplash"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}