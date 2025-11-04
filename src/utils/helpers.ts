export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const formatPopulation = (population: number): string => {
  return formatNumber(population);
};

export const formatArea = (area: number): string => {
  return `${formatNumber(area)} km²`;
};

export const filterCountriesByName = (
  countries: any[],
  searchTerm: string,
): any[] => {
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
