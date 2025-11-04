import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithProviders = (
  ui: React.ReactElement,
  queryClient?: QueryClient,
) => {
  const client = queryClient || createTestQueryClient();

  return render(
    <QueryClientProvider client={client}>
      <NavigationContainer>{ui}</NavigationContainer>
    </QueryClientProvider>,
  );
};

export const createMockNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
});

