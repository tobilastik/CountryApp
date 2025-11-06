import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCountries } from '../hooks/useCountries';
import { useSort } from '../hooks/useSort';
import { CountryItem } from '../components/CountryItem';
import { Loader } from '../components/Loader';
import { ErrorView } from '../components/ErrorView';
import { SearchBar } from '../components/SearchBar';
import { SortModal } from '../components/SortModal';
import { Country } from '../api/types';
import { useTheme } from '../hooks/useTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { filterCountriesByName } from '../utils/helpers';

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
    const [searchTerm, setSearchTerm] = useState('');
    const { sort, setSort, sortedCountries } = useSort(countries);
    const [sortModalVisible, setSortModalVisible] = useState(false);

    const displayCountries = useMemo(
        () => filterCountriesByName(sortedCountries, searchTerm),
        [sortedCountries, searchTerm],
    );

    const handleCountryPress = useCallback(
        (country: Country) => {
            navigation.navigate('Detail', { country });
        },
        [navigation],
    );

    const renderCountryItem = useCallback(
        ({ item }: { item: Country }) => (
            <CountryItem country={item} onPress={handleCountryPress} />
        ),
        [handleCountryPress],
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
            edges={['bottom']}
        >
            <View style={styles.searchContainer}>
                <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
                <TouchableOpacity
                    testID="sort-button"
                    onPress={() => setSortModalVisible(true)}
                    style={[
                        styles.sortButton,
                        {
                            backgroundColor: theme.colors.backgroundSecondary,
                            borderColor: theme.colors.border,
                        },
                    ]}
                >
                    <Icon
                        name="sort"
                        size={24}
                        color={theme.colors.text}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                testID="countries-list"
                data={displayCountries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.cca3}
                contentContainerStyle={[
                    styles.listContent,
                    displayCountries.length === 0 && styles.emptyListContent,
                ]}
                ListEmptyComponent={renderEmptyList}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                initialNumToRender={15}
                maxToRenderPerBatch={15}
                windowSize={15}
            />
            <SortModal
                visible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
                selectedSort={sort}
                onSortChange={setSort}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    sortButton: {
        width: 48,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
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
