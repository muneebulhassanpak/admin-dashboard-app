/**
 * Formatting utility functions for Knowledge Base module
 */

/**
 * Format file size from KB to appropriate unit
 */
export const formatFileSize = (sizeKB: number): string => {
  if (sizeKB < 1024) {
    return `${sizeKB} KB`;
  }
  return `${(sizeKB / 1024).toFixed(2)} MB`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
