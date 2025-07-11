import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/db';

// This route is marked as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const skip = (page - 1) * limit;

    // Filter parameters
    const company = searchParams.get('company');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const fuelType = searchParams.get('fuelType');
    const vehicleType = searchParams.get('vehicleType');
    const featured = searchParams.get('featured');

    // Build filter object
    const filters: any = {};
    if (company) filters.company = company;
    if (fuelType) filters.fuelType = fuelType;
    if (vehicleType) filters.vehicleType = vehicleType;
    if (featured === 'true') filters.featured = true;
    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.gte = parseFloat(priceMin);
      if (priceMax) filters.price.lte = parseFloat(priceMax);
    }

    const prisma = getPrismaClient();

    // Execute queries in a transaction
    const [vehicles, total] = await prisma.$transaction([
      prisma.vehicle.findMany({
        where: filters,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.vehicle.count({ where: filters }),
    ]);

    return NextResponse.json({ vehicles, total });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
} 