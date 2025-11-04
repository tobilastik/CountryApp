import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCountries } from '../hooks/useCountries';
import { useSearch } from '../hooks/useSearch';
import { CountryItem } from '../components/CountryItem';
import { Loader } from '../components/Loader';
import { ErrorView } from '../components/ErrorView';
import { SearchBar } from '../components/SearchBar';
import { Country } from '../api/types';
import { useTheme } from '../hooks/useTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const theme = useTheme();
    const { countries, isLoading, isError, error, refetch } = useCountries();
    const { searchTerm, setSearchTerm, filteredCountries } = useSearch(countries);

    const handleCountryPress = (country: Country) => {
        navigation.navigate('Detail', { country });
    };

    const renderCountryItem = ({ item }: { item: Country }) => (
        <CountryItem country={item} onPress={() => handleCountryPress(item)} />
    );

    const renderEmptyList = () => {
        if (isLoading) {
            return <Loader message="Loading countries..." />;
        }

        if (isError) {
            return (
                <ErrorView
                    message={error?.message || 'Something went wrong'}
                    onRetry={refetch}
                />
            );
        }

        return (
            <View style={styles.centerContainer}>
                <Text
                    style={[
                        theme.typography.textStyles.body,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    {searchTerm ? 'No countries found' : 'No countries available'}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            edges={['top']}
        >
            <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
            <FlatList
                data={filteredCountries}
                renderItem={renderCountryItem}
                keyExtractor={item => item.cca2}
                contentContainerStyle={[
                    styles.listContent,
                    filteredCountries.length === 0 && styles.emptyListContent,
                ]}
                ListEmptyComponent={renderEmptyList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 8,
    },
    emptyListContent: {
        flex: 1,
        justifyContent: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
});
