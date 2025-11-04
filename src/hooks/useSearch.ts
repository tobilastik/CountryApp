import { useState, useMemo } from 'react';
import { Country } from '../api/types';
import { filterCountriesByName } from '../utils/helpers';

export const useSearch = (countries: Country[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    return filterCountriesByName(countries, searchTerm);
  }, [countries, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCountries,
  };
};

