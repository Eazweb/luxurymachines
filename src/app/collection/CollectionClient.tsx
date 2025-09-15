"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  price: number;
  model: string;
  company: string;
  fuelType: string;
  registeredYear: number;
  kilometers: number;
  registeredState: string;
  vehicleType: string;
  transmission: string;
  ownership: string;
  images: string[];
};

export type CollectionClientProps = {
  initialVehicles: Vehicle[];
  total: number;
  initialFilters: {
    company: string;
    fuelType: string;
    vehicleType: string;
    priceMin: string;
    priceMax: string;
  };
  companies: string[];
  fuelTypes: string[];
  vehicleTypes: string[];
};

export default function CollectionClient({
  initialVehicles,
  total,
  initialFilters,
  companies,
  fuelTypes,
  vehicleTypes,
}: CollectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialVehicles.length < total);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // If search params change due to navigation, sync client state
  useEffect(() => {
    const sp = new URLSearchParams(searchParams.toString());
    const nextFilters = {
      company: sp.get("company") || "",
      fuelType: sp.get("fuelType") || "",
      vehicleType: sp.get("vehicleType") || "",
      priceMin: sp.get("priceMin") || "",
      priceMax: sp.get("priceMax") || "",
    };
    setFilters(nextFilters);
    // Note: vehicles will be replaced by server-rendered list on navigation, so no need to set here
  }, [searchParams]);

  // Load more for infinite scroll
  const loadVehicles = async (pageNum: number) => {
    setLoadingMore(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value as string);
    });
    params.append("page", pageNum.toString());
    params.append("limit", "6");

    try {
      const response = await fetch(`/api/vehicles?${params.toString()}`);
      const data = await response.json();
      const newVehicles: Vehicle[] = data.vehicles || [];
      setVehicles((prev) => [...prev, ...newVehicles]);
      setHasMore(newVehicles.length > 0 && pageNum * 6 < data.total);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Effect for infinite scrolling
  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      loadVehicles(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, loading, loadingMore]);

  // Tiny helper to prefetch detail routes on visibility
  const PrefetchOnView: React.FC<{ href: string }> = ({ href }) => {
    const { ref: pfRef, inView: pfInView } = useInView({ threshold: 0, triggerOnce: true });
    useEffect(() => {
      if (pfInView) {
        router.prefetch(href);
      }
    }, [pfInView, href]);
    return <div ref={pfRef} aria-hidden className="h-0 w-0 overflow-hidden" />;
  };

  // Handle filter changes -> navigate to new URL, server will prefetch and render
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };

    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val as string);
      else params.delete(key);
    });

    router.push(`/collection?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/collection");
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    let sortedVehicles = [...vehicles];
    switch (value) {
      case "price-low-high":
        sortedVehicles.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedVehicles.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sortedVehicles.sort((a, b) => b.registeredYear - a.registeredYear);
        break;
      case "oldest":
        sortedVehicles.sort((a, b) => a.registeredYear - b.registeredYear);
        break;
    }
    setVehicles(sortedVehicles);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Filter Section */}
      <div className="bg-[#0f172a] py-6 md:py-8">
        <div className="container mx-auto w-full max-w-[95vw] px-2 md:w-[90%] md:px-4">
          <div className="bg-white rounded-2xl md:rounded-full px-2 py-3 md:px-6 md:py-4 shadow-lg">
            <div className="flex md:hidden justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">Filters</span>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="text-blue-600 text-sm font-medium px-3 py-1 rounded focus:outline-none focus:ring"
              >
                {filtersOpen ? "Hide" : "Show"}
              </button>
            </div>
            <div
              className={`flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-2 md:gap-2 transition-all duration-300 ${
                filtersOpen
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
              } overflow-hidden`}
            >
              {/* Filter controls */}
              <div className="flex-1 min-w-[180px]">
                <select
                  name="company"
                  value={filters.company}
                  onChange={handleFilterChange}
                  className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 1rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1rem",
                  }}
                >
                  <option value="">All Brands</option>
                  {companies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
              <div className="flex-1 min-w-[180px]">
                <select
                  name="vehicleType"
                  value={filters.vehicleType}
                  onChange={handleFilterChange}
                  className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 1rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1rem",
                  }}
                >
                  <option value="">All Models</option>
                  {vehicleTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
              <div className="w-full md:flex-1 md:min-w-[200px]">
                <div className="flex gap-2">
                  <select
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="">Min Price</option>
                    <option value="100000">₹1 Lakh</option>
                    <option value="500000">₹5 Lakh</option>
                    <option value="1000000">₹10 Lakh</option>
                    <option value="2000000">₹20 Lakh</option>
                    <option value="3000000">₹30 Lakh</option>
                  </select>
                  <select
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="">Max Price</option>
                    <option value="500000">₹5 Lakh</option>
                    <option value="1000000">₹10 Lakh</option>
                    <option value="2000000">₹20 Lakh</option>
                    <option value="3000000">₹30 Lakh</option>
                    <option value="5000000">₹50 Lakh+</option>
                  </select>
                </div>
              </div>
              <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
              <div className="flex-1 min-w-[180px]">
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="w-full py-3 px-4 text-base bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-800 font-medium hover:bg-gray-50 focus:bg-gray-50 rounded-lg transition-colors"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 1rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1rem",
                  }}
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
              <div className="w-full md:w-auto flex items-center justify-center md:justify-start md:px-4 pt-1.5 md:pt-0 border-t border-gray-200 md:border-t-0 mt-1.5 md:mt-0">
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#0f172a] md:pt-12">
        <div className="h-[40px] md:h-[80px] rounded-t-full bg-white w-full"></div>
        <div className="container bg-white mx-auto px-2 md:px-4 pb-8 min-h-screen rounded-b-2xl">
          <div className="mb-8 px-2 md:px-[5%]">
            <nav className="flex mb-2" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500">Collection</span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex flex-col mt-3 md:mt-5 md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl md:text-5xl font-medium text-gray-900">
                Our Collection
              </h1>
              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 px-2 md:px-[5%]">
            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="relative">
                    <PrefetchOnView href={`/collection/${vehicle.slug}`} />
                    <ProductCard
                      {...vehicle}
                      transmission={vehicle.transmission}
                      isGreatPrice={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 mb-2">
                  No vehicles found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Loader for infinite scroll */}
            <div ref={ref} className="mt-6">
              {loadingMore && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ProductCardSkeleton key={`skel-${index}`} />
                  ))}
                </div>
              )}
            </div>

            {!loading && !hasMore && vehicles.length > 0 && (
              <div className="text-center mt-8 text-gray-500">
                <p>You've reached the end of the list.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
