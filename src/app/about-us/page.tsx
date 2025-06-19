import React from 'react'

const brands = [
  { name: 'BMW', logo: '/brands/bmw.png' },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes.png' },
  { name: 'Audi', logo: '/brands/audi.png' },
  { name: 'Jaguar', logo: '/brands/jaguar.png' },
  { name: 'Land Rover', logo: '/brands/landrover.png' },
  // Add more brand logos as needed
]

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-10 px-2 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-12 mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 text-center">About Luxury Machines Chandigarh</h1>
        <p className="text-center text-gray-600 text-base md:text-lg mb-6">541, Sector 82, Airport Road, Mohali (Chandigarh)</p>
        <div className="text-gray-800 space-y-5 text-base md:text-lg">
          <p>
            <span className="font-semibold text-blue-700">Luxury Machines Chandigarh</span> is a trusted name in the luxury pre-owned car market, located at <span className="font-medium">541, Sector 82, Airport Road, Mohali (Chandigarh)</span>. Since our establishment, we've been committed to delivering a premium car buying and selling experience, offering a wide range of high-end vehicles from brands like BMW, Mercedes-Benz, Audi, Jaguar, Land Rover, and more. Each vehicle in our collection is carefully selected and thoroughly inspected to meet the highest standards of performance and quality.
          </p>
          <p>
            We pride ourselves on professionalism, transparency, and customer satisfaction. Whether you're looking to upgrade your current vehicle or invest in your first luxury car, we provide a seamless, hassle-free process tailored to your needs. With a strong online presence and a growing community of satisfied clients, <span className="font-semibold text-blue-700">Luxury Machines Chandigarh</span> continues to set the standard for excellence in the luxury automotive space.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">Brands We Offer</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {brands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center w-24">
                <div className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center mb-2 overflow-hidden">
                  <img src={brand.logo} alt={brand.name} className="object-contain w-12 h-12" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
