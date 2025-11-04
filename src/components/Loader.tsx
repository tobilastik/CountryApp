import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        testID="activity-indicator"
        size="large"
        color={theme.colors.primary}
      />
      {message && (
        <Text
          style={[
            theme.typography.textStyles.body,
            { color: theme.colors.textSecondary, marginTop: theme.spacing[4] },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});

