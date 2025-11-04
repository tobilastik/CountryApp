import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { getTheme, type Theme, type ThemeMode } from '../theme';

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  const mode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light';

  return useMemo(() => getTheme(mode), [mode]);
};

export type { Theme, ThemeMode } from '../theme';
