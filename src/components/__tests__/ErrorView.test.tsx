import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReactTestRenderer from 'react-test-renderer';
import { ErrorView } from '../ErrorView';

describe('ErrorView', () => {
  it('should match snapshot', () => {
    const tree = ReactTestRenderer.create(
      <ErrorView message="Something went wrong" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with retry button', () => {
    const onRetry = jest.fn();
    const tree = ReactTestRenderer.create(
      <ErrorView message="Something went wrong" onRetry={onRetry} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render error message', () => {
    const message = 'Something went wrong';
    const { getByText } = render(<ErrorView message={message} />);
    expect(getByText('Error loading countries')).toBeTruthy();
    expect(getByText(message)).toBeTruthy();
  });

  it('should render default message when not provided', () => {
    const { getByText } = render(<ErrorView />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('should call onRetry when retry is pressed', () => {
    const onRetry = jest.fn();
    const { getByText } = render(<ErrorView onRetry={onRetry} />);
    const retryButton = getByText('Tap to retry');
    fireEvent.press(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when onRetry is not provided', () => {
    const { queryByText } = render(<ErrorView />);
    expect(queryByText('Tap to retry')).toBeNull();
  });
});

