// FreshShare theme - colours and sizes taken from the Figma design

export const colors = {
  primary: '#2E9E5B',
  primaryDark: '#1F7A45',
  primaryLight: '#E8F3EC',

  accent: '#B4531A',
  accentLight: '#FDEEE5',

  background: '#F8F8F5',
  card: '#FFFFFF',
  border: '#E5E7EB',

  text: '#1F2937',
  textMuted: '#6B7280',
  white: '#FFFFFF',

  darkBackground: '#1B2420', // QR scanner screen
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const fontSize = {
  small: 13,
  body: 16,
  label: 15,
  heading: 20,
  title: 32,
  logo: 44,
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const theme = { colors, spacing, radius, fontSize, fontWeight };

export default theme;
