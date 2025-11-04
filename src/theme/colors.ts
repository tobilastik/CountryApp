export const lightColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  text: '#000000',
  textSecondary: '#3C3C43',
  border: '#C6C6C8',
  error: '#FF3B30',
} as const;

export const darkColors = {
  primary: '#0A84FF',
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  border: '#38383A',
  error: '#FF453A',
} as const;

export type ColorScheme = typeof lightColors | typeof darkColors;
