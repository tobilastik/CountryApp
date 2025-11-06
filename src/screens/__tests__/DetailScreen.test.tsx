import React from 'react';
import { DetailScreen } from '../DetailScreen';
import { renderWithProviders } from '../../utils/testUtils';
import countriesMock from '../../../__mocks__/countriesMock.json';
import { formatNumber, formatArea } from '../../utils/helpers';

jest.mock('@react-navigation/native', () => {
  const nativeNav = jest.requireActual('@react-navigation/native');
  const mockCountry = {
    name: {
      common: 'France',
      official: 'French Republic',
    },
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
  };
  return {
    ...nativeNav,
    useRoute: () => ({
      params: {
        country: mockCountry,
      },
    }),
  };
});

describe('DetailScreen', () => {
  it('should render country name', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    expect(getByText('France')).toBeTruthy();
  });

  it('should render official country name', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    expect(getByText('French Republic')).toBeTruthy();
  });

  it('should render capital', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    expect(getByText('Paris')).toBeTruthy();
  });

  it('should render formatted population', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    const population = formatNumber(67391582);
    expect(getByText(population)).toBeTruthy();
  });

  it('should render formatted area', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    const area = formatArea(551695);
    expect(getByText(area)).toBeTruthy();
  });

  it('should render region', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    expect(getByText('Europe')).toBeTruthy();
  });

  it('should render subregion', () => {
    const { getByText } = renderWithProviders(<DetailScreen />);
    expect(getByText('Western Europe')).toBeTruthy();
  });

  it('should render country flag', () => {
    const { getByTestId } = renderWithProviders(<DetailScreen />);
    const flagImage = getByTestId('country-flag-detail');
    expect(flagImage).toBeTruthy();
    expect(flagImage.props.source.uri).toBe(countriesMock[0].flags.png);
  });
});

