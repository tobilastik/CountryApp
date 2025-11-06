import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReactTestRenderer from 'react-test-renderer';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('should match snapshot', () => {
    const tree = ReactTestRenderer.create(
      <SearchBar value="" onChangeText={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with value', () => {
    const tree = ReactTestRenderer.create(
      <SearchBar value="France" onChangeText={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

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

