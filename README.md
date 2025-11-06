# Propstack

A React Native app for browsing European countries. Built with TypeScript, React Query, and React Navigation.

## Features

- Browse a list of European countries
- Search countries by name
- Sort by name (A-Z, Z-A), population, or area
- View detailed information for each country
- Responsive design with dark mode support

## Tech Stack

- **React Native** 0.82.1
- **TypeScript** for type safety
- **React Query** for data fetching and caching
- **React Navigation** for navigation
- **Axios** for HTTP requests
- **Jest** + **React Testing Library** for testing

## Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up ([official guide](https://reactnative.dev/docs/set-up-your-environment))
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

```bash
# Install dependencies
npm install

# For iOS, install CocoaPods dependencies
npx pod-install
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS (in a new terminal)
npm run ios

# Run on Android (in a new terminal)
npm run android
```

## Project Structure

```
src/
├── api/           # API client and country data fetching
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── theme/         # Theme configuration (colors, typography, spacing)
└── utils/         # Utility functions and helpers
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

The project includes unit tests for hooks, components, and screens using Jest and React Testing Library.

## API

The app fetches country data from the [REST Countries API](https://restcountries.com/), specifically filtering for European countries.

## Notes

- The app uses React Query for efficient data fetching with automatic caching and refetching
- All components are typed with TypeScript for better developer experience
