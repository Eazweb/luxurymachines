import CollectionClient, { Vehicle } from './CollectionClient';
import { getPrismaClient } from '@/lib/db';

export const revalidate = 60; // Cache each variant for 60s for instant loads

type SearchParams = {
  company?: string;
  fuelType?: string;
  vehicleType?: string;
  priceMin?: string;
  priceMax?: string;
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const prisma = getPrismaClient();

  // Build filters from search params
  const filters: any = {};
  if (searchParams.company) filters.company = searchParams.company;
  if (searchParams.fuelType) filters.fuelType = searchParams.fuelType;
  if (searchParams.vehicleType) filters.vehicleType = searchParams.vehicleType;
  if (searchParams.priceMin || searchParams.priceMax) {
    filters.price = {};
    if (searchParams.priceMin) filters.price.gte = parseFloat(searchParams.priceMin);
    if (searchParams.priceMax) filters.price.lte = parseFloat(searchParams.priceMax);
  }

  // Fetch initial page of vehicles, total count, and filter options in one transaction
  const [vehicles, total, companiesRaw, fuelTypesRaw, vehicleTypesRaw] = await prisma.$transaction([
    prisma.vehicle.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      take: 6,
      skip: 0,
    }),
    prisma.vehicle.count({ where: filters }),
    prisma.vehicle.findMany({
      distinct: ['company'],
      select: { company: true },
      orderBy: { company: 'asc' },
    }),
    prisma.vehicle.findMany({
      distinct: ['fuelType'],
      select: { fuelType: true },
      orderBy: { fuelType: 'asc' },
    }),
    prisma.vehicle.findMany({
      distinct: ['vehicleType'],
      select: { vehicleType: true },
      orderBy: { vehicleType: 'asc' },
    }),
  ] as const);

  const companies = companiesRaw
    .map((i) => i.company)
    .filter((v): v is string => typeof v === 'string');
  const fuelTypes = fuelTypesRaw
    .map((i) => i.fuelType)
    .filter((v): v is string => typeof v === 'string');
  const vehicleTypes = vehicleTypesRaw
    .map((i) => i.vehicleType)
    .filter((v): v is string => typeof v === 'string');

  const initialFilters = {
    company: searchParams.company || '',
    fuelType: searchParams.fuelType || '',
    vehicleType: searchParams.vehicleType || '',
    priceMin: searchParams.priceMin || '',
    priceMax: searchParams.priceMax || '',
  };

  return (
    <CollectionClient
      initialVehicles={vehicles as unknown as Vehicle[]}
      total={total}
      initialFilters={initialFilters}
      companies={companies}
      fuelTypes={fuelTypes}
      vehicleTypes={vehicleTypes}
    />
  );
}