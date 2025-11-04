import { useQuery } from '@tanstack/react-query';
import { fetchEuropeanCountries } from '../api/countryApi';
import { Country } from '../api/types';

export const useCountries = () => {
  const {
    data: countries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Country[], Error>({
    queryKey: ['countries', 'europe'],
    queryFn: fetchEuropeanCountries,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    countries,
    isLoading,
    isError,
    error,
    refetch,
  };
};
