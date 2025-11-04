import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CountryItem } from '../../src/components/CountryItem';
import { Country } from '../../src/api/types';
import countriesMock from '../../__mocks__/countriesMock.json';

const mockCountry = countriesMock[0] as Country;

describe('CountryItem', () => {
  it('should render country name', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <CountryItem country={mockCountry} onPress={onPress} />,
    );
    expect(getByText(mockCountry.name.common)).toBeTruthy();
  });

  it('should render capital city', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <CountryItem country={mockCountry} onPress={onPress} />,
    );
    expect(getByText(mockCountry.capital[0])).toBeTruthy();
  });

  it('should display N/A when capital is missing', () => {
    const countryWithoutCapital = {
      ...mockCountry,
      capital: [],
    };
    const onPress = jest.fn();
    const { getByText } = render(
      <CountryItem country={countryWithoutCapital} onPress={onPress} />,
    );
    expect(getByText('N/A')).toBeTruthy();
  });

  it('should render flag image', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <CountryItem country={mockCountry} onPress={onPress} />,
    );
    const flagImage = getByTestId('country-flag');
    expect(flagImage).toBeTruthy();
    expect(flagImage.props.source.uri).toBe(mockCountry.flags.png);
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <CountryItem country={mockCountry} onPress={onPress} />,
    );
    const touchable = getByTestId('country-item');
    fireEvent.press(touchable);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

