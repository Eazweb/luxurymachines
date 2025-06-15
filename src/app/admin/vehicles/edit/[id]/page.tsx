'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getVehicleById } from '@/app/actions/vehicle';
import VehicleForm from '@/components/VehicleForm';



export default function EditVehiclePage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const result = await getVehicleById(id as string);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch vehicle');
        }
        
        setVehicle(result.data);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('Failed to load vehicle details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }
      
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Vehicle</h1>
      
      {vehicle && (
        <VehicleForm 
          initialData={vehicle} 
          isEditing={true} 
        />
      )}
    </div>
  );
}