'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { X } from 'lucide-react';
import Image from 'next/image';

// Types
type Vehicle = {
  id: string;
  slug: string;
  name: string;
  price: number;
  model: string;
  company: string;
  fuelType: string;
  registeredYear: number;
  kilometers: number;
  registeredState: string;
  vehicleType: string;
  ownership: string;
  images: string[];
  description?: string;
  features?: string[];
  featured: boolean;
};

export default function EditVehiclePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: '',
    price: 0,
    model: '',
    company: '',
    fuelType: '',
    registeredYear: new Date().getFullYear(),
    kilometers: 0,
    registeredState: '',
    vehicleType: '',
    ownership: '',
    images: [],
    description: '',
    features: [],
    featured: false,
  });

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/vehicles/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle');
        }
        
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('Failed to load vehicle details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'price' || name === 'kilometers' || name === 'registeredYear') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle features input
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const featuresText = e.target.value;
    const featuresArray = featuresText
      .split('\n')
      .map(feature => feature.trim())
      .filter(feature => feature !== '');
    
    setFormData({ ...formData, features: featuresArray });
  };

  // Handle image upload
  const handleImageUpload = (result: any) => {
    const newImage = result.info.secure_url;
    setFormData({
      ...formData,
      images: [...(formData.images || []), newImage]
    });
  };

  // Remove image
  const removeImage = (index: number) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      
      const response = await fetch(`/api/admin/vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update vehicle');
      }
      
      setSuccess('Vehicle updated successfully!');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/vehicles');
      }, 2000);
      
    } catch (err: any) {
      console.error('Error updating vehicle:', err);
      setError(err.message || 'Failed to update vehicle. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Vehicle</h1>
        <button
          onClick={() => router.push('/admin/vehicles')}
          className="px-4 py-2 bg-[#e5e7eb] text-[#1f2937] rounded-md hover:bg-[#d1d5db]"
        >
          Cancel
        </button>
      </div>
      
      {error && (
        <div className="bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] px-4 py-3 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-[#ffffff] rounded-lg shadow p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#374151] mb-1">
                Vehicle Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-[#374151] mb-1">
                Model*
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#374151] mb-1">
                Company/Brand*
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[#374151] mb-1">
                Price (₹)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Vehicle Details */}
        <div>
          <h2 className="text-lg font-medium mb-4">Vehicle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-[#374151] mb-1">
                Fuel Type*
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="registeredYear" className="block text-sm font-medium text-[#374151] mb-1">
                Registered Year*
              </label>
              <input
                type="number"
                id="registeredYear"
                name="registeredYear"
                value={formData.registeredYear || ''}
                onChange={handleChange}
                required
                min="1990"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="kilometers" className="block text-sm font-medium text-[#374151] mb-1">
                Kilometers*
              </label>
              <input
                type="number"
                id="kilometers"
                name="kilometers"
                value={formData.kilometers || ''}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="registeredState" className="block text-sm font-medium text-[#374151] mb-1">
                Registered State*
              </label>
              <input
                type="text"
                id="registeredState"
                name="registeredState"
                value={formData.registeredState || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-[#374151] mb-1">
                Vehicle Type*
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Vehicle Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Pickup">Pickup</option>
                <option value="Minivan">Minivan</option>
                <option value="Sports Car">Sports Car</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="ownership" className="block text-sm font-medium text-[#374151] mb-1">
                Ownership*
              </label>
              <select
                id="ownership"
                name="ownership"
                value={formData.ownership || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Ownership</option>
                <option value="1st Owner">1st Owner</option>
                <option value="2nd Owner">2nd Owner</option>
                <option value="3rd Owner">3rd Owner</option>
                <option value="4th Owner or more">4th Owner or more</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div>
          <h2 className="text-lg font-medium mb-4">Description & Features</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#374151] mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-[#374151] mb-1">
                Features (One per line)
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features?.join('\n') || ''}
                onChange={handleFeaturesChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter features, one per line"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Images */}
        <div>
          <h2 className="text-lg font-medium mb-4">Images</h2>
          
          <div className="mb-4">
            <CldUploadWidget
              uploadPreset="luxury_cars"
              onSuccess={handleImageUpload}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>
          </div>
          
          {formData.images && formData.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-40 rounded-md overflow-hidden">
                    <Image
                      src={image}
                      alt={`Vehicle image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-[#fef2f2]0 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#6b7280]">No images uploaded yet.</p>
          )}
        </div>
        
        {/* Featured */}
        <div>
          <h2 className="text-lg font-medium mb-4">Visibility</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-[#374151]">
              Feature this vehicle (will be displayed prominently)
            </label>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              submitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Updating...' : 'Update Vehicle'}
          </button>
        </div>
      </form>
    </div>
  );
}