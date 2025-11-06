import { renderHook, act } from '@testing-library/react-native';
import { useSort } from '../useSort';
import { Country } from '../../api/types';

const mockCountries: Country[] = [
  {
    name: { common: 'France', official: 'French Republic' },
    capital: ['Paris'],
    population: 67391582,
    area: 551695,
    region: 'Europe',
    subregion: 'Western Europe',
    flags: {
      png: 'https://flagcdn.com/w320/fr.png',
      svg: 'https://flagcdn.com/fr.svg',
    },
    cca2: 'FR',
    cca3: 'FRA',
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    capital: ['Berlin'],
    population: 83240525,
    area: 357114,
    region: 'Europe',
    subregion: 'Western Europe',
    flags: {
      png: 'https://flagcdn.com/w320/de.png',
      svg: 'https://flagcdn.com/de.svg',
    },
    cca2: 'DE',
    cca3: 'DEU',
  },
  {
    name: { common: 'Italy', official: 'Italian Republic' },
    capital: ['Rome'],
    population: 59554023,
    area: 301336,
    region: 'Europe',
    subregion: 'Southern Europe',
    flags: {
      png: 'https://flagcdn.com/w320/it.png',
      svg: 'https://flagcdn.com/it.svg',
    },
    cca2: 'IT',
    cca3: 'ITA',
  },
];

describe('useSort', () => {
  it('should return original array when sort is null', () => {
    const { result } = renderHook(() => useSort(mockCountries));

    expect(result.current.sort).toBe(null);
    expect(result.current.sortedCountries).toEqual(mockCountries);
  });

  it('should sort countries in ascending order by name', () => {
    const { result } = renderHook(() => useSort(mockCountries));

    act(() => {
      result.current.setSort('ascending');
    });

    expect(result.current.sort).toBe('ascending');
    expect(result.current.sortedCountries[0].name.common).toBe('France');
    expect(result.current.sortedCountries[1].name.common).toBe('Germany');
    expect(result.current.sortedCountries[2].name.common).toBe('Italy');
  });

  it('should sort countries in descending order by name', () => {
    const { result } = renderHook(() => useSort(mockCountries));

    act(() => {
      result.current.setSort('descending');
    });

    expect(result.current.sort).toBe('descending');
    expect(result.current.sortedCountries[0].name.common).toBe('Italy');
    expect(result.current.sortedCountries[1].name.common).toBe('Germany');
    expect(result.current.sortedCountries[2].name.common).toBe('France');
  });

  it('should sort countries by population (highest first)', () => {
    const { result } = renderHook(() => useSort(mockCountries));

    act(() => {
      result.current.setSort('population');
    });

    expect(result.current.sort).toBe('population');
    expect(result.current.sortedCountries[0].name.common).toBe('Germany');
    expect(result.current.sortedCountries[1].name.common).toBe('France');
    expect(result.current.sortedCountries[2].name.common).toBe('Italy');
  });

  it('should sort countries by area (largest first)', () => {
    const { result } = renderHook(() => useSort(mockCountries));

    act(() => {
      result.current.setSort('area');
    });

    expect(result.current.sort).toBe('area');
    expect(result.current.sortedCountries[0].name.common).toBe('France');
    expect(result.current.sortedCountries[1].name.common).toBe('Germany');
    expect(result.current.sortedCountries[2].name.common).toBe('Italy');
  });

  it('should return empty array when countries array is empty', () => {
    const { result } = renderHook(() => useSort([]));

    expect(result.current.sortedCountries).toEqual([]);
  });

  it('should handle single country', () => {
    const singleCountry = [mockCountries[0]];
    const { result } = renderHook(() => useSort(singleCountry));

    act(() => {
      result.current.setSort('ascending');
    });

    expect(result.current.sortedCountries).toEqual(singleCountry);
  });

  it('should reset sort to null', () => {
    const { result } = renderHook(() => useSort(mockCountries));

    act(() => {
      result.current.setSort('ascending');
    });

    expect(result.current.sort).toBe('ascending');

    act(() => {
      result.current.setSort(null);
    });

    expect(result.current.sort).toBe(null);
    expect(result.current.sortedCountries).toEqual(mockCountries);
  });
});

