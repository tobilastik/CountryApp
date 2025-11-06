import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../hooks/useTheme';
import { formatNumber, formatArea } from '../utils/helpers';
import { DetailRow } from '../components/DetailRow';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export const DetailScreen: React.FC = () => {
  const theme = useTheme();
  const route = useRoute<DetailScreenRouteProp>();
  const { country } = route.params;

  const capital = country.capital?.[0] || 'N/A';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flagContainer}>
          <Image
            testID="country-flag-detail"
            source={{ uri: country.flags.png }}
            style={styles.flag}
            resizeMode="cover"
          />
        </View>

        <Text
          style={[
            theme.typography.textStyles.h1,
            { color: theme.colors.text },
            styles.countryName,
          ]}
        >
          {country.name.common}
        </Text>
        <Text
          style={[
            theme.typography.textStyles.body,
            { color: theme.colors.textSecondary },
            styles.officialName,
          ]}
        >
          {country.name.official}
        </Text>

        <View style={styles.detailsSection}>
          <DetailRow
            label="Capital"
            value={capital}
            theme={theme}
          />
          <DetailRow
            label="Population"
            value={formatNumber(country.population)}
            theme={theme}
          />
          <DetailRow
            label="Area"
            value={formatArea(country.area)}
            theme={theme}
          />
          <DetailRow
            label="Region"
            value={country.region}
            theme={theme}
          />
          <DetailRow
            label="Subregion"
            value={country.subregion}
            theme={theme}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  flagContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  countryName: {
    marginBottom: 8,
    textAlign: 'center',
  },
  officialName: {
    textAlign: 'center',
    marginBottom: 32,
  },
  detailsSection: {
    gap: 12,
  },
});
