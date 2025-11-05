import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../hooks/useTheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search countries...',
}) => {
  const theme = useTheme();

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <TextInput
        testID="search-input"
        style={[
          theme.typography.textStyles.body,
          { color: theme.colors.text },
          styles.input,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          testID="search-clear"
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name="close-circle"
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
});

