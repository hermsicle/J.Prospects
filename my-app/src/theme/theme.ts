import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    tokens: {
      colors: {
        red: {
          50: { value: '#FFE5E5' },
          100: { value: '#FFB8B8' },
          200: { value: '#FF8A8A' },
          300: { value: '#FF5C5C' },
          400: { value: '#FF2E2E' },
          500: { value: '#EE0F0F' },
          600: { value: '#BB0C0C' },
          700: { value: '#880909' },
          800: { value: '#550606' },
          900: { value: '#220303' },
        },
        blue: {
          50: { value: '#E3F2FF' },
          100: { value: '#B3DAFF' },
          200: { value: '#80C2FF' },
          300: { value: '#4DAAFF' },
          400: { value: '#1A91FF' },
          500: { value: '#0077E6' },
          600: { value: '#005DB4' },
          700: { value: '#004382' },
          800: { value: '#002951' },
          900: { value: '#000F21' },
        },
        gray: {
          50: { value: '#F9FAFB' },
          100: { value: '#F4F6F8' },
          200: { value: '#E5E8EC' },
          300: { value: '#D0D5DB' },
          400: { value: '#A5ACB5' },
          500: { value: '#6E7681' },
          600: { value: '#4B5563' },
          700: { value: '#374151' },
          800: { value: '#1F2937' },
          900: { value: '#111827' },
        },
        green: {
          50: { value: '#E6F9F0' },
          100: { value: '#B8EFD0' },
          200: { value: '#87E3AE' },
          300: { value: '#55D88D' },
          400: { value: '#2CC46D' },
          500: { value: '#16A34A' },
          600: { value: '#0E7C33' },
          700: { value: '#07521F' },
          800: { value: '#033912' },
          900: { value: '#001F08' },
        },
        yellow: {
          50: { value: '#FFF8E6' },
          100: { value: '#FFECB8' },
          200: { value: '#FFE187' },
          300: { value: '#FFD755' },
          400: { value: '#FFCE2C' },
          500: { value: '#E6B800' },
          600: { value: '#B38600' },
          700: { value: '#805400' },
          800: { value: '#4D3200' },
          900: { value: '#1A1000' },
        },
      },
    },
    // semanticTokens: {
    //   colors: {
    //     bg: {
    //       value: {
    //         light: '{colors.gray.50}',
    //         dark: '{colors.gray.900}',
    //       },
    //     },
    //     fg: {
    //       value: {
    //         light: '{colors.gray.800}',
    //         dark: '{colors.gray.100}',
    //       },
    //     },
    //     accent: {
    //       value: {
    //         light: '{colors.blue.500}',
    //         dark: '{colors.blue.300}',
    //       },
    //     },
    //     cardBg: {
    //       value: {
    //         light: '{colors.white}',
    //         dark: '{colors.gray.800}',
    //       },
    //     },
    //     border: {
    //       value: {
    //         light: '{colors.gray.200}',
    //         dark: '{colors.gray.700}',
    //       },
    //     },
    //     danger: {
    //       value: '{colors.red.500}', // already defined in tokens.colors.red
    //     },
    //     success: {
    //       value: '{colors.green.500}',
    //     },
    //     warning: {
    //       value: '{colors.yellow.500}',
    //     },
    //   },
    // },
    keyframes: {
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  },
});

export const theme = createSystem(defaultConfig, config);
