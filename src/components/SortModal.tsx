import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Available sort options for countries
 * - ascending: Sort by name A-Z
 * - descending: Sort by name Z-A
 * - population: Sort by population (highest first)
 * - area: Sort by area (largest first)
 * - null: No sorting (original order)
 */
export type SortOption = 'ascending' | 'descending' | 'population' | 'area' | null;

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' },
  { value: 'population', label: 'Population' },
  { value: 'area', label: 'Area' },
];

export const SortModal: React.FC<SortModalProps> = ({
  visible,
  onClose,
  selectedSort,
  onSortChange,
}) => {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                theme.typography.textStyles.h2,
                { color: theme.colors.text },
              ]}
            >
              Sort By
            </Text>
            <View style={styles.headerActions}>
              {selectedSort !== null && (
                <TouchableOpacity
                  testID="sort-reset"
                  onPress={() => onSortChange(null)}
                  style={styles.resetButton}
                >
                  <Text
                    style={[
                      theme.typography.textStyles.body,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionsWrapper}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.optionsContainer}
              showsVerticalScrollIndicator={true}
            >
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  testID={`sort-${option.value}`}
                  style={[
                    styles.option,
                    {
                      backgroundColor:
                        selectedSort === option.value
                          ? theme.colors.primary
                          : theme.colors.backgroundSecondary,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => {
                    onSortChange(option.value);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      theme.typography.textStyles.body,
                      {
                      color:
                        selectedSort === option.value
                          ? theme.colors.background
                          : theme.colors.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {selectedSort === option.value && (
                    <Icon name="check" size={20} color={theme.colors.background} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.8,
    minHeight: 300,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 12,
  },
  closeButton: {
    padding: 4,
  },
  optionsWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
});

