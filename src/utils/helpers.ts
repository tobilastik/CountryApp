import { Country } from '../api/types';

/**
 * Formats a number with thousand separators (e.g., 1234567 -> "1,234,567")
 * @param num - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Formats an area value with thousand separators and unit (e.g., 1234567 -> "1,234,567 km²")
 * @param area - The area in square kilometers
 * @returns Formatted area string with unit
 */
export const formatArea = (area: number): string => {
  return `${formatNumber(area)} km²`;
};

/**
 * Filters countries by name (common or official) matching the search term
 * Case-insensitive search that matches partial strings
 * @param countries - Array of countries to filter
 * @param searchTerm - Search term to match against country names
 * @returns Filtered array of countries matching the search term
 */
export const filterCountriesByName = (
  countries: Country[],
  searchTerm: string,
): Country[] => {
  if (!searchTerm.trim()) {
    return countries;
  }

  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  return countries.filter(
    country =>
      country.name.common.toLowerCase().includes(lowerSearchTerm) ||
      country.name.official.toLowerCase().includes(lowerSearchTerm),
  );
};
