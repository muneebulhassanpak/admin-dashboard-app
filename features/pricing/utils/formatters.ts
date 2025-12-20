/**
 * Formatting utility functions for Pricing module
 */

/**
 * Format price to display value
 */
export const formatPrice = (price: number) => {
  return price === 0 ? 'Free' : `$${price}`;
};

/**
 * Format limit value (null means unlimited)
 */
export const formatLimit = (limit: number | null) => {
  return limit === null ? 'Unlimited' : limit.toString();
};
