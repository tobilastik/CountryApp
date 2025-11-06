import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Theme } from '../theme';

interface DetailRowProps {
  label: string;
  value: string;
  theme: Theme;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, theme }) => (
  <View
    style={[
      styles.detailRow,
      {
        backgroundColor: theme.colors.backgroundSecondary,
        borderColor: theme.colors.border,
      },
    ]}
  >
    <Text
      style={[
        theme.typography.textStyles.label,
        { color: theme.colors.textSecondary },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        theme.typography.textStyles.bodyLarge,
        { color: theme.colors.text },
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});

