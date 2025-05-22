import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract filter parameters
    const company = searchParams.get('company');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const fuelType = searchParams.get('fuelType');
    const vehicleType = searchParams.get('vehicleType');
    const limit = searchParams.get('limit');
    
    // Build filter object
    const filters: any = {
      // Always include isForRent: true for this endpoint
      isForRent: true
    };
    
    if (company) filters.company = company;
    if (fuelType) filters.fuelType = fuelType;
    if (vehicleType) filters.vehicleType = vehicleType;
    
    // Price range
    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.gte = parseFloat(priceMin);
      if (priceMax) filters.price.lte = parseFloat(priceMax);
    }
    
    // Execute query
    const vehicles = await prisma.vehicle.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });
    
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching rental vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rental vehicles' },
      { status: 500 }
    );
  }
}
