import { useState, useMemo } from 'react';
import { Country } from '../api/types';
import { SortOption } from '../components/SortModal';

export const useSort = (countries: Country[]) => {
  const [sort, setSort] = useState<SortOption>(null);

  const sortedCountries = useMemo(() => {
    if (!sort) {
      return countries;
    }

    const sorted = [...countries].sort((a, b) => {
      switch (sort) {
        case 'ascending':
          return a.name.common.localeCompare(b.name.common);
        case 'descending':
          return b.name.common.localeCompare(a.name.common);
        case 'population':
          return b.population - a.population;
        case 'area':
          return b.area - a.area;
        default:
          return 0;
      }
    });

    return sorted;
  }, [countries, sort]);

  return {
    sort,
    setSort,
    sortedCountries,
  };
};
