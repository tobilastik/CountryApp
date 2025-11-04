import { renderHook, act } from '@testing-library/react-native';
import { useSearch } from '../../src/hooks/useSearch';
import { Country } from '../../src/api/types';
import countriesMock from '../../__mocks__/countriesMock.json';

const mockCountries = countriesMock as Country[];

describe('useSearch', () => {
  it('should initialize with empty search term', () => {
    const { result } = renderHook(() => useSearch(mockCountries));

    expect(result.current.searchTerm).toBe('');
    expect(result.current.filteredCountries).toEqual(mockCountries);
  });

  it('should filter countries when search term is set', () => {
    const { result } = renderHook(() => useSearch(mockCountries));

    act(() => {
      result.current.setSearchTerm('France');
    });

    expect(result.current.searchTerm).toBe('France');
    expect(result.current.filteredCountries).toHaveLength(1);
    expect(result.current.filteredCountries[0].name.common).toBe('France');
  });

  it('should filter countries case-insensitively', () => {
    const { result } = renderHook(() => useSearch(mockCountries));

    act(() => {
      result.current.setSearchTerm('france');
    });

    expect(result.current.filteredCountries).toHaveLength(1);
    expect(result.current.filteredCountries[0].name.common).toBe('France');
  });

  it('should return empty array when no match found', () => {
    const { result } = renderHook(() => useSearch(mockCountries));

    act(() => {
      result.current.setSearchTerm('NonExistentCountry');
    });

    expect(result.current.filteredCountries).toHaveLength(0);
  });

  it('should return all countries when search term is cleared', () => {
    const { result } = renderHook(() => useSearch(mockCountries));

    act(() => {
      result.current.setSearchTerm('France');
    });

    expect(result.current.filteredCountries).toHaveLength(1);

    act(() => {
      result.current.setSearchTerm('');
    });

    expect(result.current.filteredCountries).toEqual(mockCountries);
  });
});

