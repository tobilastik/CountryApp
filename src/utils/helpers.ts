export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const formatPopulation = (population: number): string => {
  return formatNumber(population);
};

export const formatArea = (area: number): string => {
  return `${formatNumber(area)} km²`;
};
