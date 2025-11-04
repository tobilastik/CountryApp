export const fontFamilies = {
  regular: 'Roboto-Regular.ttf',
  medium: 'Roboto-Medium.ttf',
  semiBold: 'Roboto-SemiBold.ttf',
  bold: 'Roboto-Bold.ttf',
} as const;

export const fontSizes = {
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '4xl': 36,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
} as const;

export const textStyles = {
  h1: {
    fontSize: fontSizes['4xl'],
    fontFamily: fontFamilies.bold,
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
  },
  h2: {
    fontSize: fontSizes['2xl'],
    fontFamily: fontFamilies.semiBold,
    lineHeight: fontSizes['2xl'] * lineHeights.normal,
  },
  h3: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.semiBold,
    lineHeight: fontSizes.xl * lineHeights.normal,
  },
  body: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.regular,
    lineHeight: fontSizes.base * lineHeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.regular,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.regular,
    lineHeight: fontSizes.lg * lineHeights.normal,
  },
  label: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.medium,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
} as const;

export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof fontSizes;
export type TextStyle = keyof typeof textStyles;
