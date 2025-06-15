/**
 * Vehicle option constants derived from Prisma schema enums
 * This file provides a central place to access all vehicle-related options
 * and ensures consistency between the UI and database
 */

// Fuel type options from FuelType enum
export const fuelTypes = [
  'Petrol',
  'Diesel',
  'Electric',
  'Hybrid',
  'CNG',
  'LPG'
] as const;

// Vehicle type options from VehicleType enum
export const vehicleTypes = [
  'Sedan',
  'SUV',
  'Hatchback',
  'MUV',
  'Luxury',
  'Convertible',
  'Coupe',
  'Wagon',
  'Van',
  'Jeep'
] as const;

// Ownership options from OwnershipType enum
export const ownershipOptions = [
  '1st Owner',
  '2nd Owner',
  '3rd Owner',
  '4th Owner or more'
] as const;

// Drive options from DriveType enum
export const driveOptions = [
  'FWD',
  'RWD',
  'AWD',
  '4WD'
] as const;

// Transmission options from TransmissionType enum
export const transmissionOptions = [
  'Manual',
  'Automatic'
] as const;

// Car company options from CompanyType enum
export const companyOptions = [
  'Maruti Suzuki',
  'Hyundai',
  'Tata',
  'Mahindra',
  'Toyota',
  'Honda',
  'Kia',
  'MG Motor',
  'Skoda',
  'Volkswagen',
  'Ford',
  'Renault',
  'Nissan',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Lexus',
  'Volvo',
  'Jaguar',
  'Land Rover',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Rolls-Royce',
  'Bentley',
  'Jeep',
  'Other'
] as const;

// TypeScript types for the options
export type FuelType = typeof fuelTypes[number];
export type VehicleType = typeof vehicleTypes[number];
export type OwnershipType = typeof ownershipOptions[number];
export type DriveType = typeof driveOptions[number];
export type TransmissionType = typeof transmissionOptions[number];
export type CompanyType = typeof companyOptions[number];
