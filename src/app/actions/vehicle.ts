'use server';

import prisma from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

// Types
type VehicleInput = {
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
  description?: string;
  features: string[];
  power?: string;
  door?: number;
  drive?: string;
  exteriorColor?: string;
  manufacturingYear?: number;
  seatingCapacity?: number;
  entertainment?: string;
  airbags?: number;
  featured: boolean;
};

// Helper function to generate slug from name, model and year
function generateSlug(name: string, model: string, year: number): string {
  // Combine name, model and year, then make it URL-friendly
  const baseSlug = `${name}-${model}-${year}`
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-');     // Remove consecutive hyphens
  
  return baseSlug;
}

// Helper function to ensure slug uniqueness
async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  // Keep trying with incrementing numbers until we find a unique slug
  while (true) {
    // Check if slug already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { slug },
      select: { id: true },
    });
    
    if (!existingVehicle) {
      return slug; // Slug is unique, return it
    }
    
    // Slug exists, append incrementing number
    slug = `${baseSlug}_${counter}`;
    counter++;
  }
}

// Create a new vehicle
export async function createVehicle(
  data: VehicleInput,
  imageUrls: string[]
) {
  try {
    // Generate a slug for the vehicle
    const baseSlug = generateSlug(data.name, data.model, data.registeredYear);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);
    
    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        slug: uniqueSlug,
        images: imageUrls,
      },
    });
    
    revalidatePath('/admin/vehicles');
    revalidatePath('/collection');
    return { success: true, id: vehicle.id, slug: vehicle.slug };
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return { success: false, error: 'Failed to create vehicle' };
  }
}

// Update an existing vehicle
export async function updateVehicle(
  id: string,
  data: VehicleInput,
  imageUrls: string[]
) {
  try {
    // Get current vehicle data to check if name or model has changed
    const currentVehicle = await prisma.vehicle.findUnique({
      where: { id },
      select: { name: true, model: true, registeredYear: true, slug: true },
    });
    
    // Only regenerate slug if name, model or year changed
    let slug = currentVehicle?.slug;
    if (
      currentVehicle &&
      (currentVehicle.name !== data.name || 
       currentVehicle.model !== data.model || 
       currentVehicle.registeredYear !== data.registeredYear)
    ) {
      const baseSlug = generateSlug(data.name, data.model, data.registeredYear);
      slug = await ensureUniqueSlug(baseSlug);
    }
    
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...data,
        slug,
        images: imageUrls,
      },
    });
    
    revalidatePath('/admin/vehicles');
    revalidatePath('/collection');
    revalidatePath(`/vehicle/${vehicle.slug}`);
    return { success: true, id: vehicle.id, slug: vehicle.slug };
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return { success: false, error: 'Failed to update vehicle' };
  }
}

// Delete a vehicle
export async function deleteVehicle(id: string) {
  try {
    // Get vehicle to access image URLs and slug
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      select: { images: true, slug: true },
    });
    
    if (!vehicle) {
      return { success: false, error: 'Vehicle not found' };
    }
    
    // Delete images from Cloudinary if they exist
    const deletePromises = vehicle.images.map(async (imageUrl) => {
      // Extract public ID from Cloudinary URL
      const publicId = imageUrl.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error(`Failed to delete image ${publicId}:`, error);
        }
      }
    });
    
    await Promise.all(deletePromises);
    
    // Delete the vehicle from the database
    await prisma.vehicle.delete({
      where: { id },
    });
    
    revalidatePath('/admin/vehicles');
    revalidatePath('/collection');
    revalidatePath(`/vehicle/${vehicle.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return { success: false, error: 'Failed to delete vehicle' };
  }
}

// Get featured vehicles
export async function getFeaturedVehicles(limit = 6) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    
    return vehicles;
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    throw new Error('Failed to fetch featured vehicles');
  }
}

// Get vehicle by slug
export async function getVehicleBySlug(slug: string) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug },
    });
    
    if (!vehicle) {
      return null;
    }
    
    return vehicle;
  } catch (error) {
    console.error('Error fetching vehicle by slug:', error);
    return null;
  }
}

// Get vehicle by ID
export async function getVehicleById(id: string) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });
    
    if (!vehicle) {
      return { success: false, error: 'Vehicle not found' };
    }
    
    return { success: true, data: vehicle };
  } catch (error) {
    console.error('Error fetching vehicle by ID:', error);
    return { success: false, error: 'Failed to fetch vehicle' };
  }
}

export async function getRecommendedVehicles(currentVehicleId: string, limit = 6) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        id: { not: currentVehicleId },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, data: vehicles };
  } catch (error) {
    console.error('Error fetching recommended vehicles:', error);
    return { success: false, error: 'Failed to fetch recommended vehicles' };
  }
}