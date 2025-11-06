import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useCountries } from '../useCountries';
import { fetchEuropeanCountries } from '../../api/countryApi';
import { Country } from '../../api/types';
import countriesMock from '../../../__mocks__/countriesMock.json';

jest.mock('../../api/countryApi');

const mockFetchEuropeanCountries = fetchEuropeanCountries as jest.MockedFunction<
  typeof fetchEuropeanCountries
>;

const mockCountries = countriesMock as Country[];

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useCountries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    mockFetchEuropeanCountries.mockResolvedValueOnce(mockCountries);

    const { result } = renderHook(() => useCountries(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.countries).toEqual([]);
  });

  it('should return countries when data is loaded', async () => {
    mockFetchEuropeanCountries.mockResolvedValueOnce(mockCountries);

    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.countries).toEqual(mockCountries);
    expect(result.current.isError).toBe(false);
  });

  it('should return error state when fetch fails', async () => {
    const errorMessage = 'Failed to fetch countries';
    mockFetchEuropeanCountries.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.countries).toEqual([]);
  });

  it('should provide refetch function', async () => {
    mockFetchEuropeanCountries.mockResolvedValueOnce(mockCountries);

    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });
});

