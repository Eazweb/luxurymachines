import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';

export type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  model?: string;
  price: number;
  kilometers?: number;
  fuelType?: string;
  transmission?: string;
  images: string[];
  isForRent?: boolean;
  isGreatPrice?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  name,
  model,
  price,
  kilometers,
  fuelType,
  transmission,
  images = [],
  isGreatPrice = false
}) => {
  return (
    <div className="bg-white group rounded-lg border-[1px] border-gray-200 overflow-hidden hover:cursor-pointer hover:shadow-lg mx-1 h-full">
      {/* Image Container */}
      <Link href={`/collection/${slug}`}>
        <div className="relative h-56 md:h-64">
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          
          {/* Great Price Tag */}
          {isGreatPrice && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Great Price
            </div>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="py-4 px-6">
        <Link href={`/collection/${slug}`}>
          <h3 className="text-xl group-hover:underline line-clamp-1 pb-1">{name}</h3>
        </Link>
        <p className="text-sm mb-3 line-clamp-1">
          {model} • {fuelType || 'Petrol'} • {transmission || 'Automatic'}
        </p>

        <hr className="my-2" />
        
        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center">
            <div className="py-2">
              <Image src="/images/icons/miles.png" alt="Mileage" width={20} height={20} />
            </div>
            <span className="text-sm">{kilometers || 0} kms</span>
          </div>
          
          <div className="flex flex-col items-center"> 
            <div className="py-2">
              <Image src="/images/icons/fuel.png" alt="Fuel" width={20} height={20} />
            </div>
            <span className="text-sm">{fuelType || 'Petrol'}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="py-2">
              <Image src="/images/icons/transmission.png" alt="Gear" width={20} height={20} />
            </div>
            <span className="text-sm">{transmission || 'Automatic'}</span>
          </div>
        </div>

        <hr className="my-2" />
        
        {/* Price and Details Link */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-semibold">{formatPrice(price)}</span>
          <Link 
            href={`/collection/${slug}`}
            className="text-blue-600 flex items-center text-sm"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-3 w-3">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
