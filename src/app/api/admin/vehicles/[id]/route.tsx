import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Get the id from the context params
    const { id } = context.params;
    
    // Find vehicle by ID
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });
    
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

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Get the id from the context params
    const { id } = context.params;
    
    // Get the updated vehicle data from the request body
    const vehicleData = await request.json();
    
    // Update the vehicle in the database
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: vehicleData,
    });
    
    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to update vehicle' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Get the id from the context params
    const { id } = context.params;
    
    // Delete the vehicle from the database
    await prisma.vehicle.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
}
