import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Indian Rupees (₹) with Indian number formatting
 * @param price - The price to format
 * @param showSymbol - Whether to show the ₹ symbol (default: true)
 * @returns Formatted price string
 */
export function formatIndianPrice(price?: number | null, showSymbol: boolean = true): string {
  if (price === undefined || price === null) return showSymbol ? '₹0' : '0';
  
  const formattedPrice = price.toLocaleString('en-IN');
  return showSymbol ? `₹${formattedPrice}` : formattedPrice;
}
