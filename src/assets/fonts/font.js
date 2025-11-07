// src/config/font.js

// Font families
export const Fonts = {
  REGULAR: 'Inter_400Regular',   // Google Font or custom font
  MEDIUM: 'Inter_500Medium',
  BOLD: 'Inter_700Bold',
  ITALIC: 'Inter_400Italic',    // Optional
};

// Font sizes
export const FontSizes = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
  XXLARGE: 32,
};

// Example combined style objects
export const TextStyles = {
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSizes.XLARGE,
  },
  subtitle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.LARGE,
  },
  body: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.MEDIUM,
  },
  small: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.SMALL,
  },
};