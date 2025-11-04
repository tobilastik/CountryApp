import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = 'Something went wrong',
  onRetry,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          theme.typography.textStyles.h3,
          { color: theme.colors.error, marginBottom: theme.spacing[2] },
        ]}
      >
        Error loading countries
      </Text>
      <Text
        style={[
          theme.typography.textStyles.body,
          { color: theme.colors.textSecondary },
        ]}
      >
        {message}
      </Text>
      {onRetry && (
        <Text
          style={[
            theme.typography.textStyles.body,
            { color: theme.colors.primary, marginTop: theme.spacing[4] },
          ]}
          onPress={onRetry}
        >
          Tap to retry
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

