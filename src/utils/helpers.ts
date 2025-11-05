import { Country } from '../api/types';

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const formatArea = (area: number): string => {
  return `${formatNumber(area)} km²`;
};

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
