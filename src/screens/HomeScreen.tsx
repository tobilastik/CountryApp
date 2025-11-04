import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCountries } from '../hooks/useCountries';
import { CountryItem } from '../components/CountryItem';
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
    const { countries, isLoading, isError, error } = useCountries();

    const handleCountryPress = (country: Country) => {
        navigation.navigate('Detail', { country });
    };

    const renderCountryItem = ({ item }: { item: Country }) => (
        <CountryItem country={item} onPress={() => handleCountryPress(item)} />
    );

    const renderEmptyList = () => {
        if (isLoading) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text
                        style={[
                            theme.typography.textStyles.body,
                            { color: theme.colors.textSecondary, marginTop: theme.spacing[4] },
                        ]}
                    >
                        Loading countries...
                    </Text>
                </View>
            );
        }

        if (isError) {
            return (
                <View style={styles.centerContainer}>
                    <Text
                        style={[
                            theme.typography.textStyles.h2,
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
                        {error?.message || 'Something went wrong'}
                    </Text>
                </View>
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
                    No countries found
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            edges={['top']}
        >
            <FlatList
                data={countries}
                renderItem={renderCountryItem}
                keyExtractor={item => item.cca2}
                contentContainerStyle={[
                    styles.listContent,
                    countries.length === 0 && styles.emptyListContent,
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
