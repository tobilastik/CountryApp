export const API_BASE_URL = 'https://restcountries.com/v3.1';

export const API_ENDPOINTS = {
  REGION: (region: string) => `/region/${region}`,
} as const;

export const REGIONS = {
  EUROPE: 'europe',
} as const;

export const API_TIMEOUT = 10000;
