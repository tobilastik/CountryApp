import { lightColors, darkColors, type ColorScheme } from './colors';
import { fontFamilies, fontSizes, textStyles } from './typography';
import { spacing } from './spacing';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: ColorScheme;
  typography: {
    fontFamilies: typeof fontFamilies;
    fontSizes: typeof fontSizes;
    textStyles: typeof textStyles;
  };
  spacing: typeof spacing;
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  typography: {
    fontFamilies,
    fontSizes,
    textStyles,
  },
  spacing,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  typography: {
    fontFamilies,
    fontSizes,
    textStyles,
  },
  spacing,
};

export { lightColors, darkColors } from './colors';
export { fontFamilies, fontSizes, textStyles } from './typography';
export { spacing } from './spacing';

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
