import React from 'react';
import { 
  Car, 
  Gauge, 
  Fuel, 
  Calendar, 
  Settings, 
  Truck, 
  User, 
  Users, 
  Palette, 
  Hash,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { phoneNumber } from '@/config';

const VehicleDetails = ({ vehicle }: { vehicle: any}) => {
  // Sample data for demo
  const sampleVehicle = {
    vehicleType: 'SUV',
    kilometers: 50,
    fuelType: 'Petrol',
    registeredYear: 2023,
    transmission: 'Automatic',
    driveType: 'All-Wheel Drive (AWD/4WD)',
    condition: 'New',
    engineSize: '4.5',
    doors: '4 Doors',  
    cylinder: '10',
    color: 'Black, Gold, White',
    vin: 'MCB123813',
    description: 'Quisque imperdiet dignissim enim dictum finibus. Sed consectetur convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit arcs, eget maximus',
    ...vehicle
  };

  const sampleDealer = {
    name: 'Luxury Machines',
    address: 'Mumbai, India',
    phone: phoneNumber,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  // Left column specs
  const leftColumnSpecs = [
    { icon: Car, label: 'Body', value: sampleVehicle.vehicleType },
    { icon: Gauge, label: 'Mileage', value: sampleVehicle.kilometers.toString() },
    { icon: Fuel, label: 'Fuel Type', value: sampleVehicle.fuelType },
    { icon: Calendar, label: 'Year', value: sampleVehicle.registeredYear.toString() },
    { icon: Settings, label: 'Transmission', value: sampleVehicle.transmission },
    { icon: Truck, label: 'Drive Type', value: sampleVehicle.driveType }
  ];

  // Right column specs
  const rightColumnSpecs = [
    { icon: User, label: 'Condition', value: sampleVehicle.condition },
    { icon: Settings, label: 'Engine Size', value: sampleVehicle.engineSize },
    { icon: Users, label: 'Door', value: sampleVehicle.doors },
    { icon: Settings, label: 'Cylinder', value: sampleVehicle.cylinder },
    { icon: Palette, label: 'Color', value: sampleVehicle.color },
    { icon: Hash, label: 'VIN', value: sampleVehicle.vin }
  ];

  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Car Overview and Description */}
        <div className="flex-1">
          {/* Car Overview Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-8">Car Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                {leftColumnSpecs.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="mr-4">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="w-32">
                        <p className="text-base text-gray-600">{item.label}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {rightColumnSpecs.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="mr-4">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="w-32">
                        <p className="text-base text-gray-600">{item.label}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description Section
          <div className="py-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Quisque imperdiet dignissim enim dictum finibus. Sed consectetur convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit arcs, eget maximus
            </p>
            <p className="text-gray-700 leading-relaxed">
              Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum metus blandit nisl at tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquiet. Ut rutrum risus et nunc pretium scelerisque.
            </p>
          </div> */}
        </div>

        {/* Right Side: Dealer Info */}
        <div className="lg:w-96 xl:w-[28rem] 2xl:w-[32rem] bg-white p-8 ">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={sampleDealer.image} 
                  alt={sampleDealer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{sampleDealer.name}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {sampleDealer.address}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=Luxury+Machines+Mumbai`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  Get Direction
                </a>
                <a 
                  href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Message Dealer
              </button>
              
              <a 
                href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=Hi%20Luxury%20Machines,%20I'm%20interested%20in%20this%20vehicle`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border-2 border-green-500 bg-white text-green-600 py-3 px-6 rounded-lg hover:bg-green-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              
            
            </div>
{/*             
            <div className="pt-4 mt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Verified Dealer
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400" />
                  4.8 (24 reviews)
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default VehicleDetails