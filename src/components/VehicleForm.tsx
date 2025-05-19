'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createVehicle, updateVehicle } from '@/app/actions/vehicle';
import ImageUpload from './ImageUpload';

// Types
type VehicleFormData = {
  name: string;
  price: string;
  model: string;
  company: string;
  fuelType: string;
  registeredYear: string;
  kilometers: string;
  registeredState: string;
  vehicleType: string;
  ownership: string;
  torque: string;
  power: string;
  door: string;
  drive: string;
  exteriorColor: string;
  manufacturingYear: string;
  seatingCapacity: string;
  entertainment: string;
  airbags: string;
  groundClearance: string;
  featured: boolean;
};

type VehicleFormProps = {
  initialData?: any;
  isEditing?: boolean;
};

const defaultFormData: VehicleFormData = {
  name: '',
  price: '',
  model: '',
  company: '',
  fuelType: '',
  registeredYear: '',
  kilometers: '',
  registeredState: '',
  vehicleType: '',
  ownership: '',
  torque: '',
  power: '',
  door: '',
  drive: '',
  exteriorColor: '',
  manufacturingYear: '',
  seatingCapacity: '',
  entertainment: '',
  airbags: '',
  groundClearance: '',
  featured: false,
};

// Fuel type options
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'];

// Vehicle type options
const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'MUV', 'Luxury', 'Convertible', 'Coupe', 'Wagon', 'Van', 'Jeep'];

// Ownership options
const ownershipOptions = ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner or more'];

// Drive options
const driveOptions = ['FWD', 'RWD', 'AWD', '4WD'];

export default function VehicleForm({ initialData, isEditing = false }: VehicleFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<VehicleFormData>(
    initialData 
      ? {
          ...initialData,
          price: initialData.price.toString(),
          registeredYear: initialData.registeredYear.toString(),
          kilometers: initialData.kilometers.toString(),
          door: initialData.door?.toString() || '',
          manufacturingYear: initialData.manufacturingYear?.toString() || '',
          seatingCapacity: initialData.seatingCapacity?.toString() || '',
          airbags: initialData.airbags?.toString() || '',
        }
      : defaultFormData
  );
  
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate images
      if (images.length === 0) {
        setError('Please upload at least one image');
        setIsLoading(false);
        return;
      }
      
      // Convert form data to the right types
      const vehicleData = {
        name: formData.name,
        price: parseFloat(formData.price),
        model: formData.model,
        company: formData.company,
        fuelType: formData.fuelType,
        registeredYear: parseInt(formData.registeredYear),
        kilometers: parseInt(formData.kilometers),
        registeredState: formData.registeredState,
        vehicleType: formData.vehicleType,
        ownership: formData.ownership,
        torque: formData.torque || undefined,
        power: formData.power || undefined,
        door: formData.door ? parseInt(formData.door) : undefined,
        drive: formData.drive || undefined,
        exteriorColor: formData.exteriorColor || undefined,
        manufacturingYear: formData.manufacturingYear 
          ? parseInt(formData.manufacturingYear) 
          : undefined,
        seatingCapacity: formData.seatingCapacity 
          ? parseInt(formData.seatingCapacity) 
          : undefined,
        entertainment: formData.entertainment || undefined,
        airbags: formData.airbags ? parseInt(formData.airbags) : undefined,
        groundClearance: formData.groundClearance || undefined,
        featured: formData.featured,
      };
      
      let result;
      
      if (isEditing) {
        result = await updateVehicle(initialData.id, vehicleData, images);
      } else {
        result = await createVehicle(vehicleData, images);
      }
      
      if (result.success) {
        router.push('/admin/vehicles');
        router.refresh();
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      {/* Images */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Vehicle Images</h2>
        <ImageUpload 
          value={images} 
          onChange={(value) => setImages(value)} 
        />
      </div>
      
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Vehicle Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model*
            </label>
            <input
              id="model"
              name="model"
              type="text"
              required
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company*
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (₹)*
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
              Fuel Type*
            </label>
            <select
              id="fuelType"
              name="fuelType"
              required
              value={formData.fuelType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Fuel Type</option>
              {fuelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
              Vehicle Type*
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              required
              value={formData.vehicleType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Registration Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Registration Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="registeredYear" className="block text-sm font-medium text-gray-700">
              Registered Year*
            </label>
            <input
              id="registeredYear"
              name="registeredYear"
              type="number"
              required
              value={formData.registeredYear}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="registeredState" className="block text-sm font-medium text-gray-700">
              Registered State*
            </label>
            <input
              id="registeredState"
              name="registeredState"
              type="text"
              required
              value={formData.registeredState}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="kilometers" className="block text-sm font-medium text-gray-700">
              Kilometers Driven*
            </label>
            <input
              id="kilometers"
              name="kilometers"
              type="number"
              required
              value={formData.kilometers}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="ownership" className="block text-sm font-medium text-gray-700">
              Ownership*
            </label>
            <select
              id="ownership"
              name="ownership"
              required
              value={formData.ownership}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Ownership</option>
              {ownershipOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Technical Specifications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="power" className="block text-sm font-medium text-gray-700">
              Power
            </label>
            <input
              id="power"
              name="power"
              type="text"
              value={formData.power}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="e.g. 120 HP"
            />
          </div>
          
          <div>
            <label htmlFor="torque" className="block text-sm font-medium text-gray-700">
              Torque
            </label>
            <input
              id="torque"
              name="torque"
              type="text"
              value={formData.torque}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="e.g. 170 Nm"
            />
          </div>
          
          <div>
            <label htmlFor="drive" className="block text-sm font-medium text-gray-700">
              Drive Type
            </label>
            <select
              id="drive"
              name="drive"
              value={formData.drive}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Drive Type</option>
              {driveOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="manufacturingYear" className="block text-sm font-medium text-gray-700">
              Manufacturing Year
            </label>
            <input
              id="manufacturingYear"
              name="manufacturingYear"
              type="number"
              value={formData.manufacturingYear}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="door" className="block text-sm font-medium text-gray-700">
              Number of Doors
            </label>
            <input
              id="door"
              name="door"
              type="number"
              value={formData.door}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="groundClearance" className="block text-sm font-medium text-gray-700">
              Ground Clearance
            </label>
            <input
              id="groundClearance"
              name="groundClearance"
              type="text"
              value={formData.groundClearance}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="e.g. 170 mm"
            />
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="exteriorColor" className="block text-sm font-medium text-gray-700">
              Exterior Color
            </label>
            <input
              id="exteriorColor"
              name="exteriorColor"
              type="text"
              value={formData.exteriorColor}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700">
              Seating Capacity
            </label>
            <input
              id="seatingCapacity"
              name="seatingCapacity"
              type="number"
              value={formData.seatingCapacity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="entertainment" className="block text-sm font-medium text-gray-700">
              Entertainment System
            </label>
            <input
              id="entertainment"
              name="entertainment"
              type="text"
              value={formData.entertainment}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="e.g. 7-inch touchscreen"
            />
          </div>
          
          <div>
            <label htmlFor="airbags" className="block text-sm font-medium text-gray-700">
              Number of Airbags
            </label>
            <input
              id="airbags"
              name="airbags"
              type="number"
              value={formData.airbags}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => 
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured Vehicle (will be displayed prominently on the homepage)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading
            ? 'Saving...'
            : isEditing
            ? 'Update Vehicle'
            : 'Create Vehicle'}
        </button>
      </div>
    </form>
  );
} 