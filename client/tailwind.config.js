/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0F1115',
          900: '#16181D',
          800: '#1F2229',
          700: '#2B2F38',
          600: '#3A404C',
          500: '#555C6A',
          400: '#7D8595',
          300: '#A4ACBC',
          200: '#D1D5DC',
          100: '#F3F4F6',
        },
        charcoal: {
          DEFAULT: '#16181D',
          light: '#1F2229',
          dark: '#0F1115',
        },
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
