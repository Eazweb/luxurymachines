'use server';

import { getPrismaClient } from '@/lib/db';

const prisma = getPrismaClient();

export async function getDynamicBrands() {
  try {
    const brandsWithVehicles = await prisma.vehicle.groupBy({
      by: ['company'],
      _count: {
        company: true,
      },
      having: {
        company: {
          _count: {
            gt: 0,
          },
        },
      },
      orderBy: {
        _count: {
          company: 'desc', // Order by number of vehicles, most first
        },
      },
      take: 6, // Limit to a maximum of 6 brands
    });

    // Map to a format suitable for the BrandsSection component
    // Assuming logo paths can be derived from company names
    const dynamicBrands = brandsWithVehicles.map((brand) => ({
      id: brand.company, // Using company name as ID for simplicity
      name: brand.company,
      logo: `/images/brands/${brand.company.toLowerCase()}.png`, // Adjust path and extension as needed
      slug: brand.company,
    }));

    return { success: true, data: dynamicBrands };
  } catch (error) {
    console.error('Error fetching dynamic brands:', error);
    return { success: false, error: 'Failed to fetch dynamic brands.' };
  }
}