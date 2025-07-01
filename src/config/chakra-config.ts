import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#E6F8EB' }, // Warna hijau sangat terang
          100: { value: '#C2EFCF' }, // Hijau terang
          200: { value: '#97E2AE' }, // Hijau lebih terang
          300: { value: '#6CD58E' }, // Hijau sedang
          400: { value: '#41C86D' }, // Warna utama yang lebih soft
          500: { value: '#04A51E' }, // **Warna utama**
          600: { value: '#03871B' }, // Hijau tua
          700: { value: '#026614' }, // Hijau lebih tua
          800: { value: '#01440D' }, // Hijau gelap
          900: { value: '#002407' }, // Hijau sangat gelap
        },
        border: {
          value: '#3F3F3F',
        },
        rightBar: {
          value: '#262626',
        },
        secondary: {
          value: '#909090',
        },
        footer: {
          value: '#B2B2B2',
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
