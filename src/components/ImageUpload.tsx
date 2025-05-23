'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Upload, ImagePlus } from 'lucide-react';

type ImageUploadProps = {
  onChange: (value: string[]) => void;
  value: string[];
  disabled?: boolean;
};

export default function ImageUpload({ onChange, value, disabled = false }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle mounting status to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setError(null);
    
    // Check file sizes
    const oversizedFiles = Array.from(files).filter(file => file.size > 3 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`${oversizedFiles.length} image(s) exceed the 3MB size limit`);
      return;
    }
    
    // Upload each file to Cloudinary
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = `file-${Date.now()}-${i}`;
      
      try {
        setIsUploading(true);
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
        // Create form data for upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'luxury_cars');
        
        // Check if cloud name is available
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          throw new Error('Cloudinary cloud name is not configured');
        }
        
        // Upload to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        
        // Add optimization parameters to the URL
        let url = data.secure_url;
        url = url.replace('/upload/', '/upload/f_auto,q_auto/');
        
        // Add to images array
        onChange([...value, url]);
        
        // Clear progress
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
        
      } catch (error) {
        console.error('Upload error:', error);
        setError('Failed to upload image. Please try again.');
      }
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setIsUploading(false);
  };

  const onRemove = (url: string) => {
    onChange(value.filter((current) => current !== url));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Image upload input */}
      <div className="mb-4">
        <label 
          htmlFor="image-upload" 
          className={`flex items-center justify-center gap-2 p-3 rounded-md cursor-pointer ${isUploading ? 'bg-gray-400' : 'bg-slate-800 hover:bg-slate-700'} text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <>
              <Upload className="h-5 w-5 animate-pulse" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-5 w-5" />
              <span>Select Images</span>
            </>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            ref={fileInputRef}
          />
        </label>
        <p className="mt-2 text-xs text-gray-500">Maximum file size: 3MB. Supported formats: JPG, PNG, WEBP</p>
      </div>
      
      {/* Upload progress indicators */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mb-4">
          {Object.keys(uploadProgress).map(fileId => (
            <div key={fileId} className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Uploading image...</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress[fileId]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Display uploaded images */}
      {value.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({value.length})</h3>
          <div className="flex flex-wrap gap-4">
            {value.map((url) => (
              <div
                key={url}
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-gray-200"
              >
                <div className="absolute z-10 top-2 right-2">
                  <button
                    type="button"
                    onClick={() => onRemove(url)}
                    disabled={disabled}
                    className="p-1 bg-red-500 rounded-full text-white disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Image
                  fill
                  className="object-cover"
                  alt="Vehicle image"
                  src={url}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}