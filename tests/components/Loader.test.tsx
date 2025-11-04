import React from 'react';
import { render } from '@testing-library/react-native';
import { Loader } from '../../src/components/Loader';

describe('Loader', () => {
  it('should render loading indicator', () => {
    const { getByTestId } = render(<Loader />);
    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });

  it('should render with custom message', () => {
    const message = 'Loading countries...';
    const { getByText } = render(<Loader message={message} />);
    expect(getByText(message)).toBeTruthy();
  });

  it('should not render message when not provided', () => {
    const { queryByText } = render(<Loader />);
    expect(queryByText('Loading countries...')).toBeNull();
  });
});

