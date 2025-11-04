import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Country } from '../api/types';
import { useTheme } from '../hooks/useTheme';

interface CountryItemProps {
  country: Country;
  onPress: () => void;
}

export const CountryItem: React.FC<CountryItemProps> = ({ country, onPress }) => {
  const theme = useTheme();
  const capital = country.capital?.[0] || 'N/A';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.flagContainer}>
        <Image
          source={{ uri: country.flags.png }}
          style={styles.flag}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[
            theme.typography.textStyles.h3,
            { color: theme.colors.text },
            styles.countryName,
          ]}
          numberOfLines={1}
        >
          {country.name.common}
        </Text>
        <Text
          style={[
            theme.typography.textStyles.bodySmall,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {capital}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  flagContainer: {
    width: 60,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  countryName: {
    marginBottom: 4,
  },
});

