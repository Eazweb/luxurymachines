/**
 * Formats a number to Indian currency format (e.g., 1,00,000)
 * @param price - The price to format
 * @param withSymbol - Whether to include the ₹ symbol
 * @returns Formatted price string
 */
export function formatPrice(price: number, withSymbol: boolean = true): string {
  // Handle invalid or zero price
  if (!price && price !== 0) return withSymbol ? '₹0' : '0';
  
  // Format with Indian numbering system (2 digits after first 3)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  // Return formatted string (remove ₹ if withSymbol is false)
  const formatted = formatter.format(price);
  return withSymbol ? formatted : formatted.replace('₹', '');
}
