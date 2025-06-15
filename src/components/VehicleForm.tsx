'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createVehicle, updateVehicle } from '@/app/actions/vehicle';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Loader2, X, ImagePlus } from 'lucide-react';
import { fuelTypes, vehicleTypes, ownershipOptions, driveOptions, companyOptions, transmissionOptions } from '@/lib/vehicleOptions';

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
  power: string;
  drive: string;
  transmission: string;
  exteriorColor: string;
  manufacturingYear: string;
  seatingCapacity: string;
  airbags: string;
  features: string;
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
  power: '',
  drive: '',
  transmission: 'Manual', // Default to Manual
  exteriorColor: '',
  manufacturingYear: '',
  seatingCapacity: '',
  airbags: '',
  features: '',
  featured: false,
};

// Vehicle options are imported from @/lib/vehicleOptions

export default function VehicleForm({ initialData, isEditing = false }: VehicleFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<VehicleFormData>(
    initialData 
      ? {
          ...initialData,
          price: initialData.price.toString(),
          registeredYear: initialData.registeredYear.toString(),
          kilometers: initialData.kilometers.toString(),
          manufacturingYear: initialData.manufacturingYear?.toString() || '',
          seatingCapacity: initialData.seatingCapacity?.toString() || '',
          airbags: initialData.airbags?.toString() || '',
          features: initialData.features?.join(', ') || '',
        }
      : defaultFormData
  );
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialData?.images || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviewUrls = [...previewUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newFiles.splice(index - (previewUrls.length - selectedFiles.length), 1);
    newPreviewUrls.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
  };
  
  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (!files.length) return [];
    
    const uploadedUrls: string[] = [];
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'luxury_cars';
    
    if (!cloudName) {
      throw new Error('Cloudinary cloud name is not configured');
    }
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      
      const data = await response.json();
      let url = data.secure_url;
      // Add optimization parameters
      url = url.replace('/upload/', '/upload/f_auto,q_auto/');
      uploadedUrls.push(url);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Validate images
    if (previewUrls.length === 0) {
      setError('Please upload at least one image');
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Upload new images first
      let imageUrls = [...previewUrls];
      
      if (selectedFiles.length > 0) {
        const uploadedUrls = await uploadImages(selectedFiles);
        // Combine existing URLs with newly uploaded ones
        imageUrls = [...previewUrls.filter(url => !url.startsWith('blob:')), ...uploadedUrls];
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
        power: formData.power || undefined,
        drive: formData.drive || undefined,
        transmission: formData.transmission,
        exteriorColor: formData.exteriorColor || undefined,
        manufacturingYear: formData.manufacturingYear 
          ? parseInt(formData.manufacturingYear) 
          : undefined,
        seatingCapacity: formData.seatingCapacity 
          ? parseInt(formData.seatingCapacity) 
          : undefined,
        airbags: formData.airbags ? parseInt(formData.airbags) : undefined,
        features: formData.features 
          ? formData.features.split(',').map(feature => feature.trim()).filter(Boolean)
          : [],
        featured: formData.featured,
      };
      
      setIsUploading(false);
      setIsLoading(true);
      
      let result;
      
      if (isEditing) {
        result = await updateVehicle(initialData.id, vehicleData, imageUrls);
      } else {
        result = await createVehicle(vehicleData, imageUrls);
      }
      
      if (result.success) {
        toast.success(`Vehicle ${isEditing ? 'updated' : 'created'} successfully`);
        router.push('/admin/vehicles');
        router.refresh();
      } else {
        setError(result.error || 'Something went wrong');
        toast.error(result.error || 'Failed to save vehicle');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 text-[#b91c1c] bg-[#fee2e2] rounded-md">
          {error}
        </div>
      )}
      
      {/* Images */}
      <div className="bg-[#ffffff] p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-[#111827] mb-4">Vehicle Images</h2>
        
        {/* File input */}
        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
            disabled={isUploading || isLoading}
          >
            <ImagePlus className="h-4 w-4" />
            Add Images
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload images of the vehicle. You can select multiple images at once.
          </p>
        </div>
        
        {/* Image previews */}
        {previewUrls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Selected Images ({previewUrls.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isUploading || isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Basic Information */}
      <div className="bg-[#ffffff] p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-[#111827] mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#374151]">
              Vehicle Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="features" className="block text-sm font-medium text-[#374151]">
              Features (comma separated)
            </label>
            <input
              id="features"
              name="features"
              type="text"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g., Sunroof, Leather Seats, Navigation"
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-[#374151]">
              Model*
            </label>
            <input
              id="model"
              name="model"
              type="text"
              required
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[#374151]">
              Company*
            </label>
            <select
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Company</option>
              {companyOptions.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-[#374151]">
              Price (₹)*
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-[#374151]">
              Fuel Type*
            </label>
            <select
              id="fuelType"
              name="fuelType"
              required
              value={formData.fuelType}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
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
            <label htmlFor="vehicleType" className="block text-sm font-medium text-[#374151]">
              Vehicle Type*
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              required
              value={formData.vehicleType}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
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
      <div className="bg-[#ffffff] p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-[#111827] mb-4">Registration Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="registeredYear" className="block text-sm font-medium text-[#374151]">
              Registered Year*
            </label>
            <input
              id="registeredYear"
              name="registeredYear"
              type="number"
              required
              value={formData.registeredYear}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="registeredState" className="block text-sm font-medium text-[#374151]">
              Registered State*
            </label>
            <input
              id="registeredState"
              name="registeredState"
              type="text"
              required
              value={formData.registeredState}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="kilometers" className="block text-sm font-medium text-[#374151]">
              Kilometers Driven*
            </label>
            <input
              id="kilometers"
              name="kilometers"
              type="number"
              required
              value={formData.kilometers}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="ownership" className="block text-sm font-medium text-[#374151]">
              Ownership*
            </label>
            <select
              id="ownership"
              name="ownership"
              required
              value={formData.ownership}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
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
      <div className="bg-[#ffffff] p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-[#111827] mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="power" className="block text-sm font-medium text-[#374151]">
              Power
            </label>
            <input
              id="power"
              name="power"
              type="text"
              value={formData.power}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
              placeholder="e.g. 120 HP"
            />
          </div>
          
          <div>
            <label htmlFor="drive" className="block text-sm font-medium text-[#374151]">
              Drive Type
            </label>
            <select
              id="drive"
              name="drive"
              value={formData.drive}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
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
            <label htmlFor="transmission" className="block text-sm font-medium text-[#374151]">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            >
              {transmissionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="manufacturingYear" className="block text-sm font-medium text-[#374151]">
              Manufacturing Year
            </label>
            <input
              id="manufacturingYear"
              name="manufacturingYear"
              type="number"
              value={formData.manufacturingYear}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="seatingCapacity" className="block text-sm font-medium text-[#374151]">
              Seating Capacity
            </label>
            <input
              id="seatingCapacity"
              name="seatingCapacity"
              type="number"
              value={formData.seatingCapacity}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="airbags" className="block text-sm font-medium text-[#374151]">
              Number of Airbags
            </label>
            <input
              id="airbags"
              name="airbags"
              type="number"
              value={formData.airbags}
              onChange={handleChange}
              className="mt-1 block w-full border border-[#d1d5db] rounded-md shadow-sm py-2 px-3"
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
                className="h-4 w-4 text-blue-600 border-[#d1d5db] rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-[#6b7280]">
                Featured Vehicle (will be displayed prominently on the homepage)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading || isUploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || isUploading}
          className="min-w-[150px]"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading Images...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : isEditing ? (
            'Update Vehicle'
          ) : (
            'Create Vehicle'
          )}
        </Button>
      </div>
    </form>
  );
};