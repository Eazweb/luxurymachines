'use client';

import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
  fill = false,
}: CloudinaryImageProps) {
  // Extract the public ID from the Cloudinary URL if needed
  const getPublicId = (url: string) => {
    // If it's already a public ID without http/https, return as is
    if (!url.startsWith('http')) return url;
    
    // Try to extract public ID from Cloudinary URL
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      // Remove the file extension if present
      const publicIdWithExt = pathParts[pathParts.length - 1];
      return publicIdWithExt.split('.')[0];
    } catch (e) {
      // If URL parsing fails, return the original URL
      return url;
    }
  };

  const publicId = getPublicId(src);

  return (
    <CldImage
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      fill={fill}
    />
  );
}
