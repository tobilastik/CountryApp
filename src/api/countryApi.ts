import httpClient from './httpClient';
import { Country } from './types';
import { API_ENDPOINTS, REGIONS } from '../utils/constants';

const fetchCountriesByRegion = async (
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
