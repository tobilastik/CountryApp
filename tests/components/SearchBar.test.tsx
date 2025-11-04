import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('should render with default placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} />,
    );
    expect(getByPlaceholderText('Search countries...')).toBeTruthy();
  });

  it('should render with custom placeholder', () => {
    const placeholder = 'Search...';
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} placeholder={placeholder} />,
    );
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('should display value', () => {
    const value = 'France';
    const { getByDisplayValue } = render(
      <SearchBar value={value} onChangeText={jest.fn()} />,
    );
    expect(getByDisplayValue(value)).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={onChangeText} />,
    );
    const input = getByPlaceholderText('Search countries...');
    fireEvent.changeText(input, 'Germany');
    expect(onChangeText).toHaveBeenCalledWith('Germany');
  });
});

