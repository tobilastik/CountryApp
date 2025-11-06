import React from 'react';
import { render } from '@testing-library/react-native';
import ReactTestRenderer from 'react-test-renderer';
import { Loader } from '../Loader';

describe('Loader', () => {
  it('should match snapshot', () => {
    const tree = ReactTestRenderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with message', () => {
    const tree = ReactTestRenderer.create(
      <Loader message="Loading countries..." />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

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

