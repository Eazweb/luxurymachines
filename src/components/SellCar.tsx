import Image from "next/image"
import { Phone, ArrowRight, Car, Clock, Repeat, Users } from "lucide-react"
import { phoneNumber } from "@/config"

export default function SellCar() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4 md:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
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
                  <h3 className="font-bold text-lg">5500+</h3>
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
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.206C13.416 27.168 14.684 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.336-.207-3.424-.613l-.244-.09-4.65 1.31 1.244-4.41-.158-.23C7.13 18.07 6.5 16.56 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.637-.807-1.89-.899-.254-.093-.439-.139-.625.139-.186.277-.719.899-.881 1.086-.162.186-.324.208-.6.07-.277-.139-1.17-.431-2.23-1.375-.824-.735-1.38-1.642-1.543-1.92-.162-.277-.017-.427.122-.565.126-.125.277-.324.416-.486.139-.162.185-.277.277-.462.093-.185.046-.347-.023-.486-.07-.139-.625-1.51-.857-2.07-.226-.544-.456-.47-.625-.479l-.53-.01c-.17 0-.446.064-.68.3-.232.232-.88.861-.88 2.099 0 1.238.902 2.434 1.028 2.602.126.162 1.775 2.713 4.3 3.697.602.207 1.07.33 1.436.423.603.153 1.153.132 1.588.08.484-.058 1.637-.668 1.87-1.312.232-.645.232-1.197.162-1.312-.07-.116-.254-.185-.53-.324z" />
                </svg>
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="w-12 h-12 border border-blue-600 text-blue-600 rounded-full flex items-center justify-center transition-colors hover:bg-blue-50 hover:text-blue-700"
                aria-label="Call"
              >
                <Phone className="w-6 h-6" />
              </a>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-colors hover:bg-blue-600 hover:text-white bg-transparent">
                KNOW MORE
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="hidden lg:block order-first lg:order-last">
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 lg:p-8">
                <Image
                  src="/car-promo.png"
                  alt="Luxury cars with GoExotic mobile app"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}