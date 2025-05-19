import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    // Get the slug from the context params
    const { slug } = context.params;
    
    // First try to find by slug
    let vehicle = await prisma.vehicle.findUnique({
      where: { slug },
    });
    
    // If not found by slug and it looks like an ID, try to find by ID
    if (!vehicle && /^[0-9a-fA-F]{24}$/.test(slug)) {
      vehicle = await prisma.vehicle.findUnique({
        where: { id: slug },
      });
    }
    
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicle' },
      { status: 500 }
    );
  }
}