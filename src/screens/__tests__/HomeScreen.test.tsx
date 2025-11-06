import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';
import { useCountries } from '../../hooks/useCountries';
import { createMockNavigation, renderWithProviders } from '../../utils/testUtils';
import { Country } from '../../api/types';
import countriesMock from '../../../__mocks__/countriesMock.json';

const mockCountries = countriesMock as Country[];

jest.mock('../../hooks/useCountries');

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
      <HomeScreen navigation={mockNavigation} />,
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
      <HomeScreen navigation={mockNavigation} />,
    );

    expect(getByText('Error loading countries')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should render countries list', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation} />,
    );

    expect(getByText('France')).toBeTruthy();
    expect(getByText('Germany')).toBeTruthy();
    expect(getByText('Italy')).toBeTruthy();
  });

  it('should navigate to detail screen on country press', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByTestId } = renderWithProviders(
      <HomeScreen navigation={mockNavigation} />,
    );

    const firstCountryCode = mockCountries[0].cca2;
    const countryItem = getByTestId(`country-item-${firstCountryCode}`);
    fireEvent.press(countryItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Detail', {
      country: mockCountries[0],
    });
  });

  it('should render search bar', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByPlaceholderText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation} />,
    );

    expect(getByPlaceholderText('Search countries...')).toBeTruthy();
  });

  it('should filter countries when search term is entered', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByPlaceholderText, getByText, queryByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation} />,
    );

    const searchInput = getByPlaceholderText('Search countries...');
    fireEvent.changeText(searchInput, 'France');

    expect(getByText('France')).toBeTruthy();
    expect(queryByText('Germany')).toBeNull();
    expect(queryByText('Italy')).toBeNull();
  });
});

