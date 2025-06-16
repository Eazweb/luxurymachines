import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/db';

// This route is marked as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Initialize Prisma client inside the request handler
    const prisma = getPrismaClient();
    
    const { searchParams } = new URL(request.url);
    const field = searchParams.get('field');
    
    if (!field) {
      return NextResponse.json(
        { error: 'Field parameter is required' },
        { status: 400 }
      );
    }
    
    // Validate that the field is one of the allowed fields
    const allowedFields = ['company', 'fuelType', 'vehicleType'];
    if (!allowedFields.includes(field)) {
      return NextResponse.json(
        { error: 'Invalid field parameter' },
        { status: 400 }
      );
    }
    
    // Use Prisma's distinct to get unique values for the specified field
    const values = await prisma.vehicle.findMany({
      distinct: [field as any],
      select: {
        [field]: true
      },
      orderBy: {
        [field]: 'asc'
      }
    });
    
    // Extract the field values from the results
    const result = (values
      .map(item => item[field as keyof typeof item]) as (string | null | undefined)[])
      .filter((value): value is string => typeof value === 'string');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
