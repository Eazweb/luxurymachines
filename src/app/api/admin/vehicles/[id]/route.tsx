import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest
import { getPrismaClient } from '@/lib/db';
import { ObjectId } from 'mongodb';

// Define an interface for the context
interface RouteHandlerContext {
  params: {
    id: string;
  };
}

export async function GET(
  _request: NextRequest, // It's good practice to use NextRequest
  context: RouteHandlerContext
) {
  const { id } = context.params; // Destructure here

  const prisma = getPrismaClient();
  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid vehicle ID format' },
        { status: 400 }
      );
    }
    // ... rest of your GET logic
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });
    // ...
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
      { error: 'Failed to fetch vehicle', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest, // Use NextRequest
  context: RouteHandlerContext
) {
  const { id } = context.params; // Destructure here
  const prisma = getPrismaClient();
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid vehicle ID format' },
        { status: 400 }
      );
    }
    // ... rest of your PUT logic
    const vehicleData = await request.json();
    delete vehicleData.id;
    delete vehicleData._id;
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: vehicleData,
    });
    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      {
        error: 'Failed to update vehicle',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest, // Use NextRequest
  context: RouteHandlerContext
) {
  const { id } = context.params; // Destructure here
  const prisma = getPrismaClient();
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid vehicle ID format' },
        { status: 400 }
      );
    }
    // ... rest of your DELETE logic
    await prisma.vehicle.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        error: 'Failed to delete vehicle',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}