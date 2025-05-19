'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';

type ImageUploadProps = {
  onChange: (value: string[]) => void;
  value: string[];
};

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting status to prevent hydration issues
  useState(() => {
    setIsMounted(true);
  });

  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  const onRemove = (url: string) => {
    onChange(value.filter((current) => current !== url));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1 bg-red-500 rounded-full text-white"
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
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'luxury_cars'}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <button
              type="button"
              onClick={onClick}
              className="p-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
            >
              Upload Images
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
} 