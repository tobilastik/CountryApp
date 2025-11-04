export const spacing = {
  2: 8,
  4: 16,
} as const;

export type Spacing = keyof typeof spacing;
