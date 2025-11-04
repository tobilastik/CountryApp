import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../../src/screens/HomeScreen';
import { useCountries } from '../../src/hooks/useCountries';
import { createMockNavigation } from '../utils/testUtils';
import { renderWithProviders } from '../utils/testUtils';
import countriesMock from '../../__mocks__/countriesMock.json';

jest.mock('../../src/hooks/useCountries');

const mockUseCountries = useCountries as jest.MockedFunction<
  typeof useCountries
>;

describe('HomeScreen', () => {
  const mockNavigation = createMockNavigation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    mockUseCountries.mockReturnValue({
      countries: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    expect(getByText('Loading countries...')).toBeTruthy();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to fetch';
    mockUseCountries.mockReturnValue({
      countries: [],
      isLoading: false,
      isError: true,
      error: new Error(errorMessage),
      refetch: jest.fn(),
    });

    const { getByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    expect(getByText('Error loading countries')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should render countries list', () => {
    mockUseCountries.mockReturnValue({
      countries: countriesMock as any,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    expect(getByText('France')).toBeTruthy();
    expect(getByText('Germany')).toBeTruthy();
    expect(getByText('Italy')).toBeTruthy();
  });

  it('should navigate to detail screen on country press', () => {
    mockUseCountries.mockReturnValue({
      countries: countriesMock as any,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getAllByTestId } = renderWithProviders(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    const countryItems = getAllByTestId('country-item');
    fireEvent.press(countryItems[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Detail', {
      country: countriesMock[0],
    });
  });

  it('should render search bar', () => {
    mockUseCountries.mockReturnValue({
      countries: countriesMock as any,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByPlaceholderText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    expect(getByPlaceholderText('Search countries...')).toBeTruthy();
  });

  it('should filter countries when search term is entered', () => {
    mockUseCountries.mockReturnValue({
      countries: countriesMock as any,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByPlaceholderText, getByText, queryByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    const searchInput = getByPlaceholderText('Search countries...');
    fireEvent.changeText(searchInput, 'France');

    expect(getByText('France')).toBeTruthy();
    expect(queryByText('Germany')).toBeNull();
    expect(queryByText('Italy')).toBeNull();
  });
});

