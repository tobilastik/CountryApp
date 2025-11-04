import httpClient from './httpClient';
import { Country } from './types';
import { API_ENDPOINTS, REGIONS } from '../utils/constants';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await httpClient.get<Country[]>(API_ENDPOINTS.ALL_COUNTRIES);
  return response.data;
};

export const fetchCountriesByRegion = async (
  region: string = REGIONS.EUROPE,
): Promise<Country[]> => {
  const response = await httpClient.get<Country[]>(
    API_ENDPOINTS.REGION(region),
  );
  return response.data;
};

export const fetchEuropeanCountries = async (): Promise<Country[]> => {
  return fetchCountriesByRegion(REGIONS.EUROPE);
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await httpClient.get<Country[]>(
    API_ENDPOINTS.COUNTRY_BY_CODE(code),
  );
  if (response.data.length === 0) {
    throw new Error(`Country with code ${code} not found`);
  }
  return response.data[0];
};
