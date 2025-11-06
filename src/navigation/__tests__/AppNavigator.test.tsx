import React from 'react';
import { render } from '@testing-library/react-native';
import { AppNavigator } from '../AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  );
};

describe('AppNavigator', () => {
  it('should render navigation structure', () => {
    const { UNSAFE_getByType } = render(<AppNavigator />, { wrapper });
    expect(UNSAFE_getByType).toBeDefined();
  });

  it('should have Home screen configured', () => {
    const { getByTestId } = render(<AppNavigator />, { wrapper });
    expect(getByTestId('search-input')).toBeTruthy();
  });
});

